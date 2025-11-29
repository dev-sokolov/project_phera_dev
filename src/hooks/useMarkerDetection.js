// import { useState, useEffect, useCallback, useRef } from "react";

// export const useMarkerDetection = (webcamRef) => {
//     const [hasFourMarkers, setHasFourMarkers] = useState(false);
//     const canvasRef = useRef(null);

//     const startDetection = useCallback(() => {
//         const video = webcamRef.current?.video;
//         if (!video) return;

//         if (!canvasRef.current)
//             canvasRef.current = document.createElement("canvas");

//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d", { willReadFrequently: true });

//         let stopped = false;
//         let src = null;
//         const gray = new cv.Mat();
//         const thresh = new cv.Mat();
//         const contours = new cv.MatVector();
//         const hierarchy = new cv.Mat();

//         const detect = () => {
//             if (stopped) return;

//             const vw = video.videoWidth;
//             const vh = video.videoHeight;

//             // Ждём загрузки камеры
//             if (vw === 0 || vh === 0) {
//                 requestAnimationFrame(detect);
//                 return;
//             }

//             // Создаём src только ОДИН раз — после появления размеров
//             if (!src) {
//                 src = new cv.Mat(vh, vw, cv.CV_8UC4);
//             }

//             // Устанавливаем размеры canvas
//             if (canvas.width !== vw) canvas.width = vw;
//             if (canvas.height !== vh) canvas.height = vh;

//             try {
//                 ctx.drawImage(video, 0, 0, vw, vh);

//                 const imgData = ctx.getImageData(0, 0, vw, vh);

//                 // Защита от несоответствия размеров (на всякий случай)
//                 if (src.data.length !== imgData.data.length) {
//                     console.warn("Size mismatch, reinitializing Mat");
//                     src.delete();
//                     src = new cv.Mat(vh, vw, cv.CV_8UC4);
//                 }

//                 src.data.set(imgData.data);

//                 // OpenCV processing
//                 cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
//                 cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
//                 cv.adaptiveThreshold(
//                     gray,
//                     thresh,
//                     255,
//                     cv.ADAPTIVE_THRESH_GAUSSIAN_C,
//                     cv.THRESH_BINARY_INV,
//                     15,
//                     4
//                 );

//                 cv.findContours(
//                     thresh,
//                     contours,
//                     hierarchy,
//                     cv.RETR_EXTERNAL,
//                     cv.CHAIN_APPROX_SIMPLE
//                 );

//                 let count = 0;

//                 for (let i = 0; i < contours.size(); i++) {
//                     const cnt = contours.get(i);
//                     const approx = new cv.Mat();

//                     cv.approxPolyDP(
//                         cnt,
//                         approx,
//                         0.02 * cv.arcLength(cnt, true),
//                         true
//                     );

//                     if (approx.rows === 4 && cv.contourArea(approx) > 1000) {
//                         const rect = cv.boundingRect(approx);
//                         const aspect = rect.width / rect.height;

//                         if (aspect > 0.6 && aspect < 1.4) count++;
//                     }

//                     approx.delete();
//                 }

//                 setHasFourMarkers((prev) =>
//                     prev !== (count >= 4) ? count >= 4 : prev
//                 );
//             } catch (err) {
//                 console.warn("OpenCV error:", err);
//             }

//             requestAnimationFrame(detect);
//         };

//         requestAnimationFrame(detect);

//         return () => {
//             stopped = true;

//             if (src) src.delete();
//             gray.delete();
//             thresh.delete();
//             contours.delete();
//             hierarchy.delete();
//         };
//     }, [webcamRef]);

//     return { hasFourMarkers, startDetection };
// };

// export default useMarkerDetection;



// -------------------------------------------------------------------------------------------


// import { useEffect, useRef } from "react";

// export function useMarkerDetection(videoRef, frameRef, onDetect, templateSvgPath) {
//   const templateContourRef = useRef(null);

//   useEffect(() => {
//     if (!window.cv) return;

