import { useState, useRef, useEffect } from "react";
import EditNotes from "../../assets/icons/EditNotes";

import styles from "./Notes.module.css";

const Notes = ({ notes, setNotes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [notes]);

  // click out
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsEditing(false);
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
    <div className={styles.wrap}>
      <div className={styles.heading}>
        <h4 className={styles.title}>Notes</h4>
        <div onClick={() => setIsEditing(true)} className={styles.edit}>
          <EditNotes />
        </div>
      </div>

      {isEditing ? (
        <textarea
          ref={textareaRef}
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
