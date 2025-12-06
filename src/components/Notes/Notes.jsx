// import { useState } from "react";
// import EditNotes from "../../assets/icons/EditNotes";

// import styles from "./Notes.module.css";

// const Notes = ({ notes, setNotes }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <div className={styles.wrap}>
//       <div className={styles.heading}>
//         <h4 className={styles.title}>Notes</h4>
//         <div onClick={() => setIsEditing(true)}>
//           <EditNotes />
//         </div>
//       </div>
//       <p className={styles.text}>
//         Add notes, any extra symptoms, or how you’ve been feeling
//       </p>
//     </div>
//   );
// };

// export default Notes;

import { useState } from "react";
import EditNotes from "../../assets/icons/EditNotes";

import styles from "./Notes.module.css";

const Notes = ({ notes, setNotes }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.heading}>
        <h4 className={styles.title}>Notes</h4>
        <div onClick={() => setIsEditing(true)} className={styles.edit}>
          <EditNotes />
        </div>
      </div>

      {isEditing ? (
        <textarea
          className={styles.textarea}
          value={notes}
          maxLength={500}
          onChange={(e) => setNotes(e.target.value)}
          onBlur={() => setIsEditing(false)} // авто-закрытие
        />
      ) : (
        <p className={styles.text}>
          {notes || "Add notes, any extra symptoms, or how you’ve been feeling"}
        </p>
      )}
    </div>
  );
};

export default Notes;