//     // 1. Загружаем SVG → контур
//     cv['onRuntimeInitialized'] = () => {
//       fetch(templateSvgPath)
//         .then(r => r.text())
//         .then(svg => svgToContour(svg))
//         .then(contour => {
//           templateContourRef.current = contour;
//         });
//     };
//   }, []);

//   const svgToContour = (svgString) => {
//     const blob = new Blob([svgString], { type: "image/svg+xml" });
//     const img = new Image();
//     return new Promise(resolve => {
//       img.onload = () => {
//         const mat = cv.imread(img);
//         cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
//         cv.threshold(mat, mat, 10, 255, cv.THRESH_BINARY);
//         const contours = new cv.MatVector();
//         const hierarchy = new cv.Mat();
//         cv.findContours(mat, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

//         const mainContour = contours.get(0);

//         mat.delete();
//         contours.delete();
//         hierarchy.delete();

//         resolve(mainContour);
//       };
//       img.src = URL.createObjectURL(blob);
//     });
//   };

//   const processFrame = () => {
//     if (!videoRef.current || !templateContourRef.current || !window.cv) return;

//     const video = videoRef.current;
//     const frameElement = frameRef.current;

//     const frameRectBrowser = frameElement.getBoundingClientRect();
//     const videoRectBrowser = video.getBoundingClientRect();

//     const scaleX = video.videoWidth / videoRectBrowser.width;
//     const scaleY = video.videoHeight / videoRectBrowser.height;

//     const frameRect = {
//       x: (frameRectBrowser.left - videoRectBrowser.left) * scaleX,
//       y: (frameRectBrowser.top - videoRectBrowser.top) * scaleY,
//       width: frameRectBrowser.width * scaleX,
//       height: frameRectBrowser.height * scaleY
//     };

//     // Читаем кадр из видео
//     const src = new cv.Mat(video.videoHeight, video.videoWidth, cv.CV_8UC4);
//     const cap = new cv.VideoCapture(video);
//     cap.read(src);

//     const gray = new cv.Mat();
//     cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
//     cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
//     cv.threshold(gray, gray, 50, 255, cv.THRESH_BINARY);

//     const contours = new cv.MatVector();
//     const hierarchy = new cv.Mat();
//     cv.findContours(gray, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

//     let detected = false;

//     for (let i = 0; i < contours.size(); i++) {
//       const c = contours.get(i);

//       if (cv.contourArea(c) < 2000) continue;

//       const score = cv.matchShapes(
//         c,
//         templateContourRef.current,
//         cv.CONTOURS_MATCH_I1,
//         0
//       );

//       if (score < 0.20) {
//         const r = cv.boundingRect(c);

//         const inside =
//           r.x > frameRect.x &&
//           r.y > frameRect.y &&
//           r.x + r.width < frameRect.x + frameRect.width &&
//           r.y + r.height < frameRect.y + frameRect.height;

//         if (inside) detected = true;
//       }
//     }

//     src.delete();
//     gray.delete();
//     contours.delete();
//     hierarchy.delete();

//     onDetect(detected);
//   };

//   useEffect(() => {
//     const interval = setInterval(processFrame, 120);
//     return () => clearInterval(interval);
//   });

//   return {};
// }


// -------------------------------------------------------------------------------------------


// import { useEffect, useRef } from "react";

// export function useMarkerDetection(videoRef, frameRef, onDetect, templateSvgPath) {
//     const templateContourRef = useRef(null);

//     //   useEffect(() => {
//     //     if (!window.cv) return;

//     //     // 1. Загружаем SVG → контур
//     //     cv['onRuntimeInitialized'] = () => {
//     //       fetch(templateSvgPath)
//     //         .then(r => r.text())
//     //         .then(svg => svgToContour(svg))
//     //         .then(contour => {
//     //           templateContourRef.current = contour;
//     //         });
//     //     };
//     //   }, []);

//     useEffect(() => {
//         if (!window.cv) return;

//         const load = async () => {
//             const text = await fetch(templateSvgPath).then(r => r.text());
//             const contour = await svgToContour(text);
//             templateContourRef.current = contour;
//         };

