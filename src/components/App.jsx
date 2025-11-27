import { Routes, Route } from "react-router-dom";

import HomePageQr from "../pages/HomePageQr/HomePageQr";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Steps from "../pages/Steps/Steps";
import CameraAccess from "../pages/CameraAccess/CameraAccess";

import "../shared/styles/style.css";

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePageQr />} />
      <Route path="/steps" element={<Steps />} />
      <Route path="/camera-access" element={<CameraAccess />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
