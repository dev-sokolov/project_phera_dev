import { useState } from "react";
import Header from "./Header/Header";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const AppLayout = ({ headerVariant = "guest", children }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Header
                variant={headerVariant}
                isMenuOpen={isMenuOpen}
                onBurgerClick={() => setMenuOpen(true)}
            />

            {headerVariant === "auth" && (
                <BurgerMenu
                    isMenuOpen={isMenuOpen}
                    onClose={() => setMenuOpen(false)}
                />
            )}

            {children}
        </>
    );
};

export default AppLayout;