//         load();
//     }, [templateSvgPath]);

//     const svgToContour = (svgString) => {
//         const blob = new Blob([svgString], { type: "image/svg+xml" });
//         const img = new Image();
//         return new Promise(resolve => {
//             img.onload = () => {
//                 const mat = cv.imread(img);
//                 cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
//                 cv.threshold(mat, mat, 10, 255, cv.THRESH_BINARY);
//                 const contours = new cv.MatVector();
//                 const hierarchy = new cv.Mat();
//                 cv.findContours(mat, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

//                 const mainContour = contours.get(0);

//                 mat.delete();
//                 contours.delete();
//                 hierarchy.delete();

//                 resolve(mainContour);
//             };
//             img.src = URL.createObjectURL(blob);
//         });
//     };

//     const processFrame = () => {
//         if (!videoRef.current || !templateContourRef.current || !window.cv) return;

//         const video = videoRef.current;
//         // Camera not ready yetsetInterval
//         // if (!video.videoWidth || !video.videoHeight) {
//         //     return;
//         // }

//         if (!video || video.readyState < 2) {
//             return; // camera not streaming yet
//         }

//         if (video.videoWidth === 0 || video.videoHeight === 0) {
//             return;
//         }

//         const frameElement = frameRef.current;

//         const frameRectBrowser = frameElement.getBoundingClientRect();
//         const videoRectBrowser = video.getBoundingClientRect();

//         const scaleX = video.videoWidth / videoRectBrowser.width;
//         const scaleY = video.videoHeight / videoRectBrowser.height;

//         const frameRect = {
//             x: (frameRectBrowser.left - videoRectBrowser.left) * scaleX,
//             y: (frameRectBrowser.top - videoRectBrowser.top) * scaleY,
//             width: frameRectBrowser.width * scaleX,
//             height: frameRectBrowser.height * scaleY
//         };

//         // Читаем кадр из видео
//         // const src = new cv.Mat(video.videoHeight, video.videoWidth, cv.CV_8UC4);
//         // const cap = new cv.VideoCapture(video);
//         // cap.read(src);

//         const canvas = document.createElement("canvas");
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;

//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         const src = cv.imread(canvas);

//         const gray = new cv.Mat();
//         cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
//         cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
//         // cv.threshold(gray, gray, 50, 255, cv.THRESH_BINARY);
//         cv.medianBlur(gray, gray, 7);
//         cv.morphologyEx(gray, gray, cv.MORPH_CLOSE, new cv.Mat.ones(5, 5, cv.CV_8U));
//         cv.adaptiveThreshold(
//             gray,
//             gray,
//             255,
//             cv.ADAPTIVE_THRESH_GAUSSIAN_C,
//             cv.THRESH_BINARY_INV,
//             31,
//             5
//         );

//         const contours = new cv.MatVector();
//         const hierarchy = new cv.Mat();
//         cv.findContours(gray, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

//         let detected = false;

//         for (let i = 0; i < contours.size(); i++) {
//             const c = contours.get(i);

//             if (cv.contourArea(c) < 2000) continue;

//             const r = cv.boundingRect(c);
//             const ratio = r.height / r.width;
//             if (ratio < 2.5 || ratio > 6) continue;

//             const score = cv.matchShapes(
//                 c,
//                 templateContourRef.current,
//                 cv.CONTOURS_MATCH_I1,
//                 0
//             );

//             // if (score < 0.20) {
//             if (score < 1.1) {
//                 const r = cv.boundingRect(c);

//                 const inside =
//                     r.x > frameRect.x &&
//                     r.y > frameRect.y &&
//                     r.x + r.width < frameRect.x + frameRect.width &&
//                     r.y + r.height < frameRect.y + frameRect.height;

//                 if (inside) detected = true;
//             }
//         }

//         src.delete();
//         gray.delete();
//         contours.delete();
//         hierarchy.delete();

//         onDetect(detected);
//     };

//     // useEffect(() => {
//     //     const interval = setInterval(processFrame, 120);
//     //     return () => clearInterval(interval);
//     // });

