// import { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import { useCameraReady } from "../../hooks/useCameraReady";
// import { useMarkerDetection } from "../../hooks/useMarkerDetection";
// import { useNavigate } from "react-router-dom";
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

//     const [isInside, setInside] = useState(false);
//     const [insideTimer, setInsideTimer] = useState(null);

//     const isReady = useCameraReady(webcamRef);

//     const videoConstraints = {
//         facingMode: "environment",
//         width: { ideal: 1920 },
//         height: { ideal: 1080 },
//     };

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

//     // const handleExit = () => {
//     //     const video = webcamRef.current?.video;
//     //     video?.srcObject?.getTracks().forEach((track) => track.stop());
//     //       onExit?.();
//     // };

//     // useMarkerDetection(videoRef, frameRef, setInside); //временно !!!! убрать комментирование!!!!!!!!!!!!

//     useEffect(() => {                        //временно !!!!!!!! Удалить!!!!!!!!!!!!
//         const timer1 = setTimeout(() => {       //временно !!!!!!!! Удалить!!!!!!!!!!!!
//             setInside(true);                    //временно !!!!!!!! Удалить!!!!!!!!!!!!
//         }, 3000);                               //временно !!!!!!!! Удалить!!!!!!!!!!!!

//         const timer2 = setTimeout(() => {       //временно !!!!!!!! Удалить!!!!!!!!!!!!
//             navigate("/camera-processing", { replace: true });     //временно !!!!!!!! Удалить!!!!!!!!!!!!
//         }, 4000);                               //временно !!!!!!!! Удалить!!!!!!!!!!!!

//         return () => {                          //временно !!!!!!!! Удалить!!!!!!!!!!!!
//             clearTimeout(timer1);               //временно !!!!!!!! Удалить!!!!!!!!!!!!
//             clearTimeout(timer2);               //временно !!!!!!!! Удалить!!!!!!!!!!!!
//         };                                      //временно !!!!!!!! Удалить!!!!!!!!!!!!
//     }, []);                                     //временно !!!!!!!! Удалить!!!!!!!!!!!!

//     // useEffect(() => {
//     //     const handlePopState = () => {
//     //         navigate("/camera-access", { replace: true });
//     //     };

//     //     window.addEventListener("popstate", handlePopState);
//     //     return () => window.removeEventListener("popstate", handlePopState);
//     // }, [navigate]);

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







import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useCameraReady } from "../../hooks/useCameraReady";
import { useMarkerDetection } from "../../hooks/useMarkerDetection";
import { useNavigate } from "react-router-dom";

// import AdjustableFrame from "./AdjustableFrame";

import whiteFrame from "../../assets/whiteFrame.svg";
import greenFrame from "../../assets/greenFrame.svg";
import Logo from "../../assets/Logo";
import ArrowLeft from "../../assets/icons/ArrowLeft";

import styles from "./CameraCapture.module.css";

