import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useCameraReady } from "../../hooks/useCameraReady";
import { useMarkerDetection } from "../../hooks/useMarkerDetection";
import { useNavigate } from "react-router-dom";
import AdjustableFrame from "./AdjustableFrame";

import whiteFrame from "../../assets/whiteFrame.svg";
import greenFrame from "../../assets/greenFrame.svg";
import Logo from "../../assets/Logo";

import styles from "./CameraCapture.module.css";

const CameraCapture = ({ onCapture, onExit }) => {
    const webcamRef = useRef(null);
    const videoRef = useRef(null);
    const frameRef = useRef(null);
    const navigate = useNavigate();

    const [isInside, setInside] = useState(false);
    const [insideTimer, setInsideTimer] = useState(null);

    const isReady = useCameraReady(webcamRef);

    const videoConstraints = {
        facingMode: "environment",
        width: { ideal: 1920 },
        height: { ideal: 1080 },
    };

    useEffect(() => {
        if (isInside) {
            // Если таймер уже существует — ничего не делаем
            if (insideTimer) return;

            // Запускаем таймер на 2 секунды
            const timer = setTimeout(() => {
                navigate("/camera-processing");  // ← переход
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

    const handleExit = () => {
        const video = webcamRef.current?.video;
        video?.srcObject?.getTracks().forEach((track) => track.stop());
        onExit();
        navigate("/");
    };

    useMarkerDetection(videoRef, frameRef, setInside);


    // Внутренний компонент рамки
    const Frame = ({ inside }) => (
        <img
            src={inside ? greenFrame : whiteFrame}
            className={styles.frameImage}
            alt="frame"
        />
    );

    const buttonContent = isInside ? "Successfully captured" : "Move closer";

    // const ctx = canvas.getContext("2d", { willReadFrequently: true });

    return (
        <div className={styles.content}>
            <div className={styles.wrapLogo}>
                <div className={styles.logo}>
                    <Logo />
                </div>
            </div>

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

                        {/* EXIT BUTTON */}
                        <div className={styles.wrapExitBtn}>
                            <button
                                className={styles.exitBtn}
                                onClick={handleExit}
                                aria-label="Exit"
                            >
                                X
                            </button>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBlock}>
                    <p className={styles.text}>
                        Place your test strip inside the frame and hold still — we’ll scan it automatically.
                    </p>
                    <div className={styles.wrapLine}>
                        <div className={styles.line}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CameraCapture;