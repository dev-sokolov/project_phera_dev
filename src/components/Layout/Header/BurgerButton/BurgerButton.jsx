import styles from "./BurgerButton.module.css";

const BurgerButton = ({ isOpen, onClick }) => {
  return (
    <>
      <div className={styles.wrap} onClick={onClick}>
        <button
          className={`${styles.burger} ${isOpen ? styles.open : ""}`}
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

    </>


  );
};

export default BurgerButton;