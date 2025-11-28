import { useRef, useEffect, useMemo } from "react";
import Webcam from "react-webcam";
// import alertCircle from "../../assets/icons/alertCircle.svg";

import { useCameraReady } from "../../hooks/useCameraReady";
import { useMarkerDetection } from "../../hooks/useMarkerDetection";
import { useCapture } from "../../hooks/useCapture";

// import CameraFrame from "../../assets/CameraFrame";
// import Frame from "../../assets/Frame.svg";
import whiteFrame from "../../assets/whiteFrame.svg"
import greenFrame from "../../assets/greenFrame.svg"
// import GreenFrame from "../../assets/GreenFrame";
import Logo from "../../assets/Logo";

import styles from "./CameraCapture.module.css";

const CameraCapture = ({ onCapture, onExit }) => {
    const webcamRef = useRef(null);

    const isReady = useCameraReady(webcamRef);
    const { hasFourMarkers, startDetection } = useMarkerDetection(webcamRef);
    const { isProcessing, capture } = useCapture(webcamRef, onCapture);

    const videoConstraints = useMemo(() => ({
        facingMode: "environment",
        width: { ideal: 1920 },
        height: { ideal: 1080 },
    }), []);

    useEffect(() => {
        if (isReady) startDetection();
    }, [isReady, startDetection]);

    useEffect(() => () => {
        const video = webcamRef.current?.video;
        video?.srcObject?.getTracks().forEach(track => track.stop());
    }, []);

    useEffect(() => {
        if (hasFourMarkers && navigator.vibrate) navigator.vibrate(80);
    }, [hasFourMarkers]);

    const handleExit = () => {
        const video = webcamRef.current?.video;
        video?.srcObject?.getTracks().forEach(track => track.stop());
        onExit();
    };

    // const buttonText = isProcessing ? "Capturing..." : "Simulate auto-capture";

    if (!window.cv || !cv.Mat) return <div>Loading OpenCV...</div>;

    return (
        <>
            <div className={styles.content}>
                <div className={styles.wrapLogo}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                </div>
                {/* <Container> */}
                <div className={styles.containerInner}>
                    <div className={styles.cameraBlock}>
                        <div className={styles.cameraContainer}>
                            <div className={styles.overlay}>
                                <button>Move closer</button>
                                <img src={whiteFrame} alt="whiteFrame" />
                            </div>
                            <Webcam
                                ref={webcamRef}
                                audio={false}
                                screenshotFormat="image/png"
                                videoConstraints={videoConstraints}
                                className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
                                onUserMediaError={err => {
                                    console.error("Camera error:", err);
                                    alert("Unable to start camera. Check permissions.");
                                    onExit();
                                }}
                                playsInline
                            />

                            <div className={styles.topControls}>
                                <button className={styles.exitBtn} onClick={handleExit} aria-label="Exit">X</button>
                            </div>

                            {/* <div className={`${styles.viewfinder} ${hasFourMarkers ? styles.detected : ""}`}>
                                <div className={styles["bottom-left"]}></div>
                                <div className={styles["bottom-right"]}></div>
                            </div> */}
                        </div>
                    </div>
                    <div className={styles.bottomBlock}>
                        <p className={styles.text}>Place your test strip inside the frame and hold still — we’ll scan it automatically.</p>
                        <div className={styles.wrapLine}>
                            <div className={styles.line}></div>
                        </div>
                    </div>
                </div>
                {/* </Container> */}
            </div>
        </>
    )
};

export default CameraCapture;