import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import Container from "../../components/Container/Container";
import { addImage } from "../../shared/api/images-api";

import loader from "../../assets/lottie/loader.json";
import styles from "./CameraProcessingPage.module.css";

const CameraProcessingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(0);
    const [result, setResult] = useState(null);

    const messages = [
        "Studies suggest that most vaginal pH changes are linked to everyday factors — not infections.",
        "Up to 80% of women experience temporary changes in vaginal pH at some point — often without any symptoms.",
        "Research shows that vaginal pH naturally shifts across the menstrual cycle, even when nothing feels different.",
        "More than half of vaginal pH imbalances don't cause noticeable symptoms.",
        "Clinical research indicates that single pH readings are less informative than tracking changes over time.",
        "Tracking vaginal pH over time helps many women notice patterns before symptoms appear.",
    ];

    // send to backend
    useEffect(() => {
        const sendImage = async () => {
            try {
                const imageBlob = location.state?.imageBlob;

                if (!imageBlob) {
                    console.error("❌ Нет изображения для отправки");
                    navigate("/camera-capture");
                    return;
                }

                console.log("📤 Отправка изображения на бэкенд...");

                const formData = new FormData();
                formData.append('image', imageBlob, 'cropped-image.jpg');

                const data = await addImage(formData);

                console.log("✅ Ответ от бэкенда:", data);
                setResult(data);

            } catch (error) {
                console.error("❌ Ошибка отправки на бэкенд:", error);
                alert("Ошибка при отправке изображения на сервер.");
                navigate("/camera-capture");
            }
        };

        sendImage();
    }, [location, navigate]);

    useEffect(() => {
        if (!result) return;

        // time to show: 9 sec
        const timer = setTimeout(() => {
            navigate("/result-without-details", {
                state: { result },
                replace: true
            });
        }, 9000);

        return () => clearTimeout(timer);
    }, [result, navigate]);

    // change message every 3 sec
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % messages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <>
            <div className={styles.content}>
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
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default CameraProcessingPage;