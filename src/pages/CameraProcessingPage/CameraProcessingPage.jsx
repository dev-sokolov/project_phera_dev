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
        }, 300000);
        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <>
            <div className={styles.content}>
                <Container fullWidth>
                    <div className={styles.containerInner}>
                        <div className={styles.wrapper}>
                            <div className={styles.wrappInner}>
                                <div className={styles.wrapLoading}>
                                    <Lottie className={styles.loading} animationData={loader} loop={true} />
                                </div>
                                <div className={styles.textBlock}>
                                    <h2 className={styles.heading}>Processing your test</h2>
                                    <p className={styles.text}>Studies suggest that most vaginal pH changes are linked to everyday factors — not infections.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default CameraProcessingPage;