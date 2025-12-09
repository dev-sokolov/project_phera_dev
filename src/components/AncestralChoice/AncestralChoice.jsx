import { memo } from "react";

import styles from "./AncestralChoice.module.css";

const ancestralOptions = [
  "Asian",
  "African",
  "Caucasian",
  "Latin American",
  "Middle Eastern",
  "Mixed",
  "Other",
];

const AncestralChoice = ({ ancestral, onChange }) => {

  const ancestralList = ancestralOptions.map((item) => {
    const isActive = ancestral.includes(item);

    return (
      <div
        key={item}
        className={isActive ? styles.isemSelected : styles.item}
        onClick={() => onChange(item)}
      >
        {item}
      </div>
    );
  });

  return (
    <div className={styles.wrap}>
      <h4 className={styles.title}>Ancestral Background(s)</h4>
      <div className={styles.wrapAncestralList}>
        {ancestralList}
      </div>
    </div>
  );
};

export default memo(AncestralChoice);
