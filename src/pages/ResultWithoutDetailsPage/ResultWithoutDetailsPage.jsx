import { useNavigate } from "react-router-dom";
import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import CheckIcon from "../../assets/icons/CheckIcon";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import ShareIcon from "../../assets/icons/ShareIcon";
import ScaleMarker from "../../assets/icons/ScaleMarker";

import styles from "./ResultWithoutDetailsPage.module.css";

const ResultWithoutDetailsPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.title}>Your pH result</div>
                        <div className={styles.visualBlock}>
                            <div className={styles.visualBlockTop}>
                                <div className={styles.levelPh}>
                                    <CheckIcon />
                                    <p className={styles.levelPhText}>Normal pH</p>
                                </div>
                                <div className={styles.actions}>
                                    <div className={styles.actionsInner}><DownloadIcon /></div>
                                    <div className={styles.actionsInner}><ShareIcon /></div>
                                </div>
                            </div>
                            <div className={styles.num}>7.35</div>
                            <div className={styles.date}>12.06.25 | 8:23 PM</div>
                            <div className={styles.scale}>
                                <div className={styles.scalePart1}><ScaleMarker className={styles.scaleMarker}/></div>
                                <div className={styles.scalePart2}></div>
                                <div className={styles.scalePart3}></div>
                                <div className={styles.scalePart4}></div>
                                <div className={styles.scalePart5}></div>
                            </div>
                            <div className={styles.meaning}>
                                <p>Low</p>
                                <p>Normal</p>
                                <p>Elevated</p>
                            </div>
                        </div>
                        <div className={styles.textBlock}>
                            <p className={styles.textResult}>This result suggests that your vaginal environment is in its usual balance. Your pH can still shift slightly with your cycle, sex, or products you use, but nothing in this reading looks concerning on its own.</p>

                            <div className={styles.advice}>
                                <h3 className={styles.heading}>Make this result more personal</h3>
                                <p className={styles.text}>Want to understand why your pH looks like this? Add your age group, hormone status, background, and current symptoms to get more tailored insights.</p>
                                <div className={styles.btnTop}>
                                    <Button onClick={() => navigate("/add-details")}>Add my details</Button>
                                </div>
                                <p className={styles.info}>
                                    Your data stays private and is never shared without your consent
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/signup")}>Save to my history</Button>
                </BottomBlock>
            </div>
        </>
    )
};

export default ResultWithoutDetailsPage;