//     // useEffect(() => {
//     //     if (!videoRef.current) return;
//     //     if (!templateContourRef.current) return;

//     //     const interval = setInterval(processFrame, 120);
//     //     return () => clearInterval(interval);
//     // }, [videoRef.current, templateContourRef.current]);

//     useEffect(() => {
//         const video = videoRef.current;

//         if (!video) return;
//         if (!templateContourRef.current) return;

//         // wait until video has real size
//         if (video.videoWidth === 0 || video.videoHeight === 0) {
//             const id = setTimeout(() => { }, 50);
//             return () => clearTimeout(id);
//         }

//         const interval = setInterval(processFrame, 120);
//         return () => clearInterval(interval);
//     }, [videoRef.current, templateContourRef.current]);

//     return {};
// }


// -------------------------------------------------------------------------------------


// import { useEffect, useRef } from "react";

// export function useMarkerDetection(videoRef, frameRef, onDetect, templateSvgPath = "/templates/stripTemplate.svg") {
//     console.log("processOnce called");
//     const templateContourRef = useRef(null);
//     const stableRef = useRef(0);
//     const rafRef = useRef(null);
//     const tmpCanvasRef = useRef(null);

//     // параметры (можешь подгонять)
//     const MIN_AREA = 1500; // минимальная площадь контура в пикселях (в пространстве видео)
//     // const MATCH_THRESHOLD = 0.9; // порог для matchShapes (меньше = строже). 0.9 — мягко.
//     const MATCH_THRESHOLD = 0.9; // порог для matchShapes (меньше = строже). 0.9 — мягко.
//     const N_CONSISTENT_FRAMES = 3; // сколько подряд кадров требуется
//     const PROCESS_EVERY_MS = 120; // промежуток между обработками (ms)

//     // Загрузка SVG-шаблона в контур
//     useEffect(() => {
//         if (!window.cv) return;
//         if (!templateSvgPath) return;

//         let cancelled = false;

//         const load = async () => {
//             try {
//                  console.log("Fetching SVG from:", templateSvgPath);
//                 const resp = await fetch(templateSvgPath);
//                     console.log("SVG fetched, status:", resp.status);
//                 const svgText = await resp.text();

//                 // создаём Image для cv.imread
//                 const blob = new Blob([svgText], { type: "image/svg+xml" });
//                 const url = URL.createObjectURL(blob);
//                 const img = new Image();
//                 img.onload = () => {
//                     try {
//                         console.log("SVG image loaded, dimensions:", img.width, img.height);
//                         const mat = cv.imread(img);
//                         cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
//                         cv.threshold(mat, mat, 10, 255, cv.THRESH_BINARY);
//                         const contours = new cv.MatVector();
//                         const hierarchy = new cv.Mat();
//                         cv.findContours(mat, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
//                         console.log("Contours found:", contours.size());

//                         if (contours.size() > 0) {
//                             const main = contours.get(0);
//                             templateContourRef.current = main;
//                         }

//                         mat.delete();
//                         hierarchy.delete();
//                         // leave contour in templateContourRef (do NOT delete 'main' here, we keep it)
//                     } catch (err) {
//                         console.warn("svg->contour error", err);
//                     } finally {
//                         URL.revokeObjectURL(url);
//                     }
//                 };
//                 img.onerror = (e) => {
//                     URL.revokeObjectURL(url);
//                     console.warn("Failed to load template image", e);
//                 };
//                 img.src = url;
//             } catch (err) {
//                 console.warn("Failed to fetch template svg", err);
//             }
//         };

//         load();

//         return () => {
//             cancelled = true;
//         };
//     }, [templateSvgPath]);

//     // Функция обработки одного кадра
//     const processOnce = () => {
//         try {
//             const video = videoRef.current;
//             const template = templateContourRef.current;

//             if (!template) {
//                 console.log("Template contour not loaded yet");
//                 return;
//             }
//             const frameElem = frameRef?.current;
//             if (!video || !template || !frameElem || !window.cv) return;

