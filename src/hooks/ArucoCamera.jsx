import { useEffect, useRef, useState } from "react";

export default function ArucoCamera({ onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const detectLoop = useRef(null);

  const [markersFound, setMarkersFound] = useState(false);

  // запуск камеры
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" }
          },
          audio: false,
        });

        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      } catch (e) {
        console.error("Ошибка доступа к камере:", e);
      }
    };

    startCamera();
  }, []);

  // детекция
  useEffect(() => {
    if (!window.cv) return;

    let detector = null;

    const initAruco = () => {
      console.log("🎯 Инициализация ArUco…");

      const dict = new cv.aruco.Dictionary(cv.aruco.DICT_4X4_50);
      const params = new cv.aruco.DetectorParameters();

      detector = new cv.aruco.ArucoDetector(dict, params);

      startDetection();
    };

    const startDetection = () => {
      detectLoop.current = setInterval(() => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        if (video.videoWidth === 0) return; // камера ещё не готова

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0);

        const frame = cv.imread(canvas);

        const corners = new cv.MatVector();
        const ids = new cv.Mat();

        detector.detectMarkers(frame, corners, ids);

        ctx.strokeStyle = "lime";
        ctx.lineWidth = 3;

        let found = false;

        if (!ids.empty()) {
          const foundIds = Array.from(ids.data32S);

          for (let i = 0; i < corners.size(); i++) {
            const c = corners.get(i);
            ctx.beginPath();
            ctx.moveTo(c.data32F[0], c.data32F[1]);
            for (let j = 1; j < 4; j++) {
              ctx.lineTo(c.data32F[j * 2], c.data32F[j * 2 + 1]);
            }
            ctx.closePath();
            ctx.stroke();
          }

          if ([0, 1, 2, 3].every(id => foundIds.includes(id))) {
            found = true;
            if (onCapture) onCapture(foundIds);
          }
        }

        setMarkersFound(found);

        frame.delete();
        corners.delete();
        ids.delete();
      }, 150);
    };

    initAruco();

    return () => {
      clearInterval(detectLoop.current);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <video
        ref={videoRef}
        playsInline
        muted
        style={{ width: "100%", height: "auto" }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {markersFound && (
        <div style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,255,0,0.7)",
          padding: "10px 20px",
          borderRadius: "10px",
          fontWeight: "bold",
          zIndex: 10
        }}>
          ✔ Маркеры 0–3 найдены!
        </div>
      )}
    </div>
  );
}