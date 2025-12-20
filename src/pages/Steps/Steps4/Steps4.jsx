import { useNavigate, Link } from "react-router-dom";

import BottomBlock from "../../../components/BottomBlock/BottomBlock";
import Button from "../../../components/Button/Button";
import ButtonReverse from "../../../components/ButtonReverse/ButtonReverse";
import Container from "../../../components/Container/Container";
import ImageWrapper from "../../../components/ImageWrapper/ImageWrapper";
import step4 from "../../../assets/images/step4.jpg";

import styles from "./Steps4.module.css";

const Steps4 = () => {
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
                            <Link to="/steps/5" className={styles.item}></Link>
                        </div>
                        <ImageWrapper src={step4} alt="step 4" width={345} height={218} />
                        <div className={styles.textBlock}>
                            <div className={styles.step}>Step 4</div>
                            <h2 className={styles.heading}>Scan your strip</h2>
                            <div className={styles.wrapText}>
                                <p className={styles.text}>Place the strip inside the on-screen frame and hold your phone steady.</p>
                                <p className={styles.text}>Use good lighting so the test area is clearly visible. The scan will happen automatically once it’s in focus.</p>
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/steps/5")}>Next</Button>
                    <ButtonReverse onClick={() => navigate("/steps/3")}>Go back</ButtonReverse>
                </BottomBlock>
            </div>
        </>
    )
};

export default Steps4;