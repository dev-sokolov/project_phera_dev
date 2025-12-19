import { memo, useState } from "react";

import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./Urination.module.css";

const urinationOptions = [
    "Frequent urination",
    "Burning sensation",
];

const Urination = ({ urination, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const urinationList = urinationOptions.map((item) => {
        const isActive = urination.includes(item);

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
        <div className={styles.wrap} >
            <InfoTooltip title="Urine" onToggle={() => setIsOpen((v) => !v)} onToggleArrow={isOpen}>
                It is normal to urinate more often after drinking more fluids, coffee, or during periods of stress. A brief burning sensation can happen after using a new product or after sex. If such sensations last a long time or appear with other symptoms, they may signal an infection.
            </InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`}>
                {urinationList}
            </div>
        </div>
    );
};

export default memo(Urination);



