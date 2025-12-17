import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";

import PersonalData from "../../components/PersonalData/PersonalData";
import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import CameraCapture from "../CameraCapture/CameraCapture";

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

    const [age, setAge] = useState(state?.age || "");
    const [hormone, setHormone] = useState(state?.hormone || "");
    const [ethnicBackground, setEthnicBackground] = useState(state?.ethnicBackground || []);
    const [discharge, setDischarge] = useState(state?.discharge || []);
    const [vulvaCondition, setVulvaCondition] = useState(state?.vulvaCondition || []);
    const [smell, setSmell] = useState(state?.smell || []);
    const [notes, setNotes] = useState(state?.notes || "");

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.heading}>
                            <h1 className={styles.title}>To help us give you more accurate and meaningful insights, please select what best describes you.</h1>
                            <p className={styles.privacyPolicy}>
                                We process your responses in real time only to provide context for your result. They are not stored. You can read more in our <a href="#">Privacy Policy</a>.
                            </p>
                        </div>
                        <div className={styles.personalData}>
                            <PersonalData
                                age={age}
                                setAge={setAge}
                                hormone={hormone}
                                setHormone={setHormone}
                                ethnicBackground={ethnicBackground}
                                setEthnicBackground={setEthnicBackground}
                                discharge={discharge}
                                setDischarge={setDischarge}
                                vulvaCondition={vulvaCondition}
                                setVulvaCondition={setVulvaCondition}
                                smell={smell}
                                setSmell={setSmell}
                                notes={notes}
                                setNotes={setNotes}
                            />
                        </div>

                        <BottomBlock>
                            <Button
                                onClick={() => navigate("/result-with-details-normal", {
                                    state: {
                                        age,
                                        hormone,
                                        ethnicBackground,
                                        discharge,
                                        vulvaCondition,
                                        smell,
                                        notes
                                    }
                                })}
                            >
                                Save
                            </Button>
                            <ButtonReverse onClick={() => navigate("/result-without-details")}>Go back</ButtonReverse>
                        </BottomBlock>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default AddDetailsPage;