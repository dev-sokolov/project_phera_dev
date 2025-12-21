import { memo, useState } from "react";
import Radio from "../../Radio/Radio";
import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./FertilityJourney.module.css";

const radioOptions = ["I am pregnant", "I had a baby (last 12 months)", "I am not able to get pregnant", "I am trying to conceive"];
const listOptions = ["Ovulation induction", "Intrauterine insemination (IUI)", "In vitro fertilisation (IVF)", "Egg freezing stimulation", "Luteal progesterone"];

const FertilityJourney = ({ fertilityJourney, setFertilityJourney }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleRadioChange = (value) => {
        setFertilityJourney(prev => ({
            ...prev,
            currentStatus: value
        }));
    };

    const handleListChange = (value) => {
        setFertilityJourney(prev => ({
            ...prev,
            fertilityTreatments: prev.fertilityTreatments.includes(value)
                ? prev.fertilityTreatments.filter(v => v !== value)
                : [...prev.fertilityTreatments, value]
        }));
    };

    return (
        <div className={styles.wrap}>
            <InfoTooltip
                title="Fertility journey"
                onToggle={() => setIsOpen(v => !v)}
                onToggleArrow={isOpen}
            />

            <div className={`${styles.wrapList} ${!isOpen ? styles.collapsed : ""}`}>

                {/* RADIO */}
                <div className={styles.section}>
                    <h4 className={styles.heading}>Current status:</h4>
                    {radioOptions.map(item => (
                        <Radio
                            key={item}
                            name="fertility-journey-status"
                            value={item}
                            label={item}
                            checked={fertilityJourney.currentStatus === item}
                            onChange={() => handleRadioChange(item)}
                        />
                    ))}
                </div>

                {/* LIST */}
                <div className={styles.list}>
                    <h4 className={styles.heading}>Fertility treatments (last 3 months)</h4>
                    {listOptions.map(item => {
                        const isActive = fertilityJourney.fertilityTreatments.includes(item);

                        return (
                            <div
                                key={item}
                                className={isActive ? styles.itemSelected : styles.item}
                                onClick={() => handleListChange(item)}
                            >
                                {item}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default memo(FertilityJourney);



