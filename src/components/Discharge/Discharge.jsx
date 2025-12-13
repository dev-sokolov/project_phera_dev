import { useRef, memo } from "react";

import InfoTooltip from "../InfoTooltip/InfoTooltip";
import styles from "./Discharge.module.css";

const dischargeOptions = [
    "No discharge",
    "Creamy",
    "Sticky",
    "Egg white",
    "Clumpy white",
    "Yellow",
    "Green",
    "Red",
    "Brown",
];

const Discharge = ({ discharge, onChange }) => {
    const containerRef = useRef(null);

    const dischargeList = dischargeOptions.map((item) => {
        const isActive = discharge.includes(item);

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
            <InfoTooltip title="Discharge">
                Discharge varies from person to person. It is influenced by your cycle, hygiene products, medications, stress, and a lot of other factors. Look out for discharge of unusual colour and texture.
            </InfoTooltip>
            <div className={styles.wrapDischargeList}>
                {dischargeList}
            </div>
        </div>
    );
};

export default memo(Discharge);



