import { useNavigate, Link } from "react-router-dom";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";

import styles from "./Steps.module.css";

const Steps = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.textBlock}>
                            <h2 className={styles.heading}>Let’s walk through your pH test step by step</h2>
                            <p className={styles.text}>We’ll walk you through each step so you can feel confident. Take your time, and make sure your hands are clean and dry.</p>
                        </div>
                        <Link to="/camera-access" className={styles.skip}>Skip guidance</Link>
                        <div className={styles.bottomBlock}>
                            <Button onClick={() => navigate("/steps/1")}>Next</Button>
                            <ButtonReverse onClick={() => navigate("/")}>Go back</ButtonReverse>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default Steps;