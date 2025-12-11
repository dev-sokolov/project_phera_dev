import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import signUp from "../../assets/images/signUp.jpg";
import Logo from "../../assets/Logo";
import ArrowLeft from "../../assets/icons/ArrowLeft";

import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("reg_username");
    }, []);

    return (
        <>
            <div className={styles.content}>
                <div className={styles.wrapLogo}>
                    <button
                        className={styles.arrowLeft}
                        onClick={() => {
                            if (window.history.length > 2) {
                                navigate(-1);
                            } else {
                                navigate("/");
                            }
                        }}
                        aria-label="Go back"
                    >
                        <ArrowLeft />
                    </button>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                </div>
                <Container>
                    <div className={styles.img}>
                        <img src={signUp} alt="Sing up page img" />
                    </div>
                    <div className={styles.textBlock}>
                        <h1 className={styles.heading}>Don’t lose your progress</h1>
                        <p className={styles.text}>Sign up to save your test history, track trends, and access personalized health recommendations.</p>
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

export default SignUpPage