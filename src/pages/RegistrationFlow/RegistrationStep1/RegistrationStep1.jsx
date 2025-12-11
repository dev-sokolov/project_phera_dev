import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button/Button";
import ButtonReverse from "../../../components/ButtonReverse/ButtonReverse";
import Container from "../../../components/Container/Container";
import Logo from "../../../assets/Logo";
import step4 from "../../../assets/images/step4.jpg";

import styles from "./RegistrationStep1.module.css";

const RegistrationStep1 = () => {
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
                    <div className={styles.containerInner}>
                        <div className={styles.crumbs}>
                            <div className={styles.itemColored}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                        </div>
                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Welcome! Create your pHera account</h1>
                            <p className={styles.text}>Enter your number to receive a one-time code and securely save your results.</p>
                        </div>
                        <div className={styles.bottomBlock}>
                            <Button onClick={() => navigate("/signup")}>Send verification code</Button>
                            <ButtonReverse onClick={() => navigate("/signup")}>Go back</ButtonReverse>
                            <p className={styles.bottomBlockText}>Already have an account? <span>LOG IN</span> </p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default RegistrationStep1;