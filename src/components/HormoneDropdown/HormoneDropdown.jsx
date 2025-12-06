import { useState, useRef, useEffect, memo } from "react";
import ArrowDown from "../../assets/icons/ArrowDown";
import styles from "./HormoneDropdown.module.css";

const hormoneOptions = [
  "Estrogen",
  "Progesterone",
  "Testosterone",
  "Cortisol",
  "Thyroid hormones",
];

// const HormoneDropdown = ({ hormone, onChange, onRemove }) => {
const HormoneDropdown = ({ hormone, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const containerRef = useRef(null);
  const [selectWidth, setSelectWidth] = useState(0);

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!selectRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setSelectWidth(selectRef.current.offsetWidth);
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

  const displayText = hormone.length === 0 ? "Choose all that apply" : `${hormone.length} selected`;

  return (
    <div className={styles.wrap} ref={containerRef}>
      <h4 className={styles.title}>Hormone Status</h4>
      <div
        // className={styles.select}
        className={`${styles.select} ${hormone.length > 0 ? styles.selected : ""}`}
        onClick={toggle}
        ref={selectRef}
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {displayText}
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}><ArrowDown /></span>
      </div>

      <div className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`} style={{ width: selectWidth }}>
        {hormoneOptions.map((option) => (
          <div
            key={option}
            className={styles.dropdownItem}
            onClick={() => onChange(option)}
            role="option"
          >
            <span
              className={`${styles.checkmarkLeft} ${hormone.includes(option) ? styles.visible : ""}`}>
              ✓
            </span>
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(HormoneDropdown);
