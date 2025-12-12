import { useRef, memo } from "react";

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
            <h4 className={styles.title}>Discharge</h4>
            <div className={styles.wrapDischargeList}>
                {dischargeList}
            </div>
        </div>
    );
};

export default memo(Discharge);



