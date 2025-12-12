import { memo } from "react";

import styles from "./EthnicBackground.module.css";

const ethnicBackgroundOptions = [
  "African / Black",
  "East Asian",
  "South Asian",
  "Southeast Asian",
  "Middle Eastern",
  "North African",
  "European / White",
  "Latin American / Hispanic",
  "Indigenous",
  "Mixed background",
  "Other",
];

const EthnicBackground = ({ ethnicBackground, onChange }) => {

  const ethnicBackgroundList = ethnicBackgroundOptions.map((item) => {
    const isActive = ethnicBackground.includes(item);

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
      <h4 className={styles.title}>Ethnic background(s)</h4>
      <div className={styles.wrapEthnicBackgroundlList}>
        {ethnicBackgroundList}
      </div>
    </div>
  );
};

export default memo(EthnicBackground);
