import { useRef, memo } from "react";

import styles from "./Smell.module.css";

const smellOptions = [
    "Strong and unpleasant (“Fishy”)",
    "Sour",
    "Chemical-like",
    "Very strong or rotten",
];

const Smell = ({ smell, onChange }) => {
    const containerRef = useRef(null);

    const smellList = smellOptions.map((item) => {
        const isActive = smell.includes(item);

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
            <h4 className={styles.title}>Smell</h4>
            <div className={styles.wrapSmellList}>
                {smellList}
            </div>
        </div>
    );
};

export default memo(Smell);



