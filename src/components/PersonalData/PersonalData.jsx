import AgeDropdown from "../AgeDropdown/AgeDropdown";
import HormoneDropdown from "../HormoneDropdown/HormoneDropdown";
import AncestralDropdown from "../AncestralDropdown/AncestralDropdown";
import Symptoms from "../Symptoms/Symptoms";

import styles from "./PersonalData.module.css";

const PersonalData = ({ age, setAge, hormone, setHormone, ancestral, setAncestral }) => {
    const handleHormoneChange = (value) => {
        setHormone((prev) =>
            prev.includes(value)
                ? prev.filter((h) => h !== value)
                : [...prev, value]
        );
    };

    const handleHormoneRemove = (value) => {
        setHormone((prev) => prev.filter((h) => h !== value));
    };

    const handleAncestralChange = (value) => {
        setAncestral((prev) =>
            prev.includes(value)
                ? prev.filter((h) => h !== value)
                : [...prev, value]
        );
    };

    const handleAncestralRemove = (value) => {
        setAncestral((prev) => prev.filter((h) => h !== value));
    };

    return (
        <>
            {/* <div className={`${styles.wrapper} ${!isActive ? styles.inactive : ""}`}> */}
            <div className={styles.wrapper}>
                <form className={styles.form}>
                    <AgeDropdown age={age} onSelect={setAge} />
                    <HormoneDropdown
                        hormone={hormone}
                        onChange={handleHormoneChange}
                        onRemove={handleHormoneRemove}
                    />
                    <AncestralDropdown
                        ancestral={ancestral}
                        onChange={handleAncestralChange}
                        onRemove={handleAncestralRemove}
                    />
                    <Symptoms />
                </form>
            </div>
        </>
    );
};

export default PersonalData;