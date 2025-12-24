import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";

import styles from "./CountdownPage.module.css";

const CountdownPage = () => {
    const navigate = useNavigate();

    const TOTAL_TIME = 10;
    const [seconds, setSeconds] = useState(TOTAL_TIME);
    const [active, setActive] = useState(false); 
    const [finished, setFinished] = useState(false); 

    // spinner
    const radius = 110;
    const circumference = 2 * Math.PI * radius;
    const progress = ((TOTAL_TIME - seconds) / TOTAL_TIME) * circumference;

    const formatTime = (sec) => {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    useEffect(() => {
        if (!active) return; 
        if (seconds <= 0) return;

        const timer = setInterval(() => {
            setSeconds(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [active, seconds]);

    useEffect(() => {
        if (active && seconds === 0) {
            setFinished(true);
        }
    }, [active, seconds]);

    const startTimer = () => {
        setActive(true);
        setFinished(false);
        setSeconds(TOTAL_TIME);
    };

    const onNext = () => {
        if (finished) {
            navigate("/camera-access");
        }
    };

    return (
        <div className={styles.content}>
            <Container>
                <div className={styles.containerInner}>

                    <div className={styles.textBlock}>
                        <p className={styles.text}>
                            The test strip needs about two minutes for the color to fully develop.
                            This waiting time is required for an accurate reading.
                        </p>
                    </div>

                    <div className={styles.centerWrapper}>
                        <div className={styles.timerWrapper}>
                            <svg className={styles.timerSvg} width="260" height="260">
                                <circle
                                    className={styles.circleBg}
                                    cx="130"
                                    cy="130"
                                    r={radius}
                                    strokeWidth="12"
                                />

                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#6F988F" />
                                        <stop offset="100%" stopColor="#3A6F64" />
                                    </linearGradient>
                                </defs>

                                <circle
                                    className={styles.circle}
                                    cx="130"
                                    cy="130"
                                    r={radius}
                                    strokeWidth="12"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference - progress}
                                />
                            </svg>

                            <div className={styles.timerText}>
                                {formatTime(seconds)}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <BottomBlock>

                {!active ? (
                    <Button onClick={startTimer}>
                        Start Timer
                    </Button>
                ) : (
                    <Button disabled={!finished} onClick={onNext}>
                        Next
                    </Button>
                )}

                <ButtonReverse onClick={() => navigate("/steps/5")}>
                    Go back
                </ButtonReverse>
            </BottomBlock>
        </div>
    );
};

export default CountdownPage;