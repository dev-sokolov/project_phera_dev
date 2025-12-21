import { useNavigate } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";
import trendPreview from "../../assets/images/trendPreview.jpg";

import styles from "./TrendPreviewPage.module.css";

const TrendPreviewPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.textBlock}>
                            <h1 className={styles.title}>Unlock your Trends & Insights report by testing again</h1>
                            <p className={styles.text}>Your microbiome changes in response to behaviors, hormones, treatments, and more. pHera Trends & Insights shows you how these changes are related and gets smarter over time: the more tests you take, the richer the insights.</p>
                        </div>
                        <div className={styles.img}>
                            <div className={styles.innerImg}>
                                <ImageWrapper src={trendPreview} alt="Trend-preview page img" width={257} height={367} />
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/steps")}>Start new scan</Button>
                </BottomBlock>
            </div>
        </>
    )
};

export default TrendPreviewPage;