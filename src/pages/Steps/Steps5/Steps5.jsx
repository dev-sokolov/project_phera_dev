import { useNavigate, Link } from "react-router-dom";

import BottomBlock from "../../../components/BottomBlock/BottomBlock";
import Button from "../../../components/Button/Button";
import ButtonReverse from "../../../components/ButtonReverse/ButtonReverse";
import Container from "../../../components/Container/Container";
import step5 from "../../../assets/images/step5.jpg";
import ImageWrapper from "../../../components/ImageWrapper/ImageWrapper";

import styles from "./Steps5.module.css";

const Steps5 = () => {
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
                            <Link to="/steps/4" className={styles.itemColored}></Link>
                            <Link to="/steps/5" className={styles.itemColored}></Link>
                        </div>
                        {/* <div className={styles.img}><img src={step5} alt="step 5" /></div> */}
                        <div className={styles.img}><ImageWrapper src={step5} alt="step 5" ratio="4/3" /></div>
                        <div className={styles.textBlock}>
                            <div className={styles.step}>Step 5</div>
                            <h2 className={styles.heading}>See your result</h2>
                            <p className={styles.text}>Your pH result will appear within seconds, along with a clear explanation of what it means for you. Remember, this is an indicator of balance, not a diagnosis — we’ll guide you through the next steps.</p>

                            <p className={styles.textItalic}>Next, we’ll take you to a quick scan of your test strip.</p>
                        </div>
                        {/* <BottomBlock>
                            <Button onClick={() => navigate("/camera-access")}>Next</Button>
                            <ButtonReverse onClick={() => navigate("/steps/4")}>Go back</ButtonReverse>
                        </BottomBlock> */}
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/camera-access")}>Next</Button>
                    <ButtonReverse onClick={() => navigate("/steps/4")}>Go back</ButtonReverse>
                </BottomBlock>
            </div>
        </>
    )
};

export default Steps5;