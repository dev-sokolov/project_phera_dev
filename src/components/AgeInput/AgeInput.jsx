// import styles from "./AgeInput.module.css";

// const AgeInput = ({ age, onChange }) => {
//     const handleChange = (e) => {
//         let value = e.target.value;

//         // Ограничение 1–150
//         if (value > 120) value = 120;
//         if (value < 1 && value !== "") value = 1;

//         onChange(value);
//     };

//     return (
//         <div className={styles.wrap}>
//             <h4 className={styles.title}>Age Group</h4>
//             <input
//                 type="number"
//                 className={styles.input}
//                 placeholder="Enter your age"
//                 value={age}
//                 onChange={handleChange}
//                 min={1}
//                 max={120}
//             />
//         </div>
//     );
// };

// export default AgeInput;

// import { useState, useEffect } from "react";
// import styles from "./AgeInput.module.css";

// const AgeInput = ({ age, onChange }) => {
//     const [localAge, setLocalAge] = useState(age || "");
//     const [warning, setWarning] = useState("");

//     // Синхронизация внешнего и внутреннего состояния
//     useEffect(() => {
//         setLocalAge(age || "");
//     }, [age]);

//     const handleChange = (e) => {
//         const raw = e.target.value;
//         setLocalAge(raw);

//         // Разрешаем пустое значение — пользователь может печатать
//         if (raw === "") {
//             onChange("");
//             setWarning("");
//             return;
//         }

//         let value = Number(raw);

//         // Мягкие ограничения
//         if (value < 1) value = 1;
//         if (value > 120) value = 120;

//         onChange(value);

//         // UX-предупреждения
//         if (value < 10) {
//             setWarning("Please double-check your age.");
//         } else if (value > 90) {
//             setWarning("Is the age correct?");
//         } else {
//             setWarning("");
//         }
//     };

//     return (
//         <div className={styles.wrap}>
//             <h4 className={styles.title}>Age</h4>

//             <input
//                 type="number"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 className={styles.input}
//                 placeholder="Enter your age"
//                 value={localAge}
//                 onChange={handleChange}
//                 min={1}
//                 max={120}
//             />

//             {warning && (
//                 <p className={styles.warn}>{warning}</p>
//             )}
//         </div>
//     );
// };

// export default AgeInput;

import { useState, useEffect } from "react";
import styles from "./AgeInput.module.css";

const MAX_AGE = 120;
const MIN_AGE = 1;

const AgeInput = ({ age, onChange }) => {
  const [localAge, setLocalAge] = useState(age ?? "");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    setLocalAge(age ?? "");
  }, [age]);

  const handleChange = (e) => {
    const raw = e.target.value;
    // Позволяем вводить промежуточные строки (пусто, "0", "09" и т.д.)
    setLocalAge(raw);
    setWarning(""); // убираем предупреждение при печати
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

    // Жёстко приводим к диапазону при окончании ввода
    if (value < MIN_AGE) value = MIN_AGE;
    if (value > MAX_AGE) value = MAX_AGE;

    // Обновляем внешнее значение и локальное представление
    onChange(value);
    setLocalAge(String(value));

    // UX warnings — показываем только после blur
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
      <h4 className={styles.title}>Age</h4>

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