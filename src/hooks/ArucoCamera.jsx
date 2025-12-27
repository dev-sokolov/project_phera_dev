// import { useEffect, useRef } from "react";

// export default function ArucoCamera({ onCapture }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const intervalRef = useRef(null);

//   // 1️⃣ Старт камеры
//   useEffect(() => {
//     let stream = null;

//     const startCamera = async () => {
//       try {
//         stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: "environment" },
//           audio: false,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           await videoRef.current.play();
//         }
//       } catch (err) {
//         console.error("Ошибка запуска камеры:", err);
//       }
//     };

//     startCamera();

//     return () => {
//       stream?.getTracks().forEach((track) => track.stop());
//     };
//   }, []);

//   // 2️⃣ Инициализация OpenCV + ArUco
//   useEffect(() => {
//     let isMounted = true;

//     cv['onRuntimeInitialized'] = () => {
//       if (!isMounted) return;
//       console.log("✅ OpenCV и ArUco загружены");

//       const dictionary = new cv.aruco_Dictionary(cv.DICT_4X4_50);
//       const detectorParams = new cv.aruco_DetectorParameters();
//       const detector = new cv.aruco_ArucoDetector(dictionary, detectorParams);

//       intervalRef.current = setInterval(() => {
//         if (!videoRef.current || !canvasRef.current) return;

//         const video = videoRef.current;
//         const canvas = canvasRef.current;
//         canvas.width = video.videoWidth;
//         canvas.height = video.videoHeight;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//         const src = cv.imread(canvas);
//         const corners = new cv.MatVector();
//         const ids = new cv.Mat();

//         detector.detectMarkers(src, corners, ids);

//         if (!ids.empty()) {
//           const detectedIds = Array.from(ids.data32S);
//           console.log("Обнаружены маркеры:", detectedIds);

//           const required = [0, 1, 2, 3];
//           if (required.every(id => detectedIds.includes(id))) {
//             console.log("✔️ ВСЕ 4 маркера найдены!");
//             if (onCapture) onCapture({ ids: detectedIds });
//           }
//         }

//         src.delete();
//         corners.delete();
//         ids.delete();
//       }, 200);
//     };

//     return () => {
//       isMounted = false;
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [onCapture]);

//   return (
//     <div>
//       <video
//         ref={videoRef}
//         style={{ width: "100%", height: "auto" }}
//         playsInline
//         muted
//       />
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// }



import { useEffect, useRef } from "react";

export default function ArucoCamera({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const streamRef = useRef(null);

  // 1️⃣ Старт камеры
  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (!isMounted || !videoRef.current) return;

        streamRef.current = stream;
        videoRef.current.srcObject = stream;

        // Ждём загрузки метаданных видео вместо await play()
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(err => {
            console.warn("video.play() прерван:", err);
          });
        };
      } catch (err) {
        console.error("Ошибка запуска камеры:", err);
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  // 2️⃣ Инициализация OpenCV + ArUco
  useEffect(() => {
    let isMounted = true;

    cv['onRuntimeInitialized'] = () => {
      if (!isMounted) return;
      console.log("✅ OpenCV и ArUco загружены");

      const dictionary = new cv.aruco_Dictionary(cv.DICT_4X4_50);
      const detectorParams = new cv.aruco_DetectorParameters();
      const detector = new cv.aruco_ArucoDetector(dictionary, detectorParams);

      intervalRef.current = setInterval(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Конвертируем в grayscale для лучшей детекции
        const src = cv.imread(canvas);
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

        const corners = new cv.MatVector();
        const ids = new cv.Mat();

        detector.detectMarkers(gray, corners, ids);

        if (!ids.empty()) {
          const detectedIds = Array.from(ids.data32S);
          console.log("Обнаружены маркеры:", detectedIds);

          const required = [0, 1, 2, 3];
          if (required.every(id => detectedIds.includes(id))) {
            console.log("✔️ ВСЕ 4 маркера найдены!");
            if (onCapture) onCapture({ ids: detectedIds });
          }
        }

        src.delete();
        gray.delete();
        corners.delete();
        ids.delete();
      }, 200);
    };

    return () => {
      isMounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onCapture]);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%", height: "auto" }}
        playsInline
        muted
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}