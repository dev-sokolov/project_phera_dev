// import { useState, useRef, useEffect } from "react";
// import InfoCircle from "../../assets/icons/InfoCircle";
// import ArrowDown from "../../assets/icons/ArrowDown";
// import styles from "./InfoTooltip.module.css";

// const InfoTooltip = ({ title, children, onToggle, onToggleArrow, showArrow = true }) => {
//     const [open, setOpen] = useState(false);
//     const ref = useRef(null);

//     // click out InfoCircle
//     useEffect(() => {
//         const close = (e) => {
//             if (ref.current && !ref.current.contains(e.target)) {
//                 setOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", close);
//         document.addEventListener("touchstart", close);
//         return () => {
//             document.removeEventListener("mousedown", close);
//             document.removeEventListener("touchstart", close);
//         };
//     }, []);

//     return (
//         <div className={styles.wrap} ref={ref}>
//             <div className={styles.wrapTitle} onClick={onToggle}>
//                 <h4 className={styles.title}>{title}</h4>
//                 <div
//                     className={styles.infoCircle}
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         setOpen((v) => !v);
//                     }}
//                 >
//                     <InfoCircle />
//                 </div>
//                 {showArrow && (
//                     <div
//                         className={`${styles.arrow} ${onToggleArrow ? styles.arrowOpen : ""
//                             }`}
//                     >
//                         <ArrowDown />
//                     </div>
//                 )}
//             </div>

//             {open && (
//                 <div className={styles.popover} role="tooltip">
//                     <div className={styles.content}>{children}</div>
//                     <span className={styles.popoverArrow} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default InfoTooltip;




import { useState, useRef, useEffect } from "react";
import InfoCircle from "../../assets/icons/InfoCircle";
import ArrowDown from "../../assets/icons/ArrowDown";
import styles from "./InfoTooltip.module.css";

const InfoTooltip = ({ title, children = false, onToggle, onToggleArrow, showArrow = true }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // click out InfoCircle
    useEffect(() => {
        const close = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", close);
        document.addEventListener("touchstart", close);
        return () => {
            document.removeEventListener("mousedown", close);
            document.removeEventListener("touchstart", close);
        };
    }, []);

    return (
        <div className={styles.wrap} ref={ref}>
            <div className={styles.wrapTitle} onClick={onToggle}>
                <h4 className={styles.title}>{title}</h4>
                {children && (
                    <div
                        className={styles.infoCircle}
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen((v) => !v);
                        }}
                    >
                        <InfoCircle />
                    </div>
                )}

                {showArrow && (
                    <div
                        className={`${styles.arrow} ${onToggleArrow ? styles.arrowOpen : ""
                            }`}
                    >
                        <ArrowDown />
                    </div>
                )}
            </div>

            {open && (
                <div className={styles.popover} role="tooltip">
                    <div className={styles.content}>{children}</div>
                    <span className={styles.popoverArrow} />
                </div>
            )}
        </div>
    );
};

export default InfoTooltip;