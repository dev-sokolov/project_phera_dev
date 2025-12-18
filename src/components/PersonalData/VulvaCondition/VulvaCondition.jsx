import { memo, useState } from "react";

import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./VulvaCondition.module.css";

const vulvaConditionOptions = [
    "Dry",
    "Itchy",
];

const VulvaCondition = ({ vulvaCondition, onChange }) => {
    const [isOpen, setIsOpen] = useState(true);

    const vulvaConditionList = vulvaConditionOptions.map((item) => {
        const isActive = vulvaCondition.includes(item);

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
            <InfoTooltip title="Vulva & Vagina" onToggle={() => setIsOpen((v) => !v)} onToggleArrow={isOpen}>
                It is normal to experience occasional dryness or itchiness - after shaving, using a new hygiene product, or wearing tight clothes. If such sensations become uncomfortable and appear along with other symptoms, they may signal an infection.
            </InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`}>
                {vulvaConditionList}
            </div>
        </div>
    );
};

export default memo(VulvaCondition);



