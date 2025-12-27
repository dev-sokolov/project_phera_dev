import { useEffect, useRef, useState } from "react";

export function useArucoDetection(videoRef, expectedMarkerIds = [0, 1, 2, 3], onDetect) {
    const [detectedMarkers, setDetectedMarkers] = useState([]);
    const detectorRef = useRef(null);
    const canvasRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        let mounted = true;

        // Ждём, пока window.AR станет доступен
        const waitForAR = () => {
            if (window.AR) {
                detectorRef.current = new window.AR.Detector();
                rafRef.current = requestAnimationFrame(processFrame);
            } else {
                setTimeout(waitForAR, 100);
            }
        };

        const processFrame = () => {
            if (!mounted) return;

            // берем видео элемент
            const video = videoRef.current?.video || videoRef.current;
            if (!video || video.readyState < 2) {
                rafRef.current = requestAnimationFrame(processFrame);
                return;
            }

            let canvas = canvasRef.current;
            if (!canvas) {
                canvas = document.createElement("canvas");
                canvasRef.current = canvas;
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // теперь точно HTMLVideoElement

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const markers = detectorRef.current.detect(imageData);

            const filteredMarkers = markers.filter(m => expectedMarkerIds.includes(m.id));
            setDetectedMarkers(filteredMarkers);
            if (onDetect) onDetect(filteredMarkers);

            rafRef.current = requestAnimationFrame(processFrame);
        };

        waitForAR();

        return () => {
            mounted = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [videoRef, expectedMarkerIds, onDetect]);

    return detectedMarkers;
}
