import { useRef, memo } from "react";

import styles from "./Vulva.module.css";

const vulvaOptions = [
    "Dry",
    "Itchy",
    "Itching or burning",
];

const Vulva = ({ vulva, onChange }) => {
    const containerRef = useRef(null);

    const vulvaList = vulvaOptions.map((item) => {
        const isActive = vulva.includes(item);

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
            <h4 className={styles.title}>Vulva & Vagina</h4>
            <div className={styles.wrapVulvaList}>
                {vulvaList}
            </div>
        </div>
    );
};

export default memo(Vulva);



