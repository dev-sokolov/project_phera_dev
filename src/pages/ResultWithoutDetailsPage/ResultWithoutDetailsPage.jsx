import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import CameraCapture from "../CameraCapture/CameraCapture";

import Logo from "../../assets/Logo";
import CameraAccessImg from "../../assets/CameraAccessImg";
import styles from "./ResultWithoutDetailsPage.module.css";

const ResultWithoutDetailsPage = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const navigate = useNavigate();

    const handleCapture = (result) => {
        navigate("/result", { state: result });
        setIsCameraOn(false);
    };

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
                        <div className={styles.title}>Your pH result</div>
                        <div className={styles.visualBlock}>
                            <div className={styles.actions}></div>
                            <div className={styles.num}>7.35</div>
                            <div className={styles.date}></div>
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
                                <h3 className={styles.heading}>Recommendations</h3>
                                <div className={styles.wrapText}>
                                    <div className={styles.text}>
                                        <div className={styles.point}></div>
                                        <p className={styles.innerText}>
                                            Keep following your usual routine — no changes are needed based on this result.
                                        </p>
                                    </div>
                                    <div className={styles.text}>
                                        <div className={styles.point}></div>
                                        <p className={styles.innerText}>
                                            If you notice new symptoms (odor, itching, unusual discharge), you can retest or talk to a clinician.
                                        </p>
                                    </div>
                                    {/* <p className={styles.text}>If you notice new symptoms (odor, itching, unusual discharge), you can retest or talk to a clinician.</p> */}
                                </div>
                            </div>
                            <div className={styles.advice}>
                                <h3 className={styles.heading}>Make this result more personal</h3>
                                <p className={styles.innerText}>Want to understand why your pH looks like this? Add your age group, hormone status, background, and current symptoms to get more tailored insights.</p>
                                <Button>Add my details</Button>
                            </div>
                        </div>
                        {/* <div className={styles.bottomBlock}> */}
                        <div className={styles.btn}>
                            <Button>Save to my history</Button>
                        </div>
                        <div className={styles.wrapLine}>
                            <div className={styles.line}></div>
                        </div>
                        {/* </div> */}
                    </div>
                </Container>
            </div>
        </>
    )
};

export default ResultWithoutDetailsPage;