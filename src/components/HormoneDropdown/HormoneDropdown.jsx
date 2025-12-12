import { useState, useRef, useEffect } from "react";
import ArrowDown from "../../assets/icons/ArrowDown";

import styles from "./HormoneDropdown.module.css";

const hormoneOptions = [
  "On my period",
  "Just after my period",
  "Mid-cycle / around ovulation",
  "Pregnant",
  "Postpartum",
  "Perimenopause",
  "Menopause",
  "On hormonal birth control",
  "On hormone therapy",
  "None of the above",
  "Not sure",
];

const HormoneDropdown = ({ hormone, onSelect }) => {
  const selectRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectWidth, setSelectWidth] = useState(0);
  const containerRef = useRef(null);

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!selectRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
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
      <h4 className={styles.title}>Hormone Status</h4>
      <div
        className={`${styles.select} ${hormone ? styles.selected : ""}`}
        onClick={toggle}
        ref={selectRef}
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {hormone || "Select hormone status"}
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}><ArrowDown /></span>
      </div>

      <div className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`} style={{ width: selectWidth }}>
        {hormoneOptions.map((option) => (
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

export default HormoneDropdown;
