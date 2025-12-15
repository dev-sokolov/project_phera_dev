import styles from "./BurgerButton.module.css";

const BurgerButton = ({ isOpen, onClick }) => {
  return (
    <button
      className={`${styles.burger} ${isOpen ? styles.open : ""}`}
      onClick={onClick}
      aria-label="Open menu"
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default BurgerButton;