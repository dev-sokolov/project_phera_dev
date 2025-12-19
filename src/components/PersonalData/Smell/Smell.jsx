import { memo, useState } from "react";

import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./Smell.module.css";

const smellOptions = [
    "Strong and unpleasant (“fishy”)",
    "Sour",
    "Chemical-like",
    "Very strong or rotten",
];

const Smell = ({ smell, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

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
        <div className={styles.wrap} >
            <InfoTooltip title="Smell" onToggle={() => setIsOpen((v) => !v)} onToggleArrow={isOpen}>
                A healthy vagina can have a natural scent that is metallic, musky, earthy, or tangy - all of these are normal! If you notice any of the unusual odors, such as those listed below, it might be helpful to mention them to your clinician.
            </InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`}>
                {smellList}
            </div>
        </div>
    );
};

export default memo(Smell);



