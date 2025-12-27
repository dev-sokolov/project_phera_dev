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



// import { useEffect, useRef } from "react";

// export default function ArucoCamera({ onCapture }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const intervalRef = useRef(null);
//   const streamRef = useRef(null);

//   // 1️⃣ Старт камеры
//   useEffect(() => {
//     let isMounted = true;

//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: { facingMode: "environment" },
//           audio: false,
//         });
//         if (!isMounted || !videoRef.current) return;

//         streamRef.current = stream;
//         videoRef.current.srcObject = stream;

//         // Ждём загрузки метаданных видео вместо await play()
//         videoRef.current.onloadedmetadata = () => {
//           videoRef.current.play().catch(err => {
//             console.warn("video.play() прерван:", err);
//           });
//         };
//       } catch (err) {
//         console.error("Ошибка запуска камеры:", err);
//       }
//     };

//     startCamera();

//     return () => {
//       isMounted = false;
//       streamRef.current?.getTracks().forEach(track => track.stop());
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

//         // Конвертируем в grayscale для лучшей детекции
//         const src = cv.imread(canvas);
//         const gray = new cv.Mat();
//         cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

//         const corners = new cv.MatVector();
//         const ids = new cv.Mat();

//         detector.detectMarkers(gray, corners, ids);

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
//         gray.delete();
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

  // Функция детекции маркеров
  const detectMarkers = (src, detector) => {
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    const corners = new cv.MatVector();
    const ids = new cv.Mat();

    detector.detectMarkers(gray, corners, ids);

    if (!ids.empty()) {
      const detectedIds = Array.from(ids.data32S);
      console.log("Обнаружены маркеры:", detectedIds);

      // Дополнительно выводим corners для проверки
      console.log("Количество углов на каждый маркер:", corners.size());

      // Проверка всех ID 0,1,2,3
      const required = [0, 1, 2, 3];
      if (required.every(id => detectedIds.includes(id))) {
        console.log("✔️ ВСЕ 4 маркера найдены!");
        if (onCapture) onCapture({ ids: detectedIds });
      }
    }

    gray.delete();
    corners.delete();
    ids.delete();
  };

  // Запуск камеры
  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(err => {
              console.warn("video.play() прерван:", err);
            });
          };
        }
      } catch (err) {
        console.error("Ошибка запуска камеры:", err);
      }
    };

    startCamera();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  // Инициализация OpenCV + ArUco
  useEffect(() => {
    let isMounted = true;

    // const initAruco = () => {
    //   console.log("✅ OpenCV и ArUco загружены");

    //   const dictionary = new cv.aruco_Dictionary(cv.DICT_4X4_50);
    //   const detectorParams = new cv.aruco_DetectorParameters();
    //   const detector = new cv.aruco_ArucoDetector(dictionary, detectorParams);

    //   // Интервал детекции с видео
    //   intervalRef.current = setInterval(() => {
    //     if (!videoRef.current || !canvasRef.current) return;

    //     const video = videoRef.current;
    //     const canvas = canvasRef.current;
    //     canvas.width = video.videoWidth;
    //     canvas.height = video.videoHeight;
    //     const ctx = canvas.getContext("2d");
    //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    //     const src = cv.imread(canvas);
    //     detectMarkers(src, detector);
    //     src.delete();
    //   }, 200);

    //   // Тест на изображении
    //   const imgTest = document.createElement('img');
    //   imgTest.src = "/test_marker.png"; // файл в папке public
    //   imgTest.onload = () => {
    //     const mat = cv.imread(imgTest);
    //     console.log("=== Тест на изображении ===");
    //     detectMarkers(mat, detector);
    //     mat.delete();
    //   };
    // };

    const initAruco = () => {
      console.log("✅ OpenCV и ArUco загружены");

      const dictionary = cv.aruco.getPredefinedDictionary(cv.aruco.DICT_4X4_50);
      const detectorParams = new cv.aruco.DetectorParameters();
      const detector = new cv.aruco.ArucoDetector(dictionary, detectorParams);

      // Интервал детекции с видео
      intervalRef.current = setInterval(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const src = cv.imread(canvas);
        detectMarkers(src, detector);
        src.delete();
      }, 200);

      // Тест на изображении
      const imgTest = document.createElement('img');
      imgTest.src = "/test_marker.png"; // файл в папке public
      imgTest.onload = () => {
        const mat = cv.imread(imgTest);
        console.log("=== Тест на изображении ===");
        detectMarkers(mat, detector);
        mat.delete();
      };
    };

    // Проверяем, загружен ли OpenCV
    if (cv?.onRuntimeInitialized) {
      cv.onRuntimeInitialized = () => {
        if (!isMounted) return;
        initAruco();
      };
    } else if (cv) {
      initAruco();
    }

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