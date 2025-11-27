import styles from "./Button.module.css";

const Button = ({ onClick, children }) => {
    const handleClick = (e) => {
        if (onClick) onClick(e);
        e.currentTarget.blur(); // сброс фокуса
    };

    return (
        <button type="button" onClick={handleClick} className={styles.btn}>
            {children}
        </button>
    )
};

export default Button;

// <Button onClick={handleReset}>Home</Button>