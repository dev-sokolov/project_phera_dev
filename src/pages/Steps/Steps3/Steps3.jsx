import { useNavigate, Link } from "react-router-dom";

import Button from "../../../components/Button/Button";
import ButtonReverse from "../../../components/ButtonReverse/ButtonReverse";
import Container from "../../../components/Container/Container";
import step3 from "../../../assets/images/step3.jpg";

import styles from "./Steps3.module.css";

const Steps3 = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.crumbs}>
                            <Link to="/steps/1" className={styles.itemColored}></Link>
                            <Link to="/steps/2" className={styles.itemColored}></Link>
                            <Link to="/steps/3" className={styles.itemColored}></Link>
                            <Link to="/steps/4" className={styles.item}></Link>
                            <Link to="/steps/5" className={styles.item}></Link>
                        </div>
                        <div className={styles.img}><img src={step3} alt="step 3" /></div>
                        <div className={styles.textBlock}>
                            <div className={styles.step}>Step 3</div>
                            <h2 className={styles.heading}>Let the strip settle</h2>
                            <p className={styles.text}>Leave it for about a minute so the color can develop fully. When you’re ready, pHera will guide you to scan your strip.</p>
                        </div>
                        <div className={styles.bottomBlock}>
                            <Button onClick={() => navigate("/steps/4")}>Next</Button>
                            <ButtonReverse onClick={() => navigate("/steps/2")}>Go back</ButtonReverse>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default Steps3;