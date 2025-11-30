// -------------------------------------------------------------рабочая версия

import { useEffect, useRef, useState } from "react";

export function useMarkerDetection(videoRef, frameRef, onDetect) {
    const rafRef = useRef(null);
    const tmpCanvasRef = useRef(null);
    const stableRef = useRef(0);

    const [smoothDetected, setSmoothDetected] = useState(false);
    const smoothingRef = useRef(0);

    const MIN_AREA = 300;      // минимальная площадь контура
    const MAX_AREA = 4500;     // максимальная площадь
    const MIN_RATIO = 1.5;     // минимальное соотношение высоты/ширины
    const MAX_RATIO = 16;      // максимальное соотношение
    const N_CONSISTENT = 4;    // сколько кадров подряд для стабильности
    const PROCESS_MS = 120;    // обработка раз в ms

    const processOnce = () => {
        const video = videoRef.current;
        const frameElem = frameRef.current;
        if (!video || !frameElem || !window.cv) return;
        if (video.readyState < 2) return;

        // создаём canvas и копируем кадр видео
        let canvas = tmpCanvasRef.current;
        if (!canvas) {
            canvas = document.createElement("canvas");
            tmpCanvasRef.current = canvas;
        }
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // OpenCV
        const src = cv.imread(canvas);
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

        // Размываем для уменьшения шума
        const blur = new cv.Mat();
        cv.GaussianBlur(gray, blur, new cv.Size(5, 5), 0);

        // Детектируем контуры
        const edges = new cv.Mat();
        cv.Canny(blur, edges, 40, 120);

        const kernel = cv.getStructuringElement(cv.MORPH_RECT, new cv.Size(3, 3));
        cv.dilate(edges, edges, kernel);

        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        let found = false;

        // координаты рамки
        const fr = frameElem.getBoundingClientRect();
        const vr = video.getBoundingClientRect();
        const scaleX = video.videoWidth / vr.width;
        const scaleY = video.videoHeight / vr.height;

        const frameRect = {
            x: (fr.left - vr.left) * scaleX,
            y: (fr.top - vr.top) * scaleY,
            w: fr.width * scaleX,
            h: fr.height * scaleY,
        };

        for (let i = 0; i < contours.size(); i++) {
            const c = contours.get(i);
            const area = cv.contourArea(c);
            const r = cv.boundingRect(c);
            const ratio = r.height / r.width;

            if (area < MIN_AREA || area > MAX_AREA) { c.delete(); continue; }
            if (ratio < MIN_RATIO || ratio > MAX_RATIO) { c.delete(); continue; }

            const PADDING = 0.2; // 10% запас
            const inside =
                r.x > frameRect.x - frameRect.w * PADDING &&
                r.y > frameRect.y - frameRect.h * PADDING &&
                r.x + r.width < frameRect.x + frameRect.w * (1 + PADDING) &&
                r.y + r.height < frameRect.y + frameRect.h * (1 + PADDING);

            if (inside) {
                found = true;
                c.delete();
                break;
            }
            c.delete();
        }

        // Очистка
        src.delete();
        gray.delete();
        blur.delete();
        edges.delete();
        contours.delete();
        hierarchy.delete();
        kernel.delete();

        // Логика стабильности
        if (found) stableRef.current = Math.min(N_CONSISTENT, stableRef.current + 1);
        else stableRef.current = 0;

        const detected = stableRef.current >= N_CONSISTENT;
        onDetect(detected);

        const SMOOTHING_COUNT = 5; // сглаживаем по 5 кадрам

        if (detected) smoothingRef.current = Math.min(SMOOTHING_COUNT, smoothingRef.current + 1);
        else smoothingRef.current = Math.max(0, smoothingRef.current - 1);

        setSmoothDetected(smoothingRef.current > SMOOTHING_COUNT / 2);
    };

    useEffect(() => {
        let last = 0;
        let mounted = true;

        const loop = (t) => {
            if (!mounted) return;
            if (!last || t - last >= PROCESS_MS) {
                processOnce();
                last = t;
            }
            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);

        return () => {
            mounted = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return {};
}

export default useMarkerDetection;


