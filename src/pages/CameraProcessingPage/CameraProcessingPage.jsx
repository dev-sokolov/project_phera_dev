import Lottie from "lottie-react";
import loader from "../../assets/lottie/loader.json";
import Container from "../../components/Container/Container";

import styles from "./CameraProcessingPage.module.css";

const CameraProcessingPage = () => {

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.mainBlock}>
                            <Lottie className={styles.loading} animationData={loader} loop={true} />
                            <div className={styles.textBlock}>
                                <h1 className={styles.title}>Processing your test</h1>
                                <div className={styles.text}>Studies suggest that most vaginal pH changes are linked to everyday factors — not infections.</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default CameraProcessingPage;