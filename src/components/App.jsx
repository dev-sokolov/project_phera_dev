import { Routes, Route } from "react-router-dom";

import HomePageQr from "../pages/HomePageQr/HomePageQr";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Steps from "../pages/Steps/Steps";
import Steps1 from "../pages/Steps1/Steps1";
import Steps2 from "../pages/Steps2/Steps2";
import Steps3 from "../pages/Steps3/Steps3";
import Steps4 from "../pages/Steps4/Steps4";
import Steps5 from "../pages/Steps5/Steps5";
import CameraAccess from "../pages/CameraAccess/CameraAccess";

import "../shared/styles/style.css";

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePageQr />} />
      <Route path="/steps" element={<Steps />} />
      <Route path="/steps/1" element={<Steps1 />} />
      <Route path="/steps/2" element={<Steps2 />} />
      <Route path="/steps/3" element={<Steps3 />} />
      <Route path="/steps/4" element={<Steps4 />} />
      <Route path="/steps/5" element={<Steps5 />} />
      <Route path="/camera-access" element={<CameraAccess />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
