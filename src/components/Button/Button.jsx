import styles from "./Button.module.css";

const Button = ({ onClick, children }) => {
      const handleClick = (e) => {
        // убрать pressed-state на iOS
        e.currentTarget.classList.add("no-active");

        requestAnimationFrame(() => {
            e.currentTarget.classList.remove("no-active");
        });

        onClick?.(e);
    };

    return (
        <button type="button" onClick={handleClick} className={styles.btn}>
            {children}
        </button>
    )
};

export default Button;

// <Button onClick={handleReset}>Home</Button>