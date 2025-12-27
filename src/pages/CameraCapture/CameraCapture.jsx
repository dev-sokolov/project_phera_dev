// import { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import { useCameraReady } from "../../hooks/useCameraReady";
// import { useMarkerDetection } from "../../hooks/useMarkerDetection";
// import { useNavigate } from "react-router-dom";
// import { useArucoDetection } from "../../hooks/useArucoDetection";

// // import AdjustableFrame from "./AdjustableFrame";

// import whiteFrame from "../../assets/whiteFrame.svg";
// import greenFrame from "../../assets/greenFrame.svg";
// import Logo from "../../assets/Logo";
// import ArrowLeft from "../../assets/icons/ArrowLeft";

// import styles from "./CameraCapture.module.css";

// const CameraCapture = ({ onCapture, onExit }) => {
//     const webcamRef = useRef(null);
//     const videoRef = useRef(null);
//     const frameRef = useRef(null);
//     const navigate = useNavigate();
//     const [markersFound, setMarkersFound] = useState([]);

//     // const arucoDetector = new Detector();
//     const detectorRef = useRef(null);
//     // const detectorRef = useRef(new AR.Detector());
//     // const detectorRef = useRef(new window.AR.Detector());

//     const [isInside, setInside] = useState(false);
//     const [insideTimer, setInsideTimer] = useState(null);

//     const isReady = useCameraReady(webcamRef);

//     // Детектируем маркеры
//     const detectedMarkers = useArucoDetection(webcamRef, [0, 1, 2, 3], (detected) => {
//         setMarkersFound(detected);
//         // Можно здесь включать логику State Machine, например:
//         // если найдены все 4 маркера → перейти в состояние ALIGN/LOCKED
//     });

//     function loadAruco() {
//         return new Promise((resolve, reject) => {
//             if (window.AR) return resolve();

//             const script = document.createElement("script");
//             script.onload = () => resolve();
//             script.onerror = () => reject(new Error("Failed to load js-aruco"));
//             document.body.appendChild(script);
//         });
//     }

//     // const videoConstraints = {
//     //     facingMode: "environment",
//     //     width: { ideal: 1920 },
//     //     height: { ideal: 1080 },
//     // };

//     const videoConstraints = {
//         facingMode: "environment",
//         width: 640,
//         height: 480,
//     };

//     useEffect(() => {
//         let mounted = true;

//         loadAruco().then(() => {
//             if (!mounted) return;

//             if (!window.AR) {
//                 console.error("js-aruco still not loaded");
//                 return;
//             }

//             console.log("js-aruco READY");
//             detectorRef.current = new window.AR.Detector();
//         });

//         return () => {
//             mounted = false;
//         };
//     }, []);

//     useEffect(() => {
//         if (window.AR) {
//             detectorRef.current = new window.AR.Detector();
//         } else {
//             console.error("js-aruco not loaded yet");
//         }
//     }, []);

//     useEffect(() => {
//         if (!webcamRef.current) return;
//         const video = webcamRef.current.video;
//         if (!video) return;

//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d", { willReadFrequently: true });

//         let rafId;

//         const detectMarkers = () => {
//             if (video.readyState < 2 || !detectorRef.current) {
//                 rafId = requestAnimationFrame(detectMarkers);
//                 return;
//             }

//             // canvas.width = video.videoWidth;
//             // canvas.height = video.videoHeight;
//             // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//             canvas.width = 640;
//             canvas.height = 480;
//             ctx.drawImage(video, 0, 0, 640, 480);

//             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//             const markers = detectorRef.current.detect(imageData);
//             console.log("Markers found:", markers.length);

//             if (markers.length > 0) {
//                 const firstMarker = markers[0];
//                 const [topLeft, topRight, bottomRight, bottomLeft] = firstMarker.corners;
//                 console.log("Marker ID:", firstMarker.id);
//                 console.log("Top-left corner:", topLeft);
//                 console.log("Top-right corner:", topRight);
//                 console.log("Bottom-right corner:", bottomRight);
//                 console.log("Bottom-left corner:", bottomLeft);
//             }

//             document.body.appendChild(canvas);
//             canvas.style.position = "absolute";
//             canvas.style.top = "0";
//             canvas.style.left = "0";
//             canvas.style.width = "320px";
//             canvas.style.height = "240px";

//             rafId = requestAnimationFrame(detectMarkers);
//         };

//         rafId = requestAnimationFrame(detectMarkers);

//         return () => cancelAnimationFrame(rafId);
//     }, [webcamRef]);


