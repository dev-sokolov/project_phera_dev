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

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const contentEl = document.querySelector(".content"); // класс твоего контейнера
    if (contentEl) {
      contentEl.scrollTop = 0; // прокручиваем внутрь контейнера
    } else {
      window.scrollTo(0, 0); // запасной вариант
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;