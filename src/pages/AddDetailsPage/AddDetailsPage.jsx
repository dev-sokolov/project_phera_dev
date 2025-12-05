import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";

import PersonalData from "../../components/PersonalData/PersonalData";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import CameraCapture from "../CameraCapture/CameraCapture";

import Logo from "../../assets/Logo";
import CameraAccessImg from "../../assets/CameraAccessImg";
import styles from "./AddDetailsPage.module.css";

const AddDetailsPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    // if (!state || !state.phValue || !state.date) {
    //     return <Navigate to="/" replace />;
    // }
    // console.log("Данные с камеры:", state);
    // const { phValue, date } = state;
    // const value = Number(phValue);
    // const safePh = isNaN(value) ? "N/A" : value;
    // console.log(`phValue: ${safePh}, date: ${date}`);

    // const [isDataSharingActive, setIsDataSharingActive] = useState(false);
    const [age, setAge] = useState("");
    const [hormone, setHormone] = useState([]);
    const [ancestral, setAncestral] = useState([]);
    const [symptoms, setSymptoms] = useState([]);

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
                        <div className={styles.wrapHeading}>
                            <h2 className={styles.heading}>Make this result more personal</h2>
                            <div className={styles.date}>12.06.25 | 8:23 PM</div>
                        </div>
                        <h1 className={styles.title}>Your details help us make your insights more accurate and helpful.</h1>
                        <div className={styles.wrapCheckbox}>
                            <label className={styles.contentCheckbox}>
                                <input type="checkbox" className={styles.checkbox} />
                                <p className={styles.checkboxText}>
                                    By sharing this information, you consent to pHera using it to personalize your insights. Your data stays private and is never shared without your permission. Read more in our <a href="#">Privacy Policy</a>.
                                </p>
                            </label>
                        </div>
                        <div className={styles.personalData}>
                            <PersonalData
                                age={age}
                                setAge={setAge}
                                hormone={hormone}
                                setHormone={setHormone}
                                ancestral={ancestral}
                                setAncestral={setAncestral}
                                symptoms={symptoms}
                                setSymptoms={setSymptoms}
                            />
                        </div>

                        <div className={styles.bottomBlock}>
                            <div className={styles.bottomBlockInner}>
                                <Button onClick={() => navigate("/result-without-details")}>Save</Button>
                            </div>
                        </div>
                    </div>
                </Container>
                {/* <div className={styles.bottomBlock}>
                    <div className={styles.bottomBlockInner}>
                        <Button onClick={() => navigate("/result-without-details")}>Save</Button>
                    </div>
                </div> */}
            </div>
        </>
    )
};

export default AddDetailsPage;