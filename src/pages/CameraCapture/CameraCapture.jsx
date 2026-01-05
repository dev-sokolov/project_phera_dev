import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import styles from "./CameraCapture.module.css"
import useCameraReady from "../../hooks/useCameraReady";
import { checkImageQuality } from "../../hooks/imageQuality";

const CameraCapture = () => {
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [hasFourMarkers, setHasFourMarkers] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [qualityWarning, setQualityWarning] = useState(null);
    const [useHighRes, setUseHighRes] = useState(false);
    const detectionIntervalRef = useRef(null);
    const isDetectingRef = useRef(false);
    const rafIdRef = useRef(null);
    const hasAutoCapturedRef = useRef(false);
    const qualityCheckCounterRef = useRef(0);
    const isSwitchingResolutionRef = useRef(false); // ✅ Флаг переключения

    const isReady = useCameraReady(webcamRef);

    const videoConstraints = useMemo(() => ({
        facingMode: "environment",
        width: { ideal: useHighRes ? 1920 : 1280 },
        height: { ideal: useHighRes ? 1080 : 720 },
        advanced: [
            { whiteBalanceMode: "manual" },
            { colorTemperature: 5000 },
            { exposureMode: "manual" },
            { exposureCompensation: 0 }
        ]
    }), [useHighRes]);

    useEffect(() => {
        if (isReady && webcamRef.current) {
            const video = webcamRef.current.video;
            const track = video.srcObject?.getVideoTracks()[0];
            
            if (track) {
                const capabilities = track.getCapabilities?.();
                const settings = track.getSettings?.();
                
                console.log("📷 Camera capabilities:", capabilities);
                console.log("⚙️ Current settings:", settings);
                
                if (!capabilities?.whiteBalanceMode?.includes('manual')) {
                    console.warn("⚠️ Manual white balance NOT supported");
                }
                if (!capabilities?.exposureMode?.includes('manual')) {
                    console.warn("⚠️ Manual exposure NOT supported");
                }
            }
        }
    }, [isReady]);

    const handleCapture = useCallback(async (blob) => {
        try {
            navigate("/camera-processing", {
                state: {
                    imageBlob: blob
                },
                replace: true
            });

        } catch (error) {
            console.error("Error sending to backend:", error);
            alert("There was an error sending the image to the server. Please try again.");
            setIsProcessing(false);
            hasAutoCapturedRef.current = false;
            isSwitchingResolutionRef.current = false;

            if (isReady && window.cv) {
                detectionIntervalRef.current = setInterval(detectMarkers, 500);
            }
        }
    }, [navigate, isReady]);

    const handleExit = useCallback(() => {
        const video = webcamRef.current?.video;
        video?.srcObject?.getTracks().forEach(track => track.stop());
        navigate("/camera-access");
    }, [navigate]);

    const detectMarkers = useCallback(() => {
        // ✅ Пропускаем детекцию во время переключения разрешения
        if (isDetectingRef.current || !webcamRef.current || !window.cv || isSwitchingResolutionRef.current) return;

        const video = webcamRef.current.video;
        if (!video || video.readyState !== video.HAVE_ENOUGH_DATA) return;

        // ✅ Проверяем что видео имеет валидные размеры
        if (video.videoWidth === 0 || video.videoHeight === 0) {
            console.warn("⚠️ Video dimensions are 0, skipping detection");
            return;
        }

        isDetectingRef.current = true;

        rafIdRef.current = requestAnimationFrame(() => {
            try {
                const cv = window.cv;

                const tempCanvas = document.createElement('canvas');
                const scale = 0.2;
                tempCanvas.width = video.videoWidth * scale;
                tempCanvas.height = video.videoHeight * scale;
                const ctx = tempCanvas.getContext('2d', { willReadFrequently: true });
                ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);

                qualityCheckCounterRef.current++;
                let currentQualityCheck = null;
                
                if (qualityCheckCounterRef.current % 3 === 0) {
                    currentQualityCheck = checkImageQuality(tempCanvas);

                    if (!currentQualityCheck.isGoodQuality) {
                        setQualityWarning(currentQualityCheck.issues.join(', '));
                    } else {
                        setQualityWarning(null);
                    }
                }

                const img = cv.imread(tempCanvas);

                const dictionary = cv.getPredefinedDictionary(cv.DICT_4X4_50);
                const detectorParams = new cv.aruco_DetectorParameters();
                const refineParams = new cv.aruco_RefineParameters(10, 3, true);
                const detector = new cv.aruco_ArucoDetector(dictionary, detectorParams, refineParams);

                const corners = new cv.MatVector();
                const ids = new cv.Mat();
                detector.detectMarkers(img, corners, ids);

                const cornerIds = [0, 1, 3, 2];
                let foundCount = 0;

                for (let i = 0; i < ids.rows; i++) {
                    const markerId = ids.intAt(i, 0);
                    if (cornerIds.includes(markerId)) {
                        foundCount++;
                    }
                }

                const allFound = foundCount === 4;
                setHasFourMarkers(allFound);

                // ✅ АВТОЗАХВАТ С ПЕРЕКЛЮЧЕНИЕМ НА HIGH-RES
                if (allFound && !hasAutoCapturedRef.current && !isProcessing) {
                    const finalQualityCheck = checkImageQuality(tempCanvas);
                    
                    if (finalQualityCheck.isGoodQuality) {
                        hasAutoCapturedRef.current = true;
                        isSwitchingResolutionRef.current = true; // ✅ Блокируем детекцию
                        
                        // ✅ Останавливаем детекцию перед переключением
                        if (detectionIntervalRef.current) {
                            clearInterval(detectionIntervalRef.current);
                        }
                        
                        console.log("🎯 Switching to high-res for capture...");
                        setUseHighRes(true);
                        
                        // Даем время камере переключиться
                        setTimeout(() => {
                            captureAndCrop();
                        }, 1000); // ✅ Увеличили до 1 секунды
                    } else {
                        console.warn("⚠️ Markers found but quality is poor:", finalQualityCheck.issues);
                        setQualityWarning(finalQualityCheck.issues.join(', '));
                    }
                }

                img.delete();
                corners.delete();
                ids.delete();
                detector.delete();
                detectorParams.delete();
                refineParams.delete();
                dictionary.delete();
            } catch (error) {
                console.error('Marker detection error:', error);
            } finally {
                isDetectingRef.current = false;
            }
        });
    }, [isProcessing]);

    const captureAndCrop = useCallback(async () => {
        if (!webcamRef.current || !window.cv || isProcessing) return;

        setIsProcessing(true);

        setTimeout(async () => {
            try {
                const video = webcamRef.current.video;
                const cv = window.cv;

                // ✅ Ждем пока видео получит валидные размеры
                if (video.videoWidth === 0 || video.videoHeight === 0) {
                    console.warn("⚠️ Video not ready, retrying...");
                    setTimeout(() => captureAndCrop(), 200);
                    return;
                }

                console.log(`📸 Capturing at resolution: ${video.videoWidth}x${video.videoHeight}`);

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = video.videoWidth;
                tempCanvas.height = video.videoHeight;
                const ctx = tempCanvas.getContext('2d', { willReadFrequently: true });
                ctx.drawImage(video, 0, 0);

                let img = cv.imread(tempCanvas);

                const dictionary = cv.getPredefinedDictionary(cv.DICT_4X4_50);
                const detectorParams = new cv.aruco_DetectorParameters();
                const refineParams = new cv.aruco_RefineParameters(10, 3, true);
                const detector = new cv.aruco_ArucoDetector(dictionary, detectorParams, refineParams);

                const corners = new cv.MatVector();
                const ids = new cv.Mat();
                detector.detectMarkers(img, corners, ids);

                if (corners.size() < 4) {
                    alert('4 markers not found!');
                    img.delete();
                    corners.delete();
                    ids.delete();
                    detector.delete();
                    detectorParams.delete();
                    refineParams.delete();
                    dictionary.delete();
                    setIsProcessing(false);
                    hasAutoCapturedRef.current = false;
                    isSwitchingResolutionRef.current = false;
                    setUseHighRes(false);
                    if (isReady && window.cv) {
                        detectionIntervalRef.current = setInterval(detectMarkers, 500);
                    }
                    return;
                }

                const cornerIds = [0, 1, 3, 2];
                const markerCorners = {};

                for (let i = 0; i < ids.rows; i++) {
                    const markerId = ids.intAt(i, 0);

                    if (cornerIds.includes(markerId)) {
                        const corner = corners.get(i);

                        markerCorners[markerId] = {
                            topLeft: { x: corner.floatAt(0, 0), y: corner.floatAt(0, 1) },
                            topRight: { x: corner.floatAt(0, 2), y: corner.floatAt(0, 3) },
                            bottomRight: { x: corner.floatAt(0, 4), y: corner.floatAt(0, 5) },
                            bottomLeft: { x: corner.floatAt(0, 6), y: corner.floatAt(0, 7) }
                        };
                    }
                }

                if (Object.keys(markerCorners).length < 4) {
                    alert('Less than 4 corner markers found!');
                    img.delete();
                    corners.delete();
                    ids.delete();
                    detector.delete();
                    detectorParams.delete();
                    refineParams.delete();
                    dictionary.delete();
                    setIsProcessing(false);
                    hasAutoCapturedRef.current = false;
                    isSwitchingResolutionRef.current = false;
                    setUseHighRes(false);
                    if (isReady && window.cv) {
                        detectionIntervalRef.current = setInterval(detectMarkers, 500);
                    }
                    return;
                }

                const topLeftMarker = markerCorners[cornerIds[0]];
                const topRightMarker = markerCorners[cornerIds[1]];
                const bottomRightMarker = markerCorners[cornerIds[2]];
                const bottomLeftMarker = markerCorners[cornerIds[3]];

                const offset = {
                    top: 10,
                    bottom: 5,
                    left: 7,
                    right: 7
                };

                const offsetPoint = (point, direction, distance) => {
                    const len = Math.hypot(direction.x, direction.y);
                    if (len === 0) return point;

                    const normalized = { x: direction.x / len, y: direction.y / len };
                    return {
                        x: point.x + normalized.x * distance,
                        y: point.y + normalized.y * distance
                    };
                };

                const topLeftDir = {
                    x: bottomLeftMarker.topLeft.x - topLeftMarker.bottomLeft.x,
                    y: bottomLeftMarker.topLeft.y - topLeftMarker.bottomLeft.y
                };
                const topDir = {
                    x: topRightMarker.bottomRight.x - topLeftMarker.bottomLeft.x,
                    y: topRightMarker.bottomRight.y - topLeftMarker.bottomLeft.y
                };
                const topRightDir = {
                    x: bottomRightMarker.topRight.x - topRightMarker.bottomRight.x,
                    y: bottomRightMarker.topRight.y - topRightMarker.bottomRight.y
                };
                const bottomDir = {
                    x: bottomLeftMarker.topLeft.x - bottomRightMarker.topRight.x,
                    y: bottomLeftMarker.topLeft.y - bottomRightMarker.topRight.y
                };

                let pt1 = offsetPoint(topLeftMarker.bottomLeft, topLeftDir, offset.top);
                pt1 = offsetPoint(pt1, { x: -topDir.x, y: -topDir.y }, offset.left);

                let pt2 = offsetPoint(topRightMarker.bottomRight, topRightDir, offset.top);
                pt2 = offsetPoint(pt2, topDir, offset.right);

                let pt3 = offsetPoint(bottomRightMarker.topRight, topRightDir, -offset.bottom);
                pt3 = offsetPoint(pt3, { x: -bottomDir.x, y: -bottomDir.y }, offset.right);

                let pt4 = offsetPoint(bottomLeftMarker.topLeft, topLeftDir, -offset.bottom);
                pt4 = offsetPoint(pt4, bottomDir, offset.left);

                const srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
                    pt1.x, pt1.y,
                    pt2.x, pt2.y,
                    pt3.x, pt3.y,
                    pt4.x, pt4.y
                ]);

                const width = Math.max(
                    Math.hypot(pt2.x - pt1.x, pt2.y - pt1.y),
                    Math.hypot(pt3.x - pt4.x, pt3.y - pt4.y)
                );

                const height = Math.max(
                    Math.hypot(pt4.x - pt1.x, pt4.y - pt1.y),
                    Math.hypot(pt3.x - pt2.x, pt3.y - pt2.y)
                );

                const dstPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
                    0, 0,
                    width, 0,
                    width, height,
                    0, height
                ]);

                const M = cv.getPerspectiveTransform(srcPoints, dstPoints);

                const warped = new cv.Mat();
                const dsize = new cv.Size(width, height);
                cv.warpPerspective(img, warped, M, dsize);

                const outputCanvas = document.createElement('canvas');
                cv.imshow(outputCanvas, warped);

                outputCanvas.toBlob(async (blob) => {
                    if (blob) {
                        await handleCapture(blob);
                    }
                }, 'image/jpeg', 0.95);

                img.delete();
                corners.delete();
                ids.delete();
                detector.delete();
                detectorParams.delete();
                refineParams.delete();
                dictionary.delete();
                srcPoints.delete();
                dstPoints.delete();
                M.delete();
                warped.delete();

            } catch (error) {
                console.error('Image processing error:', error);
                alert('Error while processing image');
                setIsProcessing(false);
                hasAutoCapturedRef.current = false;
                isSwitchingResolutionRef.current = false;
                setUseHighRes(false);
                if (isReady && window.cv) {
                    detectionIntervalRef.current = setInterval(detectMarkers, 500);
                }
            }
        }, 0);
    }, [isProcessing, handleCapture, isReady, detectMarkers]);

    useEffect(() => {
        if (isReady && window.cv && !isSwitchingResolutionRef.current) {
            detectionIntervalRef.current = setInterval(detectMarkers, 500);
        }

        return () => {
            if (detectionIntervalRef.current) {
                clearInterval(detectionIntervalRef.current);
            }
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [isReady, detectMarkers]);

    useEffect(() => {
        if (hasFourMarkers && navigator.vibrate) {
            navigator.vibrate(80);
        }
    }, [hasFourMarkers]);

    useEffect(() => {
        return () => {
            const video = webcamRef.current?.video;
            video?.srcObject?.getTracks().forEach(track => track.stop());
        };
    }, []);

    if (!window.cv || !cv.Mat) {
        return <div>Loading OpenCV...</div>;
    }

    return (
        <div className={styles.cameraContainer}>
            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
                onUserMediaError={err => {
                    console.error("Camera error:", err);
                    alert("Unable to start camera. Check permissions.");
                    handleExit();
                }}
                playsInline
            />

            <div className={`${styles.viewfinder} ${hasFourMarkers ? styles.detected : ""}`}>
                <div className={styles["bottom-left"]}></div>
                <div className={styles["bottom-right"]}></div>
            </div>

            <div className={styles.hintMessage}>
                {qualityWarning ? (
                    <p className={styles.warningText}>
                        {qualityWarning}
                    </p>
                ) : (
                    <p className={styles.hintMessageText}>
                        Align the test card in the frame
                    </p>
                )}
            </div>
        </div>
    );
};

export default CameraCapture;