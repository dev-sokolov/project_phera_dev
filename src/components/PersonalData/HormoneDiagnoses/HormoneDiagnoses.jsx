import { memo, useState } from "react";
import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./HormoneDiagnoses.module.css";

const options = [
    "Adenomyosis",
    "Amenorhea",
    "Cushing’s syndrome",
    "Diabetes",
    "Endometriosis",
    "Intersex status",
    "Thyroid disorder",
    "Uterine fibroids",
    "Polycystic ovary syndrome (PCOS)",
    "Premature ovarian insufficiency (POI)",
];

const HormoneDiagnoses = ({ hormoneDiagnoses, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const list = options.map((item) => {
        const isActive = hormoneDiagnoses.includes(item);

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
        <div className={styles.wrap}>
            <InfoTooltip title="Diagnoses related to hormones" onToggle={() => setIsOpen((v) => !v)} onToggleArrow={isOpen}></InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`}>
                {list}
            </div>
        </div>
    );
};

export default memo(HormoneDiagnoses);



