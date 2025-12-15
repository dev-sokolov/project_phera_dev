import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Container from "../../components/Container/Container";

import loader from "../../assets/lottie/loader.json";
import styles from "./CameraProcessingPage.module.css";

const CameraProcessingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/result-without-details");
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <>
            <div className={styles.content}>
                <Container fullWidth>
                    <div className={styles.containerInner}>
                        <div className={styles.wrapTextBlock}>
                            <div className={styles.textBlock}>
                                <div className={styles.wrapLoading}>
                                    <Lottie className={styles.loading} animationData={loader} loop={true} />
                                </div>
                                <h2 className={styles.heading}>Processing Your Test</h2>
                                <p className={styles.text}>This usually takes less than a minute.Please keep this screen open — your result will appear automatically.</p>
                            </div>
                        </div>

                        <div className={styles.bottomBlock}>
                            <div className={styles.wrapLine}>
                                <div className={styles.line}></div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default CameraProcessingPage;