import styles from "./AgeInput.module.css";

const AgeInput = ({ age, onChange }) => {
    const handleChange = (e) => {
        let value = e.target.value;

        // Ограничение 1–150
        if (value > 150) value = 150;
        if (value < 1 && value !== "") value = 1;

        onChange(value);
    };

    return (
        <div className={styles.wrap}>
            <h4 className={styles.title}>Age Group</h4>
            <input
                type="number"
                className={styles.input}
                placeholder="Enter your age"
                value={age}
                onChange={handleChange}
                min={1}
                max={150}
            />
        </div>
    );
};

export default AgeInput;