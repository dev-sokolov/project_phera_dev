import Logo from "../../assets/Logo";
import styles from "./Header.module.css"

const Header = ({ onBurgerClick, isMenuOpen }) => {
    return (
        <header className="header">
            <div className={styles.wrapLogo}>
                <button className={`${styles.burger} ${isMenuOpen ? styles.openMenu : ""}`} onClick={onBurgerClick} aria-label="Open menu">
                    {/* <button className={styles.burger} onClick={onBurgerClick} aria-label="Open menu"> */}
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={styles.logo}>
                    <Logo />
                </div>
            </div>
        </header>
    );
};

export default Header;

