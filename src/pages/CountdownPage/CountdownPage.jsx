// import { useNavigate } from "react-router-dom";

// import BottomBlock from "../../components/BottomBlock/BottomBlock";
// import Button from "../../components/Button/Button";
// import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
// import Container from "../../components/Container/Container";

// import styles from "./Countdown.module.css";

// const Countdown = () => {
//     const navigate = useNavigate();

//     return (
//         <>
//             <div className={styles.content}>
//                 <Container>
//                     <div className={styles.containerInner}>
//                         <div className={styles.textBlock}>
//                             <p className={styles.text}>The test strip needs about two minutes for the color to fully develop. This waiting time is required for an accurate reading.</p>
//                         </div>
//                         <div className={styles.img}></div>

//                     </div>
//                 </Container>
//                 <BottomBlock>
//                     {/* <Button onClick={() => navigate("/camera-access")}>Start timer</Button> */}
//                     <Button >Start timer</Button>
//                     <ButtonReverse onClick={() => navigate("/steps/5")}>Go back</ButtonReverse>
//                 </BottomBlock>
//             </div>
//         </>
//     )
// };

// export default Countdown;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import BottomBlock from "../../components/BottomBlock/BottomBlock";
// import Button from "../../components/Button/Button";
// import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
// import Container from "../../components/Container/Container";

// import styles from "./Countdown.module.css";

// const Countdown = () => {
//     const navigate = useNavigate();
//     const [seconds, setSeconds] = useState(10);
//     const [active, setActive] = useState(false);

//     useEffect(() => {
//         let timer;

//         if (active && seconds > 0) {
//             timer = setInterval(() => {
//                 setSeconds(prev => prev - 1);
//             }, 1000);
//         }

//         if (seconds === 0) {
//             navigate("/camera-access");
//         }

//         return () => clearInterval(timer);
//     }, [active, seconds, navigate]);

//     return (
//         <div className={styles.content}>
//             <Container>
//                 <div className={styles.containerInner}>
//                     <div className={styles.textBlock}>
//                         <p className={styles.text}>
//                             The test strip needs about two minutes for the color to fully develop.
//                             This waiting time is required for an accurate reading.
//                         </p>
//                     </div>

//                     <div className={styles.timerWrapper}>
//                         {active ? (
//                             <p className={styles.timer}>{seconds}s</p>
//                         ) : (
//                             <p className={styles.timer}>10s</p>
//                         )}
//                     </div>
//                 </div>
//             </Container>

//             <BottomBlock>
//                 <Button onClick={() => setActive(true)}>Start timer</Button>
//                 <ButtonReverse onClick={() => navigate("/steps/5")}>
//                     Go back
//                 </ButtonReverse>
//             </BottomBlock>
//         </div>
//     );
// };

// export default Countdown;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import BottomBlock from "../../components/BottomBlock/BottomBlock";
// import Button from "../../components/Button/Button";
// import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
// import Container from "../../components/Container/Container";

// import styles from "./CountdownPage.module.css";

// const CountdownPage = () => {
//     const navigate = useNavigate();

//     const TOTAL_TIME = 10; // seconds
//     const [seconds, setSeconds] = useState(TOTAL_TIME);
//     const [active, setActive] = useState(false);

//     // SVG circle settings
//     const radius = 60;
//     const circumference = 2 * Math.PI * radius;
//     const progress = ((TOTAL_TIME - seconds) / TOTAL_TIME) * circumference;

//     useEffect(() => {
//         let timer;

//         if (active && seconds > 0) {
//             timer = setInterval(() => {
//                 setSeconds(prev => prev - 1);
//             }, 1000);
//         }

//         if (seconds === 0) {
//             setTimeout(() => navigate("/camera-access"), 300);
//         }

//         return () => clearInterval(timer);
//     }, [active, seconds, navigate]);

//     return (
//         <div className={styles.content}>
//             <Container>
//                 <div className={styles.containerInner}>

//                     <div className={styles.textBlock}>
//                         <p className={styles.text}>
//                             The test strip needs about two minutes for the color to fully develop.
//                             This waiting time is required for an accurate reading.
//                         </p>
//                     </div>

//                     <div className={styles.timerWrapper}>
//                         <svg className={styles.timerSvg} width="160" height="160">
//                             <circle
//                                 className={styles.circleBg}
//                                 cx="80"
//                                 cy="80"
//                                 r={radius}
//                                 strokeWidth="10"
//                             />
//                             <circle
//                                 className={styles.circle}
//                                 cx="80"
//                                 cy="80"
//                                 r={radius}
//                                 strokeWidth="10"
//                                 strokeDasharray={circumference}
//                                 strokeDashoffset={circumference - progress}
//                             />
//                         </svg>

