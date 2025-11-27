import styles from "./Button.module.css";

const Button = ({ onClick, children }) => {
    //   const handleClick = (e) => {
    //     // убрать pressed-state на iOS
    //     e.currentTarget.classList.add("no-active");

    //     requestAnimationFrame(() => {
    //         e.currentTarget.classList.remove("no-active");
    //     });

    //     onClick?.(e);
    // };
    const handleClick = (e) => {
        onClick?.(e);

        // сброс активного состояния
        e.target.style.webkitTapHighlightColor = "transparent";

        // на следующем кадре убрать inline-style
        requestAnimationFrame(() => {
            e.target.style.webkitTapHighlightColor = "";
        });
    };

    return (
        <button type="button" onClick={handleClick} className={styles.btn}>
            {children}
        </button>
    )
};

export default Button;

// <Button onClick={handleReset}>Home</Button>