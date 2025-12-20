import AgeInput from "./AgeInput/AgeInput";
import EthnicBackground from "./EthnicBackground/EthnicBackground";
import MenstrualCycle from "./MenstrualCycle/MenstrualCycle";
import HormoneDiagnoses from "./HormoneDiagnoses/HormoneDiagnoses";
import Discharge from "./Discharge/Discharge";
import VulvaCondition from "./VulvaCondition/VulvaCondition";
import Smell from "./Smell/Smell";
import Urination from "./Urination/Urination";
import Notes from "./Notes/Notes";

import styles from "./PersonalData.module.css";

const PersonalData = ({
    age,
    setAge,
    ethnicBackground,
    setEthnicBackground,
    menstrualCycle,
    setMenstrualCycle,
    hormoneDiagnoses,
    setHormoneDiagnoses,
    discharge,
    setDischarge,
    vulvaCondition,
    setVulvaCondition,
    smell,
    setSmell,
    urination,
    setUrination,
    notes,
    setNotes,
}) => {

    const handleEthnicBackgroundChange = (value) => {
        setEthnicBackground((prev) =>
            prev.includes(value)
                ? prev.filter((h) => h !== value)
                : [...prev, value]
        );
    };

    const handleMenstrualCycleChange = (value) => {
        setMenstrualCycle((prev) =>
            prev.includes(value)
                ? prev.filter((h) => h !== value)
                : [...prev, value]
        );
    };

    const handleHormoneDiagnosesChange = (value) => {
        setHormoneDiagnoses((prev) =>
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

    const handleUrinationChange = (value) => {
        setUrination((prev) =>
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
                    <EthnicBackground
                        ethnicBackground={ethnicBackground}
                        onChange={handleEthnicBackgroundChange}
                    />
                    <div className={styles.heading}>Hormone status</div>
                    <MenstrualCycle
                        menstrualCycle={menstrualCycle}
                        onChange={handleMenstrualCycleChange}
                    />
                    <HormoneDiagnoses
                        hormoneDiagnoses={hormoneDiagnoses}
                        onChange={handleHormoneDiagnosesChange}
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
                    <Urination
                        urination={urination}
                        onChange={handleUrinationChange}
                    />
                    <Notes notes={notes} setNotes={setNotes} />
                </form>
            </div>
        </>
    );
};

export default PersonalData;