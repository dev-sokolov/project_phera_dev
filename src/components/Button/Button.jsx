import styles from "./Button.module.css";

const Button = ({ onClick, children }) => {
    // const handleClick = (e) => {
    //     onClick?.(e);

    //     // сброс активного состояния
    //     e.target.style.webkitTapHighlightColor = "transparent";

    //     // на следующем кадре убрать inline-style
    //     requestAnimationFrame(() => {
    //         e.target.style.webkitTapHighlightColor = "";
    //     });
    // };

    return (
        <button type="button" onClick={onClick} className={styles.btn}>
            {children}
        </button>
    )
};

export default Button;

// <Button onClick={handleReset}>Home</Button>