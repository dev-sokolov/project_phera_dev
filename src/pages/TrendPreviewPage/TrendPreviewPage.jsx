import { useNavigate } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";
import trendPreview from "../../assets/images/trendPreview.jpg";

import styles from "./TrendPreviewPage.module.css";

const TrendPreviewPage = () => {
    const navigate = useNavigate();

    const data = true;
    // const data = false;

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        {data ? (
                            <div className={styles.wrapper}>
                                <h1 className={styles.title}>Short trends preview</h1>
                                <div className={styles.dataBlock}>
                                    <div className={styles.wrapSelect}>
                                        <div className={styles.titleInfo}>Select a past test to compare your results</div>
                                        <div className={styles.wrapDate}>
                                            <div className={styles.selectDate}></div>
                                            <div className={styles.date}></div>
                                        </div>
                                    </div>
                                    <div className={styles.wrapScale}>
                                        <div className={styles.wrapHeading}>
                                            <div className={`${styles.dot} ${styles['dot--blue']}`}></div>
                                            <div className={styles.heading}>Your pH</div>
                                        </div>
                                        <div className={styles.scaleBlock}>
                                            <div className={styles.scaleItem}>
                                                <div className={styles.scale}>
                                                    <div className={styles.scalePart1}></div>
                                                    <div className={styles.scalePart2}></div>
                                                    <div className={styles.scalePart3}></div>
                                                    <div className={styles.scalePart4}></div>
                                                    <div className={styles.scalePart5}></div>
                                                </div>
                                                <div className={styles.num}>7.1</div>
                                            </div>
                                            <div className={styles.scaleItem}>
                                                <div className={styles.scale}>
                                                    <div className={styles.scalePart1}></div>
                                                    <div className={styles.scalePart2}></div>
                                                    <div className={styles.scalePart3}></div>
                                                    <div className={styles.scalePart4}></div>
                                                    <div className={styles.scalePart5}></div>
                                                </div>
                                                <div className={styles.num}>4.3</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.wrapDetails}>
                                        <div className={styles.wrapHeading}>
                                            <div className={`${styles.dot} ${styles['dot--green']}`}></div>
                                            <div className={styles.heading}>Your details</div>
                                        </div>
                                        <div className={styles.details}>
                                            <ul className={styles.list}>
                                                <li className={styles.item}>Sticky</li>
                                                <li className={styles.item}>Itchy</li>
                                                <li className={styles.item}>Sour</li>
                                                <li className={styles.item}>No discharge</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={styles.wrapParagraf}>
                                        <p className={styles.paragraf}>Compared to your previous test, your vaginal pH has shifted.</p>
                                        <p className={styles.paragraf}>This change suggests a variation in your vaginal environment between these two points in time. Differences like this can be associated with factors such as cycle phase, hormonal changes, recent sexual activity, or vaginal products.</p>
                                        <p className={styles.paragraf}>At this stage, the comparison indicates a change — not a diagnosis. Tracking additional results helps clarify whether this shift is temporary or recurring.</p>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <>
                                <div className={styles.textBlock}>
                                    <h1 className={styles.title}>Unlock your Trends & Insights report by testing again</h1>
                                    <p className={styles.text}>Your microbiome changes in response to behaviors, hormones, treatments, and more. pHera Trends & Insights shows you how these changes are related and gets smarter over time: the more tests you take, the richer the insights.</p>
                                </div>
                                <div className={styles.img}>
                                    <div className={styles.innerImg}>
                                        <ImageWrapper src={trendPreview} alt="Trend-preview page img" width={257} height={367} />
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate(data ? "/subscription" : "/steps")}>{data ? "Unlock my trends" : "Start new scan"}</Button>
                </BottomBlock>
            </div>
        </>
    )
};

export default TrendPreviewPage;