const CameraCapture = ({ onCapture, onExit }) => {
    const webcamRef = useRef(null);
    const videoRef = useRef(null);
    const frameRef = useRef(null);
    const navigate = useNavigate();

    // const arucoDetector = new Detector();
    const detectorRef = useRef(null);

    const [isInside, setInside] = useState(false);
    const [insideTimer, setInsideTimer] = useState(null);

    const isReady = useCameraReady(webcamRef);

    function loadAruco() {
        return new Promise((resolve, reject) => {
            if (window.AR) return resolve();

            const script = document.createElement("script");
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Failed to load js-aruco"));
            document.body.appendChild(script);
        });
    }

    const videoConstraints = {
        facingMode: "environment",
        width: { ideal: 1920 },
        height: { ideal: 1080 },
    };

    useEffect(() => {
        let mounted = true;

        loadAruco().then(() => {
            if (!mounted) return;

            if (!window.AR) {
                console.error("js-aruco still not loaded");
                return;
            }

            console.log("js-aruco READY");
            detectorRef.current = new window.AR.Detector();
        });

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (!window.AR) return console.error("Aruco not loaded");
        detectorRef.current = new window.AR.Detector();
    }, []);

    useEffect(() => {
        if (!webcamRef.current) return;
        const video = webcamRef.current.video;
        if (!video) return;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let rafId;

        const detectMarkers = () => {
            if (video.readyState < 2) {
                rafId = requestAnimationFrame(detectMarkers);
                return;
            }

            if (!detectorRef.current) {
                rafId = requestAnimationFrame(detectMarkers);
                return;
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);



            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // const canvas = document.createElement("canvas");
            // const ctx = canvas.getContext("2d", { willReadFrequently: true });

            const markers = detectorRef.current.detect(imageData);

            if (markers.length > 0) {
                const firstMarker = markers[0];
                const [topLeft, topRight, bottomRight, bottomLeft] = firstMarker.corners;
                console.log("Marker ID:", firstMarker.id);
                console.log("Top-left corner:", topLeft);
                console.log("Top-right corner:", topRight);
                console.log("Bottom-right corner:", bottomRight);
                console.log("Bottom-left corner:", bottomLeft);
            }

            markers.forEach(marker => {
                console.log("Marker ID:", marker.id);
                console.log("Corners:", marker.corners);
            });

            rafId = requestAnimationFrame(detectMarkers);
        };

        rafId = requestAnimationFrame(detectMarkers);

        return () => cancelAnimationFrame(rafId);
    }, [webcamRef]);



    useEffect(() => {
        if (isInside) {
            // Если таймер уже существует — ничего не делаем
            if (insideTimer) return;

            // Запускаем таймер на 2 секунды
            const timer = setTimeout(() => {
                navigate("/camera-processing", { replace: true });  // ← переход
            }, 2000);

            setInsideTimer(timer);
        } else {
            // Если объект вышел из рамки — удаляем таймер
            if (insideTimer) {
                clearTimeout(insideTimer);
                setInsideTimer(null);
            }
        }
    }, [isInside]);

    // Останавливаем камеру при размонтировании
    useEffect(() => {
        return () => {
            const video = webcamRef.current?.video;
            video?.srcObject?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    // const handleExit = () => {
    //     const video = webcamRef.current?.video;
    //     video?.srcObject?.getTracks().forEach((track) => track.stop());
    //       onExit?.();
    // };

    // useMarkerDetection(videoRef, frameRef, setInside); //временно !!!! убрать комментирование!!!!!!!!!!!!

    // useEffect(() => {                        //временно !!!!!!!! Удалить!!!!!!!!!!!!
    //     const timer1 = setTimeout(() => {       //временно !!!!!!!! Удалить!!!!!!!!!!!!
    //         setInside(true);                    //временно !!!!!!!! Удалить!!!!!!!!!!!!
    //     }, 30000);                               //временно !!!!!!!! Удалить!!!!!!!!!!!!

    //     const timer2 = setTimeout(() => {       //временно !!!!!!!! Удалить!!!!!!!!!!!!
    //         navigate("/camera-processing", { replace: true });     //временно !!!!!!!! Удалить!!!!!!!!!!!!
    //     }, 40000);                               //временно !!!!!!!! Удалить!!!!!!!!!!!!

    //     return () => {                          //временно !!!!!!!! Удалить!!!!!!!!!!!!
    //         clearTimeout(timer1);               //временно !!!!!!!! Удалить!!!!!!!!!!!!
    //         clearTimeout(timer2);               //временно !!!!!!!! Удалить!!!!!!!!!!!!
    //     };                                      //временно !!!!!!!! Удалить!!!!!!!!!!!!
    // }, []);                                     //временно !!!!!!!! Удалить!!!!!!!!!!!!

    // useEffect(() => {
    //     const handlePopState = () => {
    //         navigate("/camera-access", { replace: true });
    //     };

    //     window.addEventListener("popstate", handlePopState);
    //     return () => window.removeEventListener("popstate", handlePopState);
    // }, [navigate]);

    const Frame = ({ inside }) => (
        <img
            src={inside ? greenFrame : whiteFrame}
            className={styles.frameImage}
            alt="frame"
        />
    );

    const buttonContent = isInside ? "Successfully captured" : "Move closer";

    return (
        <div className={styles.content}>
            <div className={styles.containerInner}>
                <div className={styles.cameraBlock}>
                    <div className={styles.cameraContainer}>
                        <div className={styles.overlay}>
                            <button
                                className={`${styles.btn} ${isInside ? styles.btnSuccess : ""}`}
                            >
                                {buttonContent}
                            </button>
                            <div ref={frameRef} className={styles.frameBox}>
                                <Frame inside={isInside} />
                                {/* <AdjustableFrame /> */}
                            </div>
                        </div>

                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/png"
                            videoConstraints={videoConstraints}
                            className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
                            onUserMedia={() => {
                                videoRef.current = webcamRef.current.video;
                            }}
                            onUserMediaError={(err) => {
                                console.error("Camera error:", err);
                                alert("Unable to start camera. Check permissions.");
                                onExit();
                            }}
                            playsInline
                        />
                    </div>
                </div>

                <div className={styles.bottomBlock}>
                    <p className={styles.text}>
                        Place your test strip inside the frame and hold still — we’ll scan it automatically.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CameraCapture;




