import styles from "./Container.module.css"

// const Container = ({children}) => {
//     return <div className={styles.containerStyle}>{children}</div>
// }

// export default Container;


const Container = ({ children, fullWidth = false }) => {
    return (
        <div
            className={`${styles.containerStyle} ${fullWidth ? styles.fullWidth : ""}`}
        >
            {children}
        </div>
    );
};
export default Container;


