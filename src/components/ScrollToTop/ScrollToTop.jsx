// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// };

// export default ScrollToTop;

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     const container = document.querySelector("[data-scroll-container]");
//     if (container) {
//       container.scrollTop = 0;
//     } else {
//       window.scrollTo(0, 0);
//     }
//   }, [pathname]);

//   return null;
// };

// export default ScrollToTop;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function findFirstScrollableAncestor(el) {
    let node = el;
    while (node && node !== document.documentElement) {
        const hasScrollable =
            node.scrollHeight > node.clientHeight &&
            getComputedStyle(node).overflowY !== "visible";
        if (hasScrollable) return node;
        node = node.parentElement;
    }
    return null;
}

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // откладываем на следующий тик — чтобы DOM уже успел отрендериться
        const t = setTimeout(() => {
            // 1) первый выбор — явный контейнер, который ты пометил в JSX
            const marked = document.querySelector("[data-scroll-container]");
            if (marked) {
                // если у помеченного есть прокрутка — прокрутить его
                const scrollable = findFirstScrollableAncestor(marked) || marked;
                try { scrollable.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); }
                catch (e) { scrollable.scrollTop = 0; }
                return;
            }

            // 2) если нет помеченного — ищем первый прокручиваемый элемент на странице
            // (экономный перебор: сначала children body, затем documentElement fallback)
            const bodyChildren = Array.from(document.body.children);
            let found = null;
            for (const ch of bodyChildren) {
                if (ch.scrollHeight > ch.clientHeight && getComputedStyle(ch).overflowY !== "visible") {
                    found = ch;
                    break;
                }
            }
            if (found) {
                try { found.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); }
                catch (e) { found.scrollTop = 0; }
                return;
            }

            // 3) запасной вариант — глобальный скролл
            const sc = document.scrollingElement || document.documentElement;
            sc.scrollTop = 0;
            window.scrollTo(0, 0);
        }, 0);

        return () => clearTimeout(t);
    }, [pathname]);

    return null;
};

export default ScrollToTop;