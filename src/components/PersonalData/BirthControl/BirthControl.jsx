import { memo, useState } from "react";

import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./BirthControl.module.css";

const options = [
    "Regular",
    "Irregular",
    "No period for 12+ months",
    "Never had a period",
    "Perimenopause",
    "Postmenopause",
];

const BirthControl = ({ menstrualCycle, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const list = options.map((item) => {
        const isActive = menstrualCycle.includes(item);

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
            <InfoTooltip title="Menstrual cycle" onToggle={() => setIsOpen((v) => !v)} onToggleArrow={isOpen}></InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`}>
                {list}
            </div>
        </div>
    );
};

export default memo(BirthControl);



