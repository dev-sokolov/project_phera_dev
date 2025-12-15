import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import signUp from "../../assets/images/signUp.jpg";

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
                        <img src={signUp} alt="Start page img" />
                    </div>
                    <div className={styles.textBlock}>
                        <h1 className={styles.heading}>Quick, private vaginal pH testing right from your phone.</h1>
                        <p className={styles.text}>Make sure you have your pHera test box and test strip ready. You’ll need them to scan your QR code and capture your result.</p>
                    </div>
                    <div className={styles.bottomBlock}>
                        <div className={styles.btns}>
                            <Button onClick={() => navigate("/registration/username")}>Create account</Button>
                            <ButtonReverse onClick={() => navigate("/login")}>Log In</ButtonReverse>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default StartPage