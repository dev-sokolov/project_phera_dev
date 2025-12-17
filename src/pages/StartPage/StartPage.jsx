import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import welcomeImage from "../../assets/images/welcomeImage.jpg";

import styles from "./StartPage.module.css";

const StartPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("reg_username");
    }, []);

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.img}>
                        <img src={welcomeImage} alt="Start page img" />
                    </div>
                    <div className={styles.textBlock}>
                        <h1 className={styles.heading}>Quick, private vaginal pH testing right from your phone.</h1>
                        <p className={styles.text}>Make sure you have your pHera test box and test strip ready. You’ll need them to scan your QR code and capture your result.</p>
                    </div>
                    <BottomBlock>
                        <Button onClick={() => navigate("/registration/username")}>Create account</Button>
                        <ButtonReverse onClick={() => navigate("/login")}>Log In</ButtonReverse>
                    </BottomBlock>
                </Container>
            </div>
        </>
    )
};

export default StartPage