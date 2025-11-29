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


import { useEffect, useRef } from "react";

export function useMarkerDetection(videoRef, frameRef, onDetect, templateSvgPath) {
  const templateContourRef = useRef(null);

  useEffect(() => {
    if (!window.cv) return;

    // 1. Загружаем SVG → контур
    cv['onRuntimeInitialized'] = () => {
      fetch(templateSvgPath)
        .then(r => r.text())
        .then(svg => svgToContour(svg))
        .then(contour => {
          templateContourRef.current = contour;
        });
    };
  }, []);

  const svgToContour = (svgString) => {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const img = new Image();
    return new Promise(resolve => {
      img.onload = () => {
        const mat = cv.imread(img);
        cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY);
        cv.threshold(mat, mat, 10, 255, cv.THRESH_BINARY);
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(mat, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        const mainContour = contours.get(0);

        mat.delete();
        contours.delete();
        hierarchy.delete();

        resolve(mainContour);
      };
      img.src = URL.createObjectURL(blob);
    });
  };

  const processFrame = () => {
    if (!videoRef.current || !templateContourRef.current || !window.cv) return;

    const video = videoRef.current;
    const frameElement = frameRef.current;

    const frameRectBrowser = frameElement.getBoundingClientRect();
    const videoRectBrowser = video.getBoundingClientRect();

    const scaleX = video.videoWidth / videoRectBrowser.width;
    const scaleY = video.videoHeight / videoRectBrowser.height;

    const frameRect = {
      x: (frameRectBrowser.left - videoRectBrowser.left) * scaleX,
      y: (frameRectBrowser.top - videoRectBrowser.top) * scaleY,
      width: frameRectBrowser.width * scaleX,
      height: frameRectBrowser.height * scaleY
    };

    // Читаем кадр из видео
    const src = new cv.Mat(video.videoHeight, video.videoWidth, cv.CV_8UC4);
    const cap = new cv.VideoCapture(video);
    cap.read(src);

    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
    cv.threshold(gray, gray, 50, 255, cv.THRESH_BINARY);

    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(gray, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    let detected = false;

    for (let i = 0; i < contours.size(); i++) {
      const c = contours.get(i);

      if (cv.contourArea(c) < 2000) continue;

      const score = cv.matchShapes(
        c,
        templateContourRef.current,
        cv.CONTOURS_MATCH_I1,
        0
      );

      if (score < 0.20) {
        const r = cv.boundingRect(c);

        const inside =
          r.x > frameRect.x &&
          r.y > frameRect.y &&
          r.x + r.width < frameRect.x + frameRect.width &&
          r.y + r.height < frameRect.y + frameRect.height;

        if (inside) detected = true;
      }
    }

    src.delete();
    gray.delete();
    contours.delete();
    hierarchy.delete();

    onDetect(detected);
  };

  useEffect(() => {
    const interval = setInterval(processFrame, 120);
    return () => clearInterval(interval);
  });

  return {};
}