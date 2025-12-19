import { motion } from "framer-motion";
import styles from "./BottomBlock.module.css";

// const BottomBlock = ({ children }) => {
//     return (
//         <>
//             <div className={styles.bottomBlock}>
//                 <div className={styles.bottomBlockInner}>
//                     {children}
//                 </div>
//             </div>
//         </>
//     )
// };

// export default BottomBlock;

// const BottomBlock = ({ children }) => {
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}     // старт: чуть ниже и прозрачный
//             animate={{ opacity: 1, y: 0 }}      // финал: полностью видно
//             exit={{ opacity: 0, y: 20 }}        // при выходе: снова вниз и исчезает
//             transition={{ duration: 0.3, ease: "easeInOut" }} // плавность
//             className={styles.bottomBlock}
//         >
//             <div className={styles.bottomBlockInner}>{children}</div>
//         </motion.div>
//     );
// };

// export default BottomBlock;

const BottomBlock = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={styles.bottomBlock}
        >
            <div className={styles.bottomBlockInner}>
                {children}
            </div>
        </motion.div>
    );
};

export default BottomBlock;