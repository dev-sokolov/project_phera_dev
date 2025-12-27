import { useEffect, useState } from "react";

export default function CheckAruco() {
  const [status, setStatus] = useState("⏳ Проверяем ArUco…");

  useEffect(() => {
    const interval = setInterval(() => {
      // Проверяем js-aruco
      const jsArucoReady = !!window.AR;

      // Проверяем OpenCV ArUco
      const cvReady = !!window.cv && !!window.cv.aruco;

      if (jsArucoReady || cvReady) {
        clearInterval(interval);
        let message = "";
        if (cvReady) message += "✅ OpenCV ArUco доступен. ";
        if (jsArucoReady) message += "✅ js-aruco доступен.";
        setStatus(message);
        console.log(message);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return <h2>{status}</h2>;
}