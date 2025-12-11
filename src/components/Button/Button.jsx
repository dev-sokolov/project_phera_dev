import styles from "./Button.module.css";

// const Button = ({ onClick, children, type = "button" }) => {
//     return (
//         <button type={type} onClick={onClick} className={styles.btn}>
//             {children}
//         </button>
//     )
// };

// export default Button;

const Button = ({ onClick, children, type = "button", className = "", disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.btn} ${className}`} // объединяем базовый класс с любым внешним
            disabled={disabled}
        >
            {children}
        </button>
    )
};

export default Button;

// <Button onClick={handleReset}>Home</Button>