import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Container from "../../components/Container/Container";

import loader from "../../assets/lottie/loader.json";
import styles from "./CameraProcessingPage.module.css";

const CameraProcessingPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const messages = [
        "Studies suggest that most vaginal pH changes are linked to everyday factors — not infections.",
        "Up to 80% of women experience temporary changes in vaginal pH at some point — often without any symptoms.",
        "Research shows that vaginal pH naturally shifts across the menstrual cycle, even when nothing feels different.",
        "More than half of vaginal pH imbalances don’t cause noticeable symptoms.",
        "Clinical research indicates that single pH readings are less informative than tracking changes over time.",
        "Tracking vaginal pH over time helps many women notice patterns before symptoms appear.",
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/result-without-details", { replace: true });
        }, 9000);
        return () => clearTimeout(timer);
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % messages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.mainBlock}>
                            <Lottie className={styles.loading} animationData={loader} loop={true} />
                            <div className={styles.textBlock}>
                                <h1 className={styles.title}>Processing your test</h1>
                                <div className={styles.textWrapper}>
                                    <p key={step} className={styles.text}>
                                        {messages[step]}
                                    </p>
                                </div>
                                {/* <p className={styles.text}>Studies suggest that most vaginal pH changes are linked to everyday factors — not infections.</p> */}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default CameraProcessingPage;