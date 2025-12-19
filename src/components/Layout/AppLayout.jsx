// import { useState } from "react";
// import Header from "./Header/Header";
// import BurgerMenu from "./BurgerMenu/BurgerMenu";

// const AppLayout = ({ headerVariant = "guest", children, showBack = false, onBack }) => {
//     const [isMenuOpen, setMenuOpen] = useState(false);

//     return (
//         <>
//             <Header
//                 variant={headerVariant}
//                 isMenuOpen={isMenuOpen}
//                 onBurgerClick={() => setMenuOpen(true)}
//                 showBack={showBack}
//                 onBack={onBack}
//             />

//             {headerVariant === "auth" && (
//                 <BurgerMenu
//                     isMenuOpen={isMenuOpen}
//                     onClose={() => setMenuOpen(false)}
//                 />
//             )}

//             {children}
//         </>
//     );
// };

// export default AppLayout;



// ---------------------------------------------------------------------------------------


// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useLocation } from "react-router-dom";

// import Header from "./Header/Header";
// import BurgerMenu from "./BurgerMenu/BurgerMenu";

// // const pageVariants = {
// //     initial: {
// //         opacity: 0,
// //         y: 10,
// //     },
// //     animate: {
// //         opacity: 1,
// //         y: 0,
// //     },
// //     exit: {
// //         opacity: 0,
// //         y: -10,
// //     },
// // };

// const pageVariants = {
//     initial: { opacity: 0, y: 8 },
//     animate: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -8, },
// };

// const AppLayout = ({ headerVariant = "guest", children, showBack = false, onBack, bottom }) => {
//     const [isMenuOpen, setMenuOpen] = useState(false);

//     const location = useLocation();

//     return (
//         <>
//             <Header
//                 variant={headerVariant}
//                 isMenuOpen={isMenuOpen}
//                 onBurgerClick={() => setMenuOpen(true)}
//                 showBack={showBack}
//                 onBack={onBack}
//             />

//             {headerVariant === "auth" && (
//                 <BurgerMenu
//                     isMenuOpen={isMenuOpen}
//                     onClose={() => setMenuOpen(false)}
//                 />
//             )}

//             {/* {children} */}
//             {/* <AnimatePresence mode="wait">
//                 <motion.main
//                     key={location.pathname}
//                     variants={pageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     transition={{ duration: 0.25, ease: "easeOut" }}
//                 >
//                     {children}
//                 </motion.main>
//             </AnimatePresence> */}

//             {/* <motion.div
//                 key={location.pathname}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 variants={pageVariants}
//                 transition={{ duration: 0.3, ease: "easeInOut" }}
//                 style={{ overflowX: "hidden" }} // важно, чтобы страница не скроллилась по горизонтали
//             >
//                 {children}
//             </motion.div> */}

//             <motion.main
//                 key={location.pathname}
//                 variants={pageVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 transition={{ duration: 0.3 }}
//             >
//                 {children}
//             </motion.main>

//             {bottom && (
//                 <div >
//                     {bottom}
//                 </div>
//             )}
//         </>
//     );
// };

// export default AppLayout;


// ------------------------------------------------------------------


import { useState } from "react";
import Header from "./Header/Header";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import styles from "./AppLayout.module.css";

const AppLayout = ({
    headerVariant = "guest",
    children,
    showBack = false,
    onBack
}) => {
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

            {/* 👇 ВАЖНО: wrapper для анимации */}
            {/* <main className={styles.page}> */}
            <main key={location.pathname} className={styles.page}>
                {children}
            </main>
        </>
    );
};

export default AppLayout;
