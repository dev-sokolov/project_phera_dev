import { useNavigate } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import homeQr from "../../assets/images/homeQr.jpg";
import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";
import styles from "./HomePageQr.module.css";

const HomePageQr = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.img}>
                            <ImageWrapper src={homeQr} alt="home page img" width={345} height={285} />
                        </div>
                        <div className={styles.textBlock}>
                            <p className={styles.welcome}>Welcome to pHera</p>
                            <h2 className={styles.heading}>Simple, guided, and private —
                                right from your phone.</h2>
                            <p className={styles.text}>Have your pHera test box and strip ready.
                                We’ll guide you step by step and scan
                                your result automatically.</p>
                        </div>
                    </div>

                </Container>
                <BottomBlock>
                    <div className={styles.bottomBlock}>
                        <div className={styles.btns}>
                            <Button onClick={() => navigate("/steps")}>Start test</Button>
                            <ButtonReverse onClick={() => navigate("/how-it-works")}>How it works</ButtonReverse>
                        </div>
                        <div className={styles.bottomText}>
                            <p>
                                We respect your privacy. Only you can save and see your results. 
                            </p>
                        </div>
                    </div>
                </BottomBlock>
            </div>
        </>
    )
};

export default HomePageQr