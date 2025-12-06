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
    const [notes, setNotes] = useState("");

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
                        <div className={styles.heading}>
                            <h1 className={styles.title}>Your details help us make your insights more accurate and helpful.</h1>
                            <p className={styles.privacyPolicy}>
                                By sharing this information, you consent to pHera using it to personalize your insights. Your data stays private and is never shared without your permission. Read more in our <a href="#">Privacy Policy</a>.
                            </p>
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
                                notes={notes}
                                setNotes={setNotes}
                            />
                        </div>

                        <div className={styles.bottomBlock}>
                            <div className={styles.bottomBlockInner}>
                                <Button onClick={() => navigate("/result-without-details")}>Save</Button>
                                <ButtonReverse>Go back</ButtonReverse>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default AddDetailsPage;