//             // Надёжная проверка готовности видео
//             if (!(video.readyState >= 2) || !video.videoWidth || !video.videoHeight) {
//                 console.log("Video not ready yet", video.readyState, video.videoWidth, video.videoHeight);
//                 return;
//             }

//             // Создаём/переиспользуем временный canvas
//             let canvas = tmpCanvasRef.current;
//             if (!canvas) {
//                 canvas = document.createElement("canvas");
//                 tmpCanvasRef.current = canvas;
//             }
//             canvas.width = video.videoWidth;
//             canvas.height = video.videoHeight;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//             // Получаем Mat из canvas
//             const src = cv.imread(canvas);

//             console.log("src size:", src.rows, src.cols);

//             // Препроцессинг: gray -> median blur -> adaptive threshold -> morph close
//             const gray = new cv.Mat();
//             cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

//             // лёгкая нормализация контраста (опционально)
//             // cv.equalizeHist(gray, gray);

//             cv.medianBlur(gray, gray, 5);

//             const thresh = new cv.Mat();
//             cv.adaptiveThreshold(
//                 gray,
//                 thresh,
//                 255,
//                 cv.ADAPTIVE_THRESH_GAUSSIAN_C,
//                 cv.THRESH_BINARY_INV,
//                 31,
//                 5
//             );

//             let debugCanvas = document.getElementById("debugCanvas");
//             if (!debugCanvas) {
//                 debugCanvas = document.createElement("canvas");
//                 debugCanvas.id = "debugCanvas";
//                 document.body.appendChild(debugCanvas);
//             }
//             cv.imshow(debugCanvas, thresh);

//             const kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(5, 5));
//             cv.morphologyEx(thresh, thresh, cv.MORPH_CLOSE, kernel);

//             // findContours
//             const contours = new cv.MatVector();
//             const hierarchy = new cv.Mat();
//             cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
//             console.log("Contours found:", contours.size());

//             let found = false;

//             // вычисляем frameRect в координатах видео (нужно, чтобы проверить, что boundingRect внутрь рамки)
//             const fr = frameElem.getBoundingClientRect();
//             const vr = video.getBoundingClientRect();
//             const scaleX = video.videoWidth / vr.width;
//             const scaleY = video.videoHeight / vr.height;
//             const frameRect = {
//                 x: (fr.left - vr.left) * scaleX,
//                 y: (fr.top - vr.top) * scaleY,
//                 w: fr.width * scaleX,
//                 h: fr.height * scaleY
//             };

//             console.log("frameRect", frameRect);
//             console.log("video size:", video.videoWidth, video.videoHeight);

//             for (let i = 0; i < contours.size(); i++) {
//                 const c = contours.get(i);
//                 const area = cv.contourArea(c);
//                 if (area < MIN_AREA) {
//                     c.delete();
//                     continue;
//                 }

//                 const r = cv.boundingRect(c);
//                 const ratio = r.height / r.width;
//                 // грубая фильтрация по форме (вертикальный объект с высокой высотой)
//                 if (ratio < 2.0 || ratio > 8.0) {
//                     c.delete();
//                     continue;
//                 }

//                 // Сопоставление формы
//                 let score = 999;
//                 try {
//                     score = cv.matchShapes(c, template, cv.CONTOURS_MATCH_I1, 0);
//                 } catch (err) {
//                     // ignore
//                 }

//                 // Проверяем попадание внутрь области фрейма
//                 const inside =
//                     r.x > frameRect.x &&
//                     r.y > frameRect.y &&
//                     r.x + r.width < frameRect.x + frameRect.w &&
//                     r.y + r.height < frameRect.y + frameRect.h;

//                 console.log("contour boundingRect:", r, "area:", area, "ratio:", ratio, "score:", score, "inside?", inside);

//                 // Жесткая проверка — если внутри и score небольшой (чем меньше — лучше)
//                 // Мы используем более мягкий порог: score < MATCH_THRESHOLD (например 0.9 - 1.5 в зависимости от условий)
//                 if (inside && score < MATCH_THRESHOLD) {
//                     found = true;
//                     c.delete();
//                     break;
//                 }
//                 console.log("found this frame?", found);

