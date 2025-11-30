import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import HomePageQr from "../pages/HomePageQr/HomePageQr";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import Steps from "../pages/Steps/Steps";
import Steps1 from "../pages/Steps/Steps1/Steps1";
import Steps2 from "../pages/Steps/Steps2/Steps2";
import Steps3 from "../pages/Steps/Steps3/Steps3";
import Steps4 from "../pages/Steps/Steps4/Steps4";
import Steps5 from "../pages/Steps/Steps5/Steps5";
import CameraAccess from "../pages/CameraAccess/CameraAccess";
import CameraCapture from "../pages/CameraCapture/CameraCapture";
import CameraProcessingPage from "../pages/CameraProcessingPage/CameraProcessingPage";
import ResultWithoutDetailsPage from "../pages/ResultWithoutDetailsPage/ResultWithoutDetailsPage";

import "../shared/styles/style.css";

function App() {
  const navigate = useNavigate();
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
      <Route path="/camera-capture" element={<CameraCapture
        onExit={() => navigate("/camera-access")}
        onCapture={(result) => navigate("/result", { state: result })}
      />
      }
      />
      <Route path="/camera-processing" element={<CameraProcessingPage />} />
      <Route path="/result-without-details" element={<ResultWithoutDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
