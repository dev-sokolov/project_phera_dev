import { memo } from "react";

import InfoTooltip from "../InfoTooltip/InfoTooltip";
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
      <InfoTooltip title="Ethnic background(s)">
        Racial and ethnic backgrounds are linked to natural differences in genetics, immune responses, and care habits. This can shape vaginal flora and therefore its acidity, moisture, and scent. Knowing this helps pHera understand what is normal for your body.
      </InfoTooltip>

      <div className={styles.wrapEthnicBackgroundlList}>
        {ethnicBackgroundList}
      </div>
    </div>
  );
};

export default memo(EthnicBackground);
