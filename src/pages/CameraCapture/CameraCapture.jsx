// import { useRef, useEffect, useMemo } from "react";
// import Webcam from "react-webcam";
// // import alertCircle from "../../assets/icons/alertCircle.svg";

// import { useCameraReady } from "../../hooks/useCameraReady";
// import { useMarkerDetection } from "../../hooks/useMarkerDetection";
// import { useCapture } from "../../hooks/useCapture";
// import { useNavigate } from "react-router-dom";

// import whiteFrame from "../../assets/whiteFrame.svg"
// import greenFrame from "../../assets/greenFrame.svg"
// import Logo from "../../assets/Logo";

// import styles from "./CameraCapture.module.css";

// const CameraCapture = ({ onCapture, onExit }) => {
//     const webcamRef = useRef(null);
//     const navigate = useNavigate();

//     const isReady = useCameraReady(webcamRef);
//     const { hasFourMarkers, startDetection } = useMarkerDetection(webcamRef);
//     const { isProcessing, capture } = useCapture(webcamRef, onCapture);

//     const videoConstraints = useMemo(() => ({
//         facingMode: "environment",
//         width: { ideal: 1920 },
//         height: { ideal: 1080 },
//     }), []);

//     useEffect(() => {
//         if (isReady) startDetection();
//     }, [isReady, startDetection]);

//     useEffect(() => () => {
//         const video = webcamRef.current?.video;
//         video?.srcObject?.getTracks().forEach(track => track.stop());
//     }, []);

//     useEffect(() => {
//         if (hasFourMarkers && navigator.vibrate) navigator.vibrate(80);
//     }, [hasFourMarkers]);

//     const handleExit = () => {
//         const video = webcamRef.current?.video;
//         video?.srcObject?.getTracks().forEach(track => track.stop());
//         onExit();
//         navigate("/camera-access");
//     };

//     // const buttonText = isProcessing ? "Capturing..." : "Simulate auto-capture";

//     if (!window.cv || !cv.Mat) return <div>Loading OpenCV...</div>;

//     return (
//         <>
//             <div className={styles.content}>
//                 <div className={styles.wrapLogo}>
//                     <div className={styles.logo}>
//                         <Logo />
//                     </div>
//                 </div>
//                 <div className={styles.containerInner}>
//                     <div className={styles.cameraBlock}>
//                         <div className={styles.cameraContainer}>
//                             <div className={styles.overlay}>
//                                 <button className={styles.btn}>Move closer</button>
//                                 <img src={whiteFrame} alt="whiteFrame" />
//                             </div>
//                             <Webcam
//                                 ref={webcamRef}
//                                 audio={false}
//                                 screenshotFormat="image/png"
//                                 videoConstraints={videoConstraints}
//                                 className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
//                                 onUserMediaError={err => {
//                                     console.error("Camera error:", err);
//                                     alert("Unable to start camera. Check permissions.");
//                                     onExit();
//                                 }}
//                                 playsInline
//                             />
//                             <div className={styles.wrapExitBtn}>
//                                 <button className={styles.exitBtn} onClick={handleExit} aria-label="Exit">X</button>
//                             </div>
//                             {/* <div className={styles.wrapMoveCloser}>
//                                 <button className={styles.btn}>Move closer</button>
//                             </div> */}
//                         </div>
//                     </div>
//                     <div className={styles.bottomBlock}>
//                         <p className={styles.text}>Place your test strip inside the frame and hold still — we’ll scan it automatically.</p>
//                         <div className={styles.wrapLine}>
//                             <div className={styles.line}></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// };

// export default CameraCapture;


// -------------------------------------------------------------------------------------------


// import { useRef, useEffect, useMemo, useState } from "react";
// import Webcam from "react-webcam";

// import { useCameraReady } from "../../hooks/useCameraReady";
// import { useMarkerDetection } from "../../hooks/useMarkerDetection";
// import { useCapture } from "../../hooks/useCapture";
// import { useNavigate } from "react-router-dom";

// import whiteFrame from "../../assets/whiteFrame.svg"
// import greenFrame from "../../assets/greenFrame.svg"
// import Logo from "../../assets/Logo";

// import styles from "./CameraCapture.module.css";

// const CameraCapture = ({ onCapture, onExit }) => {
//     const webcamRef = useRef(null);
//     const navigate = useNavigate();

//     const videoRef = useRef(null);
//     const frameRef = useRef(null);

//     const [isInside, setInside] = useState(false);

//     const isReady = useCameraReady(webcamRef);
//     // const { hasFourMarkers, startDetection } = useMarkerDetection(webcamRef);
//     // const { isProcessing, capture } = useCapture(webcamRef, onCapture);

//     const videoConstraints = useMemo(() => ({
//         facingMode: "environment",
//         width: { ideal: 1920 },
//         height: { ideal: 1080 },
//     }), []);

//     // useEffect(() => {
//     //     if (isReady) startDetection();
//     // }, [isReady, startDetection]);

//     useEffect(() => () => {
//         const video = webcamRef.current?.video;
//         video?.srcObject?.getTracks().forEach(track => track.stop());
//     }, []);