//                 c.delete();
//             }

//             // освобождение
//             src.delete();
//             gray.delete();
//             thresh.delete();
//             contours.delete();
//             hierarchy.delete();
//             kernel.delete();

//             // stability logic
//             if (found) {
//                 stableRef.current = Math.min(N_CONSISTENT_FRAMES, stableRef.current + 1);
//             } else {
//                 stableRef.current = 0;
//             }

//             const detected = stableRef.current >= N_CONSISTENT_FRAMES;
//             onDetect(Boolean(stableRef.current >= N_CONSISTENT_FRAMES));
//             console.log("onDetect called with", stableRef.current >= N_CONSISTENT_FRAMES);
//             onDetect(Boolean(detected));
//         } catch (err) {
//             // безопасно логируем, но не ломаем loop
//             console.warn("processOnce error", err);
//         }
//         console.log("stableRef.current:", stableRef.current, "detected:", stableRef.current >= N_CONSISTENT_FRAMES);
//     };

//     // Loop: запускаем таймер + RAF гибрид, чтобы не перегружать CPU
//     useEffect(() => {
//         let mounted = true;
//         let last = 0;

//         const loop = (t) => {
//             if (!mounted) return;
//             if (!last || (t - last) >= PROCESS_EVERY_MS) {
//                 processOnce();
//                 last = t;
//             }
//             rafRef.current = requestAnimationFrame(loop);
//         };

//         rafRef.current = requestAnimationFrame(loop);

//         return () => {
//             mounted = false;
//             if (rafRef.current) cancelAnimationFrame(rafRef.current);
//             // удаляем template contour, если есть
//             if (templateContourRef.current) {
//                 try { templateContourRef.current.delete(); } catch (e) { }
//                 templateContourRef.current = null;
//             }
//         };
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [videoRef, frameRef]);

//     return {};
// }

// export default useMarkerDetection;

import { useEffect, useRef } from "react";

/**
 * useMarkerDetection
 *
 * videoRef     - ref на HTMLVideoElement
 * frameRef     - ref на DOM-элемент рамки
 * onDetect     - callback(boolean)
 * templateSvgPath - путь к SVG-шаблону
 */
