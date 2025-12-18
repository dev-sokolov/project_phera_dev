// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import Container from "../../components/Container/Container";

// import loader from "../../assets/lottie/loader.json";
// import styles from "./CameraProcessingPage.module.css";

// const CameraProcessingPage = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             navigate("/result-without-details");
//         }, 300000);
//         return () => clearTimeout(timer);
//     }, [navigate]);
//     return (
//         <>
//             <div className={styles.content}>
//                 <Container fullWidth>
//                     <div className={styles.containerInner}>
//                         <div className={styles.mainBlock}>
//                             <div className={styles.wrappInner}>
//                                 <div className={styles.icon}>
//                                     <Lottie className={styles.loading} animationData={loader} loop={true} />
//                                 </div>
//                                 <div className={styles.textBlock}>
//                                     <h2 className={styles.heading}>Processing your test</h2>
//                                     <p className={styles.text}>Studies suggest that most vaginal pH changes are linked to everyday factors — not infections.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         </>
//     )
// };

// export default CameraProcessingPage;

import { useNavigate } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import EmptyFile from "../../assets/icons/EmptyFile";

import styles from "./CameraProcessingPage.module.css";

const CameraProcessingPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.mainBlock}>
                            <div className={styles.icon}><EmptyFile /></div>
                            <div className={styles.textBlock}>
                                <h1 className={styles.title}>Your test history will appear here</h1>
                                <div className={styles.text}>After your first scan, you’ll be able to see your past results here and notice patterns over time.</div>
                            </div>

                        </div>

                        <BottomBlock>
                            <Button onClick={() => navigate("/steps")}>Start new scan</Button>
                        </BottomBlock>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default CameraProcessingPage;