//                         <div className={styles.timerText}>
//                             {seconds}s
//                         </div>
//                     </div>
//                 </div>
//             </Container>

//             <BottomBlock>
//                 <Button onClick={() => setActive(true)}>Start timer</Button>
//                 <ButtonReverse onClick={() => navigate("/steps/5")}>Go back</ButtonReverse>
//             </BottomBlock>
//         </div>
//     );
// };

// export default CountdownPage;

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import BottomBlock from "../../components/BottomBlock/BottomBlock";
// import Button from "../../components/Button/Button";
// import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
// import Container from "../../components/Container/Container";

// import styles from "./CountdownPage.module.css";

// const CountdownPage = () => {
//     const navigate = useNavigate();

//     const TOTAL_TIME = 10; // seconds
//     const [seconds, setSeconds] = useState(TOTAL_TIME);
//     const [active, setActive] = useState(false);

//     // SVG circle settings (увеличенный радиус)
//     const radius = 80; 
//     const circumference = 2 * Math.PI * radius;
//     const progress = ((TOTAL_TIME - seconds) / TOTAL_TIME) * circumference;

//     const formatTime = (sec) => `0:${sec < 10 ? "0" + sec : sec}`;

//     useEffect(() => {
//         let timer;

//         if (active && seconds > 0) {
//             timer = setInterval(() => {
//                 setSeconds(prev => prev - 1);
//             }, 1000);
//         }

//         if (seconds === 0) {
//             setTimeout(() => navigate("/camera-access"), 300);
//         }

//         return () => clearInterval(timer);
//     }, [active, seconds, navigate]);

//     return (
//         <div className={styles.content}>
//             <Container>
//                 <div className={styles.containerInner}>

//                     <div className={styles.textBlock}>
//                         <p className={styles.text}>
//                             The test strip needs about two minutes for the color to fully develop.
//                             This waiting time is required for an accurate reading.
//                         </p>
//                     </div>

//                     {/* Центрированный таймер */}
//                     <div className={styles.centerWrapper}>
//                         <div className={styles.timerWrapper}>
//                             <svg className={styles.timerSvg} width="200" height="200">
//                                 <circle
//                                     className={styles.circleBg}
//                                     cx="100"
//                                     cy="100"
//                                     r={radius}
//                                     strokeWidth="10"
//                                 />
//                                 <circle
//                                     className={styles.circle}
//                                     cx="100"
//                                     cy="100"
//                                     r={radius}
//                                     strokeWidth="10"
//                                     strokeDasharray={circumference}
//                                     strokeDashoffset={circumference - progress}
//                                 />
//                             </svg>

//                             <div className={styles.timerText}>
//                                 {formatTime(seconds)}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Container>

//             <BottomBlock>
//                 <Button onClick={() => setActive(true)}>Start timer</Button>
//                 <ButtonReverse onClick={() => navigate("/steps/5")}>Go back</ButtonReverse>
//             </BottomBlock>
//         </div>
//     );
// };

// export default CountdownPage;





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
    const [paused, setPaused] = useState(false);

    // big spinner
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const progress = ((TOTAL_TIME - seconds) / TOTAL_TIME) * circumference;

    const formatTime = (sec) => `0:${sec < 10 ? "0" + sec : sec}`;

    useEffect(() => {
        let timer;

        if (active && !paused && seconds > 0) {
            timer = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
        }

        if (seconds === 0 && active) {
            setTimeout(() => navigate("/camera-access"), 300);
        }

        return () => clearInterval(timer);
    }, [active, paused, seconds, navigate]);

    const start = () => {
        setActive(true);
        setPaused(false);
    };

    const togglePause = () => {
        setPaused(p => !p);
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

                    {/* Centered spinner */}
                    <div className={styles.centerWrapper}>
                        <div className={styles.timerWrapper}>
                            <svg className={styles.timerSvg} width="260" height="260">
                                {/* Background circle */}
                                <circle
                                    className={styles.circleBg}
                                    cx="130"
                                    cy="130"
                                    r={radius}
                                    strokeWidth="12"
                                />

                                {/* Gradient definition */}
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#6F988F" />
                                        <stop offset="100%" stopColor="#3A6F64" />
                                    </linearGradient>
                                </defs>

                                {/* Progress circle */}
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
                    <Button onClick={start}>Start timer</Button>
                ) : (
                    <Button onClick={togglePause}>
                        {paused ? "Resume" : "Pause timer"}
                    </Button>
                )}

                <ButtonReverse onClick={() => navigate("/steps/5")}>Go back</ButtonReverse>
            </BottomBlock>
        </div>
    );
};

export default CountdownPage;