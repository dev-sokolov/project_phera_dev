import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";

import ArrowDownGrey from "../../assets/icons/ArrowDownGrey";
import Logo from "../../assets/Logo";
import styles from "./ResultWithoutDetailsPage.module.css";

const ResultWithoutDetailsPage = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <div className={styles.wrapLogo}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                </div>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.title}>Your pH result</div>
                        <div className={styles.visualBlock}>
                            <div className={styles.actions}></div>
                            <div className={styles.num}>7.35</div>
                            <div className={styles.date}>12.06.25 | 8:23 PM</div>
                            <div className={styles.scale}>
                                <div className={styles.scalePart1}></div>
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
                            <div className={styles.recommendations}>
                                <div className={styles.wrapHeading}>
                                    <h3 className={styles.heading}>Recommendations</h3>
                                    <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`} onClick={() => setIsOpen(!isOpen)}>
                                        <ArrowDownGrey />
                                    </span>
                                </div>
                                <div className={`${styles.collapse} ${isOpen ? styles.open : ""}`}>
                                    <p className={styles.text}>Add your age group, hormone status, background, and current symptoms to get more tailored insights.</p>
                                </div>
                            </div>
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
                        <div className={styles.bottomBlock}>
                            <div className={styles.bottomBlockInner}>
                                <Button>Save to my history</Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default ResultWithoutDetailsPage;