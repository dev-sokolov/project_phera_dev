// import Logo from "../../../assets/Logo";
// import BurgerButton from "./BurgerButton/BurgerButton";
// import styles from "./Header.module.css";

// const Header = ({ variant = "guest", onBurgerClick, isMenuOpen }) => {
//   return (
//     <header className={styles.header}>
//       <div className={styles.wrapLogo}>
//         {variant === "auth" && (
//           <BurgerButton
//             isOpen={isMenuOpen}
//             onClick={onBurgerClick}
//           />
//         )}

//         <div className={styles.logo}>
//           <Logo />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import Logo from "../../../assets/Logo";
import BurgerButton from "./BurgerButton/BurgerButton";
import ArrowLeft from "../../../assets/icons/ArrowLeft";
import styles from "./Header.module.css";

const Header = ({ variant = "guest", onBurgerClick, isMenuOpen, showBack = false, onBack }) => {
    return (
        <header className={styles.header}>
            <div className={styles.wrapLogo}>
                {variant === "auth" && (
                    <BurgerButton
                        isOpen={isMenuOpen}
                        onClick={onBurgerClick}
                    />
                )}

                {showBack && (
                    <button
                        className={styles.backBtn}
                        onClick={onBack}
                        aria-label="Go back"
                    >
                        <ArrowLeft />
                    </button>
                )}

                <div className={styles.logo}>
                    <Logo />
                </div>
            </div>
        </header>
    );
};

export default Header;

