import { useState, useEffect, useRef } from "react";
import InfoCircle from "../../assets/icons/InfoCircle";
import styles from "./AgeInput.module.css";

const MAX_AGE = 120;
const MIN_AGE = 1;

const AgeInput = ({ age, onChange }) => {
    const [localAge, setLocalAge] = useState(age ?? "");
    const [warning, setWarning] = useState("");
    const [showInfo, setShowInfo] = useState(false);

    const infoRef = useRef(null);

    useEffect(() => {
        setLocalAge(age ?? "");
    }, [age]);

    // Закрытие по клику вне
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (infoRef.current && !infoRef.current.contains(e.target)) {
                setShowInfo(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        const raw = e.target.value;
        setLocalAge(raw);
        setWarning("");
        onChange(raw === "" ? "" : Number(raw));
    };

    const validateAndFix = (valueStr) => {
        if (valueStr === "") {
            setWarning("");
            return;
        }

        let value = Number(valueStr);
        if (Number.isNaN(value)) {
            setWarning("Please enter a valid number");
            return;
        }

        if (value < MIN_AGE) value = MIN_AGE;
        if (value > MAX_AGE) value = MAX_AGE;

        onChange(value);
        setLocalAge(String(value));

        if (value < 10) {
            setWarning("Please double-check your age.");
        } else if (value > 90) {
            setWarning("Is the age correct?");
        } else {
            setWarning("");
        }
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.wrapTitle}>
                <h4 className={styles.title}>Age</h4>
                {/* <InfoCircle className={styles.infoCircle} /> */}
                <div
                    className={styles.infoCircle}
                    onClick={() => setShowInfo((prev) => !prev)}
                    ref={infoRef}
                >
                    <InfoCircle />
                </div>
            </div>

            {showInfo && (
                <div className={styles.popover}>
                    <p>
                        It is normal for vaginal pH to change with age, because of how hormones work at different life stages. Such shifts can slightly affect natural self-lubrication and odor.
                    </p>
                </div>
            )}

            <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                className={styles.input}
                placeholder="Enter your age"
                value={localAge}
                onChange={handleChange}
                onBlur={(e) => validateAndFix(e.target.value)}
                min={MIN_AGE}
                max={MAX_AGE}
            />

            {warning && <p className={styles.warn}>{warning}</p>}
        </div>
    );
};

export default AgeInput;