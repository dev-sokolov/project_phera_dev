import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import welcomeImage from "../../assets/images/welcomeImage.jpg";
import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";

import styles from "./SignUpPage.module.css";

const SignUpPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("reg_username");
    }, []);

    const goBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.img}>
                            <ImageWrapper src={welcomeImage} alt="Sing up page image" width={345} height={285} />
                        </div>
                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Don’t lose your progress</h1>
                            <p className={styles.text}>Sign up to save your test history, track trends, and access personalized health recommendations.</p>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/registration/username", { state: { from: location.pathname } })}>Create account</Button>
                    <ButtonReverse onClick={() => navigate("/login")}>Log In</ButtonReverse>
                </BottomBlock>
            </div>
        </>
    )
};

export default SignUpPage