export function useMarkerDetection(
    videoRef,
    frameRef,
    onDetect,
    templateSvgPath = "/templates/stripTemplate.svg"
) {
    const templateContourRef = useRef(null);
    const stableRef = useRef(0);
    const rafRef = useRef(null);
    const tmpCanvasRef = useRef(null);

    const MIN_AREA = 1500;
    const MATCH_THRESHOLD = 0.9;
    const N_CONSISTENT_FRAMES = 3;
    const PROCESS_EVERY_MS = 120;

    // Загружаем шаблон
    useEffect(() => {
        if (!window.cv || !templateSvgPath) return;

        const loadTemplate = async () => {
            try {
                const resp = await fetch(templateSvgPath);
                if (!resp.ok) throw new Error(`Failed to fetch SVG: ${resp.status}`);
                const svgText = await resp.text();

                const blob = new Blob([svgText], { type: "image/svg+xml" });
                const url = URL.createObjectURL(blob);
                const img = new Image();
                img.onload = () => {
                    try {
                        const mat = cv.imread(img);
                        cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
                        cv.threshold(mat, mat, 10, 255, cv.THRESH_BINARY);
                        const contours = new cv.MatVector();
                        const hierarchy = new cv.Mat();
                        cv.findContours(mat, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

                        if (contours.size() > 0) {
                            templateContourRef.current = contours.get(0);
                        } else {
                            console.warn("No contours found in template!");
                        }

                        mat.delete();
                        hierarchy.delete();
                        contours.delete();
                    } catch (err) {
                        console.warn("Error processing template SVG:", err);
                    } finally {
                        URL.revokeObjectURL(url);
                    }
                };
                img.onerror = (e) => {
                    URL.revokeObjectURL(url);
                    console.warn("Failed to load template image", e);
                };
                img.src = url;
            } catch (err) {
                console.warn("Failed to fetch template SVG", err);
            }
        };

        loadTemplate();
    }, [templateSvgPath]);

    // Функция обработки кадра
    const processOnce = () => {
        try {
            const video = videoRef.current;
            const template = templateContourRef.current;
            const frameElem = frameRef.current;

            if (!video || !template || !frameElem || !window.cv) return;
            if (!(video.readyState >= 2) || !video.videoWidth || !video.videoHeight) return;

            let canvas = tmpCanvasRef.current;
            if (!canvas) {
                canvas = document.createElement("canvas");
                tmpCanvasRef.current = canvas;
            }
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            const src = cv.imread(canvas);

            const gray = new cv.Mat();
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
            cv.medianBlur(gray, gray, 5);

            const thresh = new cv.Mat();
            cv.adaptiveThreshold(
                gray,
                thresh,
                255,
                cv.ADAPTIVE_THRESH_GAUSSIAN_C,
                cv.THRESH_BINARY_INV,
                31,
                5
            );

            const kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE, new cv.Size(5, 5));
            cv.morphologyEx(thresh, thresh, cv.MORPH_CLOSE, kernel);

            const contours = new cv.MatVector();
            const hierarchy = new cv.Mat();
            cv.findContours(thresh, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

            let found = false;

            const fr = frameElem.getBoundingClientRect();
            const vr = video.getBoundingClientRect();
            const scaleX = video.videoWidth / vr.width;
            const scaleY = video.videoHeight / vr.height;
            const frameRect = {
                x: (fr.left - vr.left) * scaleX,
                y: (fr.top - vr.top) * scaleY,
                w: fr.width * scaleX,
                h: fr.height * scaleY
            };

            for (let i = 0; i < contours.size(); i++) {
                const c = contours.get(i);
                const area = cv.contourArea(c);
                if (area < MIN_AREA) { c.delete(); continue; }

                const r = cv.boundingRect(c);
                const ratio = r.height / r.width;
                if (ratio < 2.0 || ratio > 8.0) { c.delete(); continue; }

                let score = 999;
                try { score = cv.matchShapes(c, template, cv.CONTOURS_MATCH_I1, 0); } catch {}
                
                const inside =
                    r.x > frameRect.x &&
                    r.y > frameRect.y &&
                    r.x + r.width < frameRect.x + frameRect.w &&
                    r.y + r.height < frameRect.y + frameRect.h;

                if (inside && score < MATCH_THRESHOLD) {
                    found = true;
                    c.delete();
                    break;
                }
                c.delete();
            }

            src.delete();
            gray.delete();
            thresh.delete();
            contours.delete();
            hierarchy.delete();
            kernel.delete();

            if (found) {
                stableRef.current = Math.min(N_CONSISTENT_FRAMES, stableRef.current + 1);
            } else {
                stableRef.current = 0;
            }

            const detected = stableRef.current >= N_CONSISTENT_FRAMES;
            onDetect(detected);

        } catch (err) {
            console.warn("processOnce error", err);
        }
    };

    // Loop: ждём шаблон и запускаем обработку
    useEffect(() => {
        let mounted = true;
        let rafId;

        const startLoop = () => {
            let last = 0;
            const loop = (t) => {
                if (!mounted) return;
                if (!last || (t - last) >= PROCESS_EVERY_MS) {
                    processOnce();
                    last = t;
                }
                rafId = requestAnimationFrame(loop);
            };
            rafId = requestAnimationFrame(loop);
        };

        const waitTemplate = () => {
            if (templateContourRef.current) {
                startLoop();
            } else {
                setTimeout(waitTemplate, 100);
            }
        };

        waitTemplate();

        return () => {
            mounted = false;
            if (rafId) cancelAnimationFrame(rafId);
            if (templateContourRef.current) {
                try { templateContourRef.current.delete(); } catch {}
                templateContourRef.current = null;
            }
        };
    }, [videoRef, frameRef]);

    return {};
}

export default useMarkerDetection;