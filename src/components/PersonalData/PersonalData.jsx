import AgeInput from "../AgeInput/AgeInput";
import HormoneDropdown from "../HormoneDropdown/HormoneDropdown";
import AncestralChoice from "../AncestralChoice/AncestralChoice";
import Symptoms from "../SymptomsChoice/SymptomsChoice";
import Notes from "../Notes/Notes";

import styles from "./PersonalData.module.css";

const PersonalData = ({ age, setAge, hormone, setHormone, ancestral, setAncestral, symptoms, setSymptoms, notes, setNotes }) => {

    const handleAncestralChange = (value) => {
        setAncestral((prev) =>
            prev.includes(value)
                ? prev.filter((h) => h !== value)
                : [...prev, value]
        );
    };

    const handleSymptomsChange = (value) => {
        setSymptoms((prev) =>
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
                    <AncestralChoice
                        ancestral={ancestral}
                        onChange={handleAncestralChange}
                    />
                    <Symptoms
                        symptoms={symptoms}
                        onChange={handleSymptomsChange}
                    />
                    <Notes notes={notes} setNotes={setNotes} />
                </form>
            </div>
        </>
    );
};

export default PersonalData;