//     // useEffect(() => {
//     //     if (hasFourMarkers && navigator.vibrate) navigator.vibrate(80);
//     // }, [hasFourMarkers]);

//     const handleExit = () => {
//         const video = webcamRef.current?.video;
//         video?.srcObject?.getTracks().forEach(track => track.stop());
//         onExit();
//         navigate("/camera-access");
//     };

//     if (!window.cv || !cv.Mat) return <div>Loading OpenCV...</div>;

//     // useMarkerDetection(
//     //     videoRef,
//     //     frameRef,
//     //     (detected) => setInside(detected),
//     //     "/frame-shape.svg"
//     // );


//     useMarkerDetection(
//         videoRef,
//         frameRef,
//         (detected) => setInside(detected),
//         // whiteFrame
//         // templateSvgPath = "/frame-shape.svg"
//     );

//     // const startCamera = async () => {
//     //     const stream = await navigator.mediaDevices.getUserMedia({
//     //         video: { facingMode: "environment" }
//     //     });
//     //     videoRef.current.srcObject = stream;
//     //     videoRef.current.play();
//     // };

//     // const color = isInside ? "#00ff00" : "#ffffff";
//     const color = isInside ? "red" : "#ffffff";

//     return (
//         <>
//             <div className={styles.content}>
//                 <div className={styles.wrapLogo}>
//                     <div className={styles.logo}>
//                         <Logo />
//                     </div>
//                 </div>
//                 <div className={styles.containerInner}>
//                     <div className={styles.cameraBlock}>
//                         <div className={styles.cameraContainer}>
//                             <div className={styles.overlay} ref={frameRef}>
//                                 <button className={styles.btn}>Move closer</button>
//                                 <img
//                                     // ref={frameRef}
//                                     src={isInside ? greenFrame : whiteFrame}
//                                     alt="frame"
//                                     className={styles.frameImage}
//                                 />
//                             </div>
//                             <Webcam
//                                 ref={webcamRef}
//                                 audio={false}
//                                 screenshotFormat="image/png"
//                                 videoConstraints={videoConstraints}
//                                 className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
//                                 onUserMedia={() => {
//                                     videoRef.current = webcamRef.current.video;
//                                 }}
//                                 onUserMediaError={err => {
//                                     console.error("Camera error:", err);
//                                     alert("Unable to start camera. Check permissions.");
//                                     onExit();
//                                 }}
//                                 playsInline
//                             />
//                             <div className={styles.wrapExitBtn}>
//                                 <button className={styles.exitBtn} onClick={handleExit} aria-label="Exit">X</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.bottomBlock}>
//                         <p className={styles.text}>Place your test strip inside the frame and hold still — we’ll scan it automatically.</p>
//                         <div className={styles.wrapLine}>
//                             <div className={styles.line}></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// };

// export default CameraCapture;


import { useRef, useEffect, useMemo, useState } from "react";
import Webcam from "react-webcam";
import { useCameraReady } from "../../hooks/useCameraReady";
import { useMarkerDetection } from "../../hooks/useMarkerDetection";
import { useNavigate } from "react-router-dom";

import whiteFrame from "../../assets/whiteFrame.svg";
import greenFrame from "../../assets/greenFrame.svg";
import Logo from "../../assets/Logo";

import styles from "./CameraCapture.module.css";

const CameraCapture = ({ onCapture, onExit }) => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const frameRef = useRef(null);

  const [isInside, setInside] = useState(false);

  const isReady = useCameraReady(webcamRef);

  const videoConstraints = useMemo(() => ({
    facingMode: "environment",
    width: { ideal: 1920 },
    height: { ideal: 1080 },
  }), []);

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      const video = webcamRef.current?.video;
      video?.srcObject?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const handleExit = () => {
    const video = webcamRef.current?.video;
    video?.srcObject?.getTracks().forEach(track => track.stop());
    onExit();
    navigate("/camera-access");
  };

  if (!window.cv || !cv.Mat) {
    return <div>Loading OpenCV...</div>;
  }

  // VERY IMPORTANT: pass ref to the <img>, not overlay div
  useMarkerDetection(
    videoRef,
    frameRef,
    (detected) => setInside(detected)
  );

  return (
    <>
      <div className={styles.content}>
        <div className={styles.wrapLogo}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </div>

        <div className={styles.containerInner}>
          <div className={styles.cameraBlock}>
            <div className={styles.cameraContainer}>

              {/* OVERLAY (button + frame) */}
              <div className={styles.overlay}>
                <button className={styles.btn}>Move closer</button>

                {/* FRAME IMAGE FOR DETECTION */}
                <img
                  ref={frameRef}
                  src={isInside ? greenFrame : whiteFrame}
                  alt="frame"
                  className={styles.frameImage}
                />
              </div>

              {/* CAMERA */}
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                className={`${styles.webcamVideo} ${
                  isReady ? styles.show : ""
                }`}
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
              Place your test strip inside the frame and hold still — we’ll scan
              it automatically.
            </p>

            <div className={styles.wrapLine}>
              <div className={styles.line}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraCapture;