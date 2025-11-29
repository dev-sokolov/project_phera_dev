import { useNavigate, Link } from "react-router-dom";

import Button from "../../../components/Button/Button";
import ButtonReverse from "../../../components/ButtonReverse/ButtonReverse";
import Container from "../../../components/Container/Container";
import Logo from "../../../assets/Logo";
import step1 from "../../../assets/images/step1.jpg";

import styles from "./Steps1.module.css";

const Steps1 = () => {
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
                            <Link to="/steps/2" className={styles.item}></Link>
                            <Link to="/steps/3" className={styles.item}></Link>
                            <Link to="/steps/4" className={styles.item}></Link>
                            <Link to="/steps/5" className={styles.item}></Link>
                        </div>
                        <div className={styles.img}><img src={step1} alt="step 1" /></div>
                        <div className={styles.textBlock}>
                            <div className={styles.step}>Step 1</div>
                            <h2 className={styles.heading}>Open your test strip</h2>
                            <p className={styles.text}>Open your pHera box, take one strip, and remove the foil right before testing. Hold it by the white handle only, to keep the test area clean and dry.</p>
                        </div>
                        <div className={styles.bottomBlock}>
                            <div className={styles.btns}>
                                <Button onClick={() => navigate("/steps/2")}>Next</Button>
                                <ButtonReverse onClick={() => navigate("/steps")}>Go back</ButtonReverse>
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

export default Steps1;