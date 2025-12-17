import { useNavigate } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import ArrowRightBlackSmall from "../../assets/icons/ArrowRightBlackSmall";

import styles from "./TestsHistoryPage.module.css";

const TestsHistoryPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.title}>Test history</div>
                        <div className={styles.visualBlock}>
                            <div className={styles.wrappingHeading}>
                                <h4 className={styles.phTest}>pH test</h4>
                                <div className={styles.wrapDate}>
                                    <div className={styles.date}>12.06.2025</div>
                                    <div className={styles.icon}><ArrowRightBlackSmall /></div>
                                </div>
                            </div>
                            <div className={styles.wrapNum}>
                                <div className={styles.num}>7.35</div>
                                <div className={styles.phLevel}>Normal pH</div>
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

export default TestsHistoryPage;