//     useEffect(() => {
//         if (isInside) {
//             // Если таймер уже существует — ничего не делаем
//             if (insideTimer) return;

//             // Запускаем таймер на 2 секунды
//             const timer = setTimeout(() => {
//                 navigate("/camera-processing", { replace: true });  // ← переход
//             }, 2000);

//             setInsideTimer(timer);
//         } else {
//             // Если объект вышел из рамки — удаляем таймер
//             if (insideTimer) {
//                 clearTimeout(insideTimer);
//                 setInsideTimer(null);
//             }
//         }
//     }, [isInside]);

//     // Останавливаем камеру при размонтировании
//     useEffect(() => {
//         return () => {
//             const video = webcamRef.current?.video;
//             video?.srcObject?.getTracks().forEach((track) => track.stop());
//         };
//     }, []);

//     const Frame = ({ inside }) => (
//         <img
//             src={inside ? greenFrame : whiteFrame}
//             className={styles.frameImage}
//             alt="frame"
//         />
//     );

//     const buttonContent = isInside ? "Successfully captured" : "Move closer";

//     return (
//         <div className={styles.content}>
//             <div className={styles.containerInner}>
//                 <div className={styles.cameraBlock}>
//                     <div className={styles.cameraContainer}>
//                         <div className={styles.overlay}>
//                             <button
//                                 className={`${styles.btn} ${isInside ? styles.btnSuccess : ""}`}
//                             >
//                                 {buttonContent}
//                             </button>
//                             <div ref={frameRef} className={styles.frameBox}>
//                                 <Frame inside={isInside} />
//                                 {/* <AdjustableFrame /> */}
//                             </div>
//                         </div>

//                         <Webcam
//                             ref={webcamRef}
//                             audio={false}
//                             screenshotFormat="image/png"
//                             videoConstraints={videoConstraints}
//                             className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
//                             onUserMedia={() => {
//                                 videoRef.current = webcamRef.current.video;
//                             }}
//                             onUserMediaError={(err) => {
//                                 console.error("Camera error:", err);
//                                 alert("Unable to start camera. Check permissions.");
//                                 onExit();
//                             }}
//                             playsInline
//                         />
//                     </div>
//                 </div>

//                 <div className={styles.bottomBlock}>
//                     <p className={styles.text}>
//                         Place your test strip inside the frame and hold still — we’ll scan it automatically.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CameraCapture;





import { useRef, useEffect } from "react";
import Webcam from "react-webcam";

const CameraCapture = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const detectorRef = useRef(null);

    useEffect(() => {


        function processFrame() {
            const video = webcamRef.current?.video;
            if (!video || video.readyState < 2 || !detectorRef.current) {
                requestAnimationFrame(processFrame);
                return;
            }

            const canvas = canvasRef.current;
            // const ctx = canvas.getContext("2d");
            const ctx = canvas.getContext("2d", { willReadFrequently: true });

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Рисуем видео на canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Получаем данные изображения
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Детектируем маркеры
            const markers = detectorRef.current.detect(imageData);

            // Рисуем маркеры на canvas
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;

            markers.forEach((marker) => {
                const corners = marker.corners;
                ctx.beginPath();
                ctx.moveTo(corners[0].x, corners[0].y);
                for (let i = 1; i < corners.length; i++) {
                    ctx.lineTo(corners[i].x, corners[i].y);
                }
                ctx.closePath();
                ctx.stroke();

                // Выводим id
                ctx.fillStyle = "yellow";
                ctx.font = "20px Arial";
                ctx.fillText(`ID: ${marker.id}`, corners[0].x, corners[0].y - 10);

                console.log("Marker ID:", marker.id, "Corners:", corners);
            });

            requestAnimationFrame(processFrame);
        }

        // Ждём, пока js-aruco загрузится
        const waitForAR = () => {
            if (window.AR) {
                detectorRef.current = new window.AR.Detector();
                requestAnimationFrame(processFrame);
            } else {
                setTimeout(waitForAR, 100);
            }
        };

        waitForAR();
    }, []);

    return (
        <div style={{ position: "relative", width: "640px", height: "480px" }}>
            <Webcam
                ref={webcamRef}
                audio={false}
                style={{ position: "absolute", top: 0, left: 0, width: "640px", height: "480px" }}
                videoConstraints={{ facingMode: "environment", width: 640, height: 480 }}
                playsInline
            />
            <canvas
                ref={canvasRef}
                style={{ position: "absolute", top: 0, left: 0, width: "640px", height: "480px" }}
            />
        </div>
    );
};

export default CameraCapture;




