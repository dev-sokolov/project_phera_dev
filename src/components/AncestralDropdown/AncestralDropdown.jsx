import { useRef, memo } from "react";
import styles from "./AncestralDropdown.module.css";
import CheckboxTick from "../../assets/icons/CheckboxTick";

const ancestralOptions = [
  "Asian",
  "African",
  "European",
  "Latin American",
  "Middle Eastern",
  "Mixed",
  "Other",
];

const AncestralDropdown = ({ ancestral, onChange }) => {
  const containerRef = useRef(null);

  const ancestralList = ancestralOptions.map((item) => {
    const isActive = ancestral.includes(item);

    return (
      <div
        key={item}
        className={isActive ? styles.isemSelected : styles.item}
        onClick={() => onChange(item)}
      >
        <span className={isActive ? styles.checkmark : styles.checkmarkHidden}><CheckboxTick /></span>
        {item}
      </div>
    );
  });

  return (
    <div className={styles.wrap} ref={containerRef}>
      <h4 className={styles.title}>Ancestral Background(s)</h4>
      <p className={styles.text}>Select all that apply.</p>
      <div className={styles.wrapAncestralList}>
        {ancestralList}
      </div>
    </div>
  );
};

export default memo(AncestralDropdown);
