import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./Header/Header";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const pageVariants = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -10,
    },
};

const AppLayout = ({ headerVariant = "guest", children, showBack = false, onBack }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Header
                variant={headerVariant}
                isMenuOpen={isMenuOpen}
                onBurgerClick={() => setMenuOpen(true)}
                showBack={showBack}
                onBack={onBack}
            />

            {headerVariant === "auth" && (
                <BurgerMenu
                    isMenuOpen={isMenuOpen}
                    onClose={() => setMenuOpen(false)}
                />
            )}

            {/* {children} */}
            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                >
                    {children}
                </motion.main>
            </AnimatePresence>
        </>
    );
};

export default AppLayout;