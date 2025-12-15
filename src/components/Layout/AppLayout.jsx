import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const AppLayout = ({ headerVariant = "auth" }) => {
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

            <Outlet />
        </>
    );
};

export default AppLayout;