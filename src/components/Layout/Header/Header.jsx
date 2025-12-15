import Logo from "../../../assets/Logo";
import BurgerButton from "./BurgerButton/BurgerButton";
import styles from "./Header.module.css";

const Header = ({ variant = "guest", onBurgerClick, isMenuOpen }) => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapLogo}>
        {variant === "auth" && (
          <BurgerButton
            isOpen={isMenuOpen}
            onClick={onBurgerClick}
          />
        )}

        <div className={styles.logo}>
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;

