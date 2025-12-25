import { useNavigate } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";

import CameraAccessImg from "../../assets/CameraAccessImg";
import styles from "./CameraAccess.module.css";

const CameraAccess = () => {
    const navigate = useNavigate();

    const goBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.mainBlock}>
                            <div className={styles.icon}><CameraAccessImg /></div>
                            <div className={styles.textBlock}>
                                <h1 className={styles.title}>Allow Camera <br /> to scan your strip</h1>
                                <div className={styles.text}>We’ll use your camera for a moment to read the color on your test strip. The scan is done automatically and stays private.</div>
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <div className={styles.bottomBlock}>
                        <p className={styles.bottomText}>Your privacy is protected at every step.</p>
                        <div className={styles.btns}>
                            <Button onClick={() => navigate("/camera-capture")}>Allow camera</Button>
                            <ButtonReverse onClick={() => navigate("/steps", { replace: true })}>Go back</ButtonReverse>
                        </div>
                    </div>
                </BottomBlock>
            </div>
        </>
    )
};

export default CameraAccess;