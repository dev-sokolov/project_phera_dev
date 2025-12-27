
// import { useEffect, useState } from "react";

// export default function TestAruco() {
//   const [status, setStatus] = useState("⏳ Проверяем OpenCV…");

//   useEffect(() => {
//     const waitCV = setInterval(() => {
//       if (window.cv?.onRuntimeInitialized) {
//         clearInterval(waitCV);
//         cv.onRuntimeInitialized = () => {
//           console.log("🔥 OpenCV готов!");

//           // Проверяем ArUco
//           if (cv.aruco) {
//             console.log("✅ ArUco доступен:", cv.aruco);
//             setStatus("✅ ArUco доступен!");
//           } else {
//             console.error("❌ ArUco не найден");
//             setStatus("❌ ArUco не найден");
//           }
//         };
//       }
//     }, 100);
//   }, []);

//   return <h2>{status}</h2>;
// }

import { useEffect, useRef, useState } from "react";
// import AR from "js-aruco";

export default function TestAruco() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("⏳ Проверяем ArUco...");

  let AR;
  (async () => {
    AR = await import("js-aruco");
  })();

//   useEffect(() => {
//   const detector = new AR.Detector(); // AR теперь глобальный
// }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStatus("✅ Камера запущена, ArUco готов к детекции!");
      } catch (e) {
        console.error(e);
        setStatus("❌ Не удалось запустить камеру");
      }
    };

    startCamera();
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "320px", height: "240px" }}
        playsInline
        muted
      />
      <p>{status}</p>
    </div>
  );
}