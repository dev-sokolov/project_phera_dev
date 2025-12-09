import { useState, useRef, useEffect } from "react";
import ArrowDown from "../../assets/icons/ArrowDown";

import styles from "./AgeDropdown.module.css";

const ageOptions = ["18-24", "25-34", "35-44", "45-54", "55+"];

const AgeDropdown = ({ age, onSelect }) => {
    const selectRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectWidth, setSelectWidth] = useState(0);
    const containerRef = useRef(null);

    const toggle = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        if (!selectRef.current) return;
        const resizeObserver = new ResizeObserver(() => {
            // setSelectWidth(selectRef.current.offsetWidth);
            if (selectRef.current) {
                setSelectWidth(selectRef.current.offsetWidth);
            }
        });
        resizeObserver.observe(selectRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // click out
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // click Escape
    useEffect(() => {
        const handleEscape = (e) => e.key === "Escape" && setIsOpen(false);
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    return (
        <div className={styles.wrap} ref={containerRef}>
            <h4 className={styles.title}>Age Group</h4>
            <div
                className={`${styles.select} ${age ? styles.selected : ""}`}
                onClick={toggle}
                ref={selectRef}
                tabIndex={0}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                {age || "Select age group"}
                <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}><ArrowDown /></span>
            </div>

            <div className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`} style={{ width: selectWidth }}>
                {ageOptions.map((option) => (
                    <div
                        key={option}
                        className={styles.dropdownItem}
                        onClick={() => { onSelect(option); setIsOpen(false); }}
                        role="option"
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgeDropdown;