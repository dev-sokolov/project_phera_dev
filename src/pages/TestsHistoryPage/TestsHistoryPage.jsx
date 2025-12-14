import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import AppLayout from "../../components/Layout/AppLayout";

import ArrowDownGrey from "../../assets/icons/ArrowDownGrey";
import learnMore from "../../assets/images/learnMore.jpg"
import EditNotesGrey from "../../assets/icons/EditNotesGrey";
import ArrowRightGrey from "../../assets/icons/ArrowRightGrey";
import ArrowRightBlack from "../../assets/icons/ArrowRightBlack";
import ArrowRightBlackSmall from "../../assets/icons/ArrowRightBlackSmall"; 
import Logo from "../../assets/Logo";
import styles from "./TestsHistoryPage.module.css";

const TestsHistoryPage = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const { state } = useLocation();

    const toggleMenu = () => setIsOpenMenu(prev => !prev);

    // const detailOptions = [   // временно, потом вернуть  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //     state?.age,
    //     state?.hormone,
    //     ...(state?.ancestral?.length ? state.ancestral : []),
    //     ...(state?.symptoms?.length ? state.symptoms : []),
    // ].filter(Boolean);

    const detailOptions = [     // временно, потом удалить  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        "18-24", "Mid-cycle", "Asian", "No symptoms"
    ];

    const hasDetails = detailOptions.length > 0;

    const detailsList = detailOptions.map((item) => (
        <div key={item} className={styles.item}>{item}</div>
    ));

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <AppLayout />
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
                    </div>
                </Container>
            </div>
        </>
    )
};

export default TestsHistoryPage;