import { useNavigate } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import onboardingStep1 from "../../assets/images/onboardingStep1.jpg"
import onboardingStep2 from "../../assets/images/onboardingStep2.jpg"
import onboardingStep3 from "../../assets/images/onboardingStep3.jpg"
import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";

import styles from "./HowItWorksPage.module.css";

const HowItWorksPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.wrapper}>
                        <h1 className={styles.title}>How pHera testing works</h1>
                        <div className={styles.steps}>
                            <div className={styles.step}>
                                <div className={styles.img}>
                                    <ImageWrapper src={onboardingStep1} alt="step 1" width={345} height={200} />
                                </div>
                                <h2 className={styles.heading}>Scan your kit</h2>
                                <p className={styles.text}>
                                    Scan the QR code on your pHera box to start the test. This helps us identify your kit and guide you through the process.
                                </p>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.img}>
                                    <ImageWrapper src={onboardingStep2} alt="step 2" width={345} height={200} />
                                </div>
                                <h2 className={styles.heading}>Allow camera access</h2>
                                <p className={styles.text}>
                                    Give pHera one-time access to your camera so we can read the color on your test strip. Nothing is stored or recorded.
                                </p>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.img}>
                                    <ImageWrapper src={onboardingStep3} alt="step 3" width={345} height={200} />
                                </div>
                                <h2 className={styles.heading}>Get your result</h2>
                                <p className={styles.text}>
                                    After you scan your strip, we’ll process the color and show your pH result within seconds — along with a clear explanation.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/steps")}>Start test</Button>
                    <ButtonReverse onClick={() => navigate("/")}>Go back</ButtonReverse>
                </BottomBlock>
            </div>
        </>
    )
};

export default HowItWorksPage