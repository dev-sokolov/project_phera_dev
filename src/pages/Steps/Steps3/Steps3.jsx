import { useNavigate, Link } from "react-router-dom";

import BottomBlock from "../../../components/BottomBlock/BottomBlock";
import Button from "../../../components/Button/Button";
import ButtonReverse from "../../../components/ButtonReverse/ButtonReverse";
import Container from "../../../components/Container/Container";
import ImageWrapper from "../../../components/ImageWrapper/ImageWrapper";
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
                        <ImageWrapper src={step3} alt="step 3" ratio="345/218" />
                        <div className={styles.textBlock}>
                            <div className={styles.step}>Step 3</div>
                            <h2 className={styles.heading}>Let the strip settle</h2>
                            <p className={styles.text}>Place the test strip on a clean, dry surface. We’ll start a 2-minute timer to allow the color to fully develop before scanning.</p>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/steps/4")}>Next</Button>
                    <ButtonReverse onClick={() => navigate("/steps/2")}>Go back</ButtonReverse>
                </BottomBlock>
            </div>
        </>
    )
};

export default Steps3;