import { useRef, memo } from "react";

import styles from "./Symptoms.module.css";

const symptomsOptions = [
    "No symptoms",
    "Fishy odor",
    "Itching or burning",
    "Thick and white",
    "Greylish white and runny",
    "Green / Yellow / Brown",
];

const Symptoms = ({ symptoms, onChange }) => {
    const containerRef = useRef(null);

    const symptomList = symptomsOptions.map((item) => {
        const isActive = symptoms.includes(item);

        return (
            <div
                key={item}
                className={isActive ? styles.itemSelected : styles.item}
                onClick={() => onChange(item)}
            >
                <span>{item}</span>
            </div>
        );
    });

    return (
        <div className={styles.wrap} ref={containerRef}>
            <h4 className={styles.title}>Symptoms today</h4>
            <div className={styles.wrapSymptomsList}>
                {symptomList}
            </div>
        </div>
    );
};

export default memo(Symptoms);



