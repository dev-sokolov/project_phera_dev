import { Routes, Route } from "react-router-dom";

import HomePageQr from "../pages/HomePageQr/HomePageQr";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

import "../shared/styles/style.css";

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePageQr />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
