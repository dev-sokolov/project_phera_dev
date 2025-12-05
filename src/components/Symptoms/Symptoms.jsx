import { useRef, memo } from "react";

import IconNoSymptoms from "../../assets/icons/IconNoSymptoms";
import IconFishyOdor from "../../assets/icons/IconFishyOdor";
import IconItching from "../../assets/icons/IconItching";
import IconThickWhite from "../../assets/icons/IconThickWhite";
import IconGreyWhite from "../../assets/icons/IconGreyWhite";
import IconGreenYellow from "../../assets/icons/IconGreenYellow";

import styles from "./Symptoms.module.css";

const symptomsOptions = [
    { label: "No symptoms", icon: <IconNoSymptoms /> },
    { label: "Fishy odor", icon: <IconFishyOdor /> },
    { label: "Itching or burning", icon: <IconItching /> },
    { label: "Thick and white", icon: <IconThickWhite /> },
    { label: "Greylish white and runny", icon: <IconGreyWhite /> },
    { label: "Green / Yellow / Brown", icon: <IconGreenYellow /> },
];

const Symptoms = ({ symptoms, onChange }) => {
    const containerRef = useRef(null);

    const symptomList = symptomsOptions.map((item) => {
        const isActive = symptoms.includes(item.label);

        return (
            <div
                key={item.label}
                className={isActive ? styles.itemSelected : styles.item}
                onClick={() => onChange(item.label)}
            >
                <div className={styles.wpapIcon}>
                    <div className={styles.icon}>
                        {item.icon}
                    </div>
                </div>
                <span>{item.label}</span>
            </div>
        );
    });

    return (
        <div className={styles.wrap} ref={containerRef}>
            <h4 className={styles.title}>Symptoms today</h4>
            <p className={styles.text}>Select all that apply.</p>
            <div className={styles.wrapSymptomsList}>
                {symptomList}
            </div>
        </div>
    );
};

export default memo(Symptoms);



