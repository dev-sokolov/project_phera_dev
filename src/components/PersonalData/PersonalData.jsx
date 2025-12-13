import AgeInput from "../AgeInput/AgeInput";
import HormoneDropdown from "../HormoneDropdown/HormoneDropdown";
import EthnicBackground from "../EthnicBackground/EthnicBackground";
import Discharge from "../Discharge/Discharge";
import VulvaCondition from "../Vulvacondition/Vulvacondition";
import Smell from "../Smell/Smell";
import Notes from "../Notes/Notes";

import styles from "./PersonalData.module.css";

const PersonalData = ({ age, setAge, hormone, setHormone, ethnicBackground, setEthnicBackground, discharge, setDischarge, notes, setNotes, vulvaCondition, setVulvaCondition, smell, setSmell }) => {

    const handleEthnicBackgroundChange = (value) => {
        setEthnicBackground((prev) =>
            prev.includes(value)
                ? prev.filter((h) => h !== value)
                : [...prev, value]
        );
    };

    const handleDischargeChange = (value) => {
        setDischarge((prev) =>
            prev.includes(value)
                ? prev.filter((h) => h !== value)
                : [...prev, value]
        );
    };

    const handleVulvaConditionChange = (value) => {
        setVulvaCondition((prev) =>
            prev.includes(value)
                ? prev.filter((h) => h !== value)
                : [...prev, value]
        );
    };

    const handleSmellChange = (value) => {
        setSmell((prev) =>
            prev.includes(value)
                ? prev.filter((h) => h !== value)
                : [...prev, value]
        );
    };

    return (
        <>
            <div className={styles.wrapper}>
                <form className={styles.form}>
                    <AgeInput age={age} onChange={setAge} />
                    <HormoneDropdown
                        hormone={hormone}
                        onSelect={setHormone}
                    />
                    <EthnicBackground
                        ethnicBackground={ethnicBackground}
                        onChange={handleEthnicBackgroundChange}
                    />
                    <Discharge
                        discharge={discharge}
                        onChange={handleDischargeChange}
                    />
                    <VulvaCondition
                        vulvaCondition={vulvaCondition}
                        onChange={handleVulvaConditionChange}
                    />
                    <Smell
                        smell={smell}
                        onChange={handleSmellChange}
                    />
                    <Notes notes={notes} setNotes={setNotes} />
                </form>
            </div>
        </>
    );
};

export default PersonalData;