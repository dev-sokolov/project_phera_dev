import { useNavigate } from "react-router-dom";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import homeQr from "../../assets/images/homeQr.webp";
import Logo from "../../assets/Logo";

import styles from "./HomePageQr.module.css";

const HomePageQr = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content}>
                <div className={styles.wrapLogo}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                </div>
                <Container>
                    <div className={styles.img}>
                        <img src={homeQr} alt="home page img" />
                    </div>
                    <div className={styles.textBlock}>
                        <p className={styles.welcome}>Welcome to pHera</p>
                        <h2 className={styles.heading}>Simple, guided, and private —
                            right from your phone.</h2>
                        <p className={styles.text}>Have your pHera test box and strip ready.
                            We’ll guide you step by step and scan
                            your result automatically.</p>
                    </div>
                    <div className={styles.bottomBlock}>
                        <div className={styles.btns}>
                            <Button>Start test</Button>
                            <ButtonReverse onClick={() => navigate("/steps")}>How it works</ButtonReverse>
                        </div>
                        <div className={styles.bottomText}>
                            <p>
                                We respect your privacy — your results stay secure and visible only to you.
                            </p>
                        </div>
                        <div className={styles.wrapLine}>
                            <div className={styles.line}></div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default HomePageQr