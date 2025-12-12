import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import CameraCapture from "../CameraCapture/CameraCapture";

import Logo from "../../assets/Logo";
import CameraAccessImg from "../../assets/CameraAccessImg";
import styles from "./CameraAccess.module.css";

const CameraAccess = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const navigate = useNavigate();

    const handleCapture = (result) => {
        navigate("/result", { state: result });
        setIsCameraOn(false);
    };

    const goBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <>
            {!isCameraOn ? (
                <div className={styles.content}>
                    <div className={styles.wrapLogo}>
                        <div className={styles.logo}>
                            <Logo />
                        </div>
                    </div>
                    <Container fullWidth>
                        <div className={styles.containerInner}>
                            <div className={styles.wrapImg}>
                                <div className={styles.innerImg}>
                                    <div className={styles.img}>
                                        <CameraAccessImg />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.textBlock}>
                                <h2 className={styles.heading}>Allow Camera <br /> To Scan Your Strip</h2>
                                <p className={styles.text}>We’ll use your camera for a moment to read the color on your test strip. The scan is done automatically and stays private.</p>
                            </div>
                            <div className={styles.bottomBlock}>
                                <p className={styles.bottomText}>Your privacy is protected at every step.</p>
                                <div className={styles.btns}>
                                    <Button onClick={() => navigate("/camera-capture")}>Allow camera</Button>
                                    <ButtonReverse onClick={goBack}>Go back</ButtonReverse>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            ) : (
                <CameraCapture onCapture={handleCapture} onExit={() => setIsCameraOn(false)} />
            )}

        </>
    )
};

export default CameraAccess;