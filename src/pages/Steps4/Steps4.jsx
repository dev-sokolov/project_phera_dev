import { useNavigate, Link } from "react-router-dom";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import Logo from "../../assets/Logo";
import step4 from "../../assets/images/step4.jpg";

import styles from "./Steps4.module.css";

const Steps4 = () => {
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
                            <Link to="/steps/1" className={styles.itemColored}></Link>
                            <Link to="/steps/2" className={styles.itemColored}></Link>
                            <Link to="/steps/3" className={styles.itemColored}></Link>
                            <Link to="/steps/4" className={styles.itemColored}></Link>
                            <Link to="/steps/5" className={styles.item}></Link>
                        </div>
                        <div className={styles.img}><img src={step4} alt="step 4" /></div>
                        <div className={styles.textBlock}>
                            <div className={styles.step}>Step 4</div>
                            <h2 className={styles.heading}>Scan your strip</h2>
                            <p className={styles.text}>Place the strip inside the on-screen frame and hold your phone steady.
                                Once the test area is in focus, the scan will happen automatically — no need to press anything.</p>
                        </div>
                        <div className={styles.bottomBlock}>
                            <div className={styles.btns}>
                                <Button onClick={() => navigate("/steps/5")}>Next</Button>
                                <ButtonReverse onClick={() => navigate("/steps/3")}>Go back</ButtonReverse>
                            </div>
                            <div className={styles.wrapLine}>
                                <div className={styles.line}></div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default Steps4;