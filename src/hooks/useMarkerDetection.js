import { useState, useEffect, useCallback, useRef } from "react";

export const useMarkerDetection = (webcamRef) => {
    const [hasFourMarkers, setHasFourMarkers] = useState(false);
    const canvasRef = useRef(null);

    const startDetection = useCallback(() => {
        const video = webcamRef.current?.video;
        if (!video) return;

        if (!canvasRef.current)
            canvasRef.current = document.createElement("canvas");

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        let stopped = false;
        let src = null;
        const gray = new cv.Mat();
        const thresh = new cv.Mat();
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();

        const detect = () => {
            if (stopped) return;

            const vw = video.videoWidth;
            const vh = video.videoHeight;

            // Ждём загрузки камеры
            if (vw === 0 || vh === 0) {
                requestAnimationFrame(detect);
                return;
            }

            // Создаём src только ОДИН раз — после появления размеров
            if (!src) {
                src = new cv.Mat(vh, vw, cv.CV_8UC4);
            }

            // Устанавливаем размеры canvas
            if (canvas.width !== vw) canvas.width = vw;
            if (canvas.height !== vh) canvas.height = vh;

            try {
                ctx.drawImage(video, 0, 0, vw, vh);

                const imgData = ctx.getImageData(0, 0, vw, vh);

                // Защита от несоответствия размеров (на всякий случай)
                if (src.data.length !== imgData.data.length) {
                    console.warn("Size mismatch, reinitializing Mat");
                    src.delete();
                    src = new cv.Mat(vh, vw, cv.CV_8UC4);
                }

                src.data.set(imgData.data);

                // OpenCV processing
                cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
                cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
                cv.adaptiveThreshold(
                    gray,
                    thresh,
                    255,
                    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
                    cv.THRESH_BINARY_INV,
                    15,
                    4
                );

                cv.findContours(
                    thresh,
                    contours,
                    hierarchy,
                    cv.RETR_EXTERNAL,
                    cv.CHAIN_APPROX_SIMPLE
                );

                let count = 0;

                for (let i = 0; i < contours.size(); i++) {
                    const cnt = contours.get(i);
                    const approx = new cv.Mat();

                    cv.approxPolyDP(
                        cnt,
                        approx,
                        0.02 * cv.arcLength(cnt, true),
                        true
                    );

                    if (approx.rows === 4 && cv.contourArea(approx) > 1000) {
                        const rect = cv.boundingRect(approx);
                        const aspect = rect.width / rect.height;

                        if (aspect > 0.6 && aspect < 1.4) count++;
                    }

                    approx.delete();
                }

                setHasFourMarkers((prev) =>
                    prev !== (count >= 4) ? count >= 4 : prev
                );
            } catch (err) {
                console.warn("OpenCV error:", err);
            }

            requestAnimationFrame(detect);
        };

        requestAnimationFrame(detect);

        return () => {
            stopped = true;

            if (src) src.delete();
            gray.delete();
            thresh.delete();
            contours.delete();
            hierarchy.delete();
        };
    }, [webcamRef]);

    return { hasFourMarkers, startDetection };
};

export default useMarkerDetection;