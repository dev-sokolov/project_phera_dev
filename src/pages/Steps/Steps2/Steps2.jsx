import { useNavigate, Link } from "react-router-dom";

import BottomBlock from "../../../components/BottomBlock/BottomBlock";
import Button from "../../../components/Button/Button";
import ButtonReverse from "../../../components/ButtonReverse/ButtonReverse";
import Container from "../../../components/Container/Container";
import ImageWrapper from "../../../components/ImageWrapper/ImageWrapper";
import step2 from "../../../assets/images/step2.jpg";

import styles from "./Steps2.module.css";

const Steps2 = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.crumbs}>
                            <Link to="/steps/1" className={styles.itemColored}></Link>
                            <Link to="/steps/2" className={styles.itemColored}></Link>
                            <Link to="/steps/3" className={styles.item}></Link>
                            <Link to="/steps/4" className={styles.item}></Link>
                            <Link to="/steps/5" className={styles.item}></Link>
                        </div>
                        <ImageWrapper src={step2} alt="step 2" width={345} height={218} />
                        <div className={styles.textBlock}>
                            <div className={styles.step}>Step 2</div>
                            <h2 className={styles.heading}>Collect your sample</h2>
                            <p className={styles.text}>Gently place the strip just inside the vaginal opening for about 2–3 seconds. Then remove it and place it on a clean, dry surface.</p>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/steps/3")}>Next</Button>
                    <ButtonReverse onClick={() => navigate("/steps/1")}>Go back</ButtonReverse>
                </BottomBlock>
            </div>
        </>
    )
};

export default Steps2;