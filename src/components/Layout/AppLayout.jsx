import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const AppLayout = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return (
        <>
            {/* <Header onBurgerClick={() => setMenuOpen(true)} /> */}
            {/* <Header onBurgerClick={() => setMenuOpen(prev => !prev)} isMenuOpen={isMenuOpen} />
            <BurgerMenu
                isMenuOpen={isMenuOpen}
                onClose={() => setMenuOpen(false)}
            />
            <Outlet /> */}
            <Header onBurgerClick={toggleMenu} isMenuOpen={isMenuOpen} />
            <BurgerMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
            <Outlet />
        </>
    );
};

export default AppLayout;