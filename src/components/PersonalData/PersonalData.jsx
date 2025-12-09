import AgeDropdown from "../AgeDropdown/AgeDropdown";
import HormoneDropdown from "../HormoneDropdown/HormoneDropdown";
import AncestralChoice from "../AncestralChoice/AncestralChoice";
import Symptoms from "../SymptomsChoice/SymptomsChoice";
import Notes from "../Notes/Notes";

import styles from "./PersonalData.module.css";

const PersonalData = ({ age, setAge, hormone, setHormone, ancestral, setAncestral, symptoms, setSymptoms, notes, setNotes }) => {
    const handleHormoneChange = (value) => {
        setHormone((prev) =>
            prev.includes(value)
                ? prev.filter((h) => h !== value)
                : [...prev, value]
        );
    };

    // const handleHormoneRemove = (value) => {
    //     setHormone((prev) => prev.filter((h) => h !== value));
    // };

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

    // const handleAncestralRemove = (value) => {
    //     setAncestral((prev) => prev.filter((h) => h !== value));
    // };

    return (
        <>
            <div className={styles.wrapper}>
                <form className={styles.form}>
                    <AgeDropdown age={age} onSelect={setAge} />
                    <HormoneDropdown
                        hormone={hormone}
                        onChange={handleHormoneChange}
                    // onRemove={handleHormoneRemove}
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