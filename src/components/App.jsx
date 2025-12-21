import { Routes, Route, useNavigate } from "react-router-dom";
import AppLayout from "./Layout/AppLayout";

import ScrollToTop from "./ScrollToTop/ScrollToTop";
import HomePageQr from "../pages/HomePageQr/HomePageQr";
import HowItWorksPage from "../pages/HowItWorksPage/HowItWorksPage";
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
import AddDetailsPage from "../pages/AddDetailsPage/AddDetailsPage";
import ResultWithDetailsPageNormal from "../pages/ResultWithDetailsPageNormal/ResultWithDetailsPageNormal";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import StartPage from "../pages/StartPage/StartPage";
import RegistrationStepPassword from "../pages/RegistrationStepPassword/RegistrationStepPassword";
import RegistrationStepName from "../pages/RegistrationStepName/RegistrationStepName";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomeCompletePage from "../pages/HomeCompletePage/HomeCompletePage";
import HomeTestedPage from "../pages/HomeTestedPage/HomeTestedPage";
import HomeStartPage from "../pages/HomeStartPage/HomeStartPage";
import TestsHistoryPage from "../pages/TestsHistoryPage/TestsHistoryPage";
import TestsHistoryEmptyPage from "../pages/TestsHistoryEmptyPage/TestsHistoryEmptyPage";
import HealthLibrary from "../pages/HealthLibrary/HealthLibrary";
import SubscriptionPage from "../pages/SubscriptionPage/SubscriptionPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import TrendPreviewPage from "../pages/TrendPreviewPage/TrendPreviewPage";

import "../shared/styles/style.css";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<AppLayout><HomePageQr /></AppLayout>} />
        <Route path="/how-it-works" element={<AppLayout><HowItWorksPage /></AppLayout>} />
        <Route path="/steps" element={<AppLayout><Steps /></AppLayout>} />
        <Route path="/steps/1" element={<AppLayout><Steps1 /></AppLayout>} />
        <Route path="/steps/2" element={<AppLayout><Steps2 /></AppLayout>} />
        <Route path="/steps/3" element={<AppLayout><Steps3 /></AppLayout>} />
        <Route path="/steps/4" element={<AppLayout><Steps4 /></AppLayout>} />
        <Route path="/steps/5" element={<AppLayout><Steps5 /></AppLayout>} />
        <Route path="/camera-access" element={<AppLayout><CameraAccess /></AppLayout>} />
        <Route path="/camera-capture" element={
          <AppLayout showBack onBack={() => navigate("/camera-access", { replace: true })}>
            <CameraCapture onExit={() => navigate("/camera-access", { replace: true })} onCapture={(result) => navigate("/camera-processing", { state: result, replace: true })} />
          </AppLayout>} />
        <Route path="/camera-processing" element={<AppLayout><CameraProcessingPage /></AppLayout>} />
        <Route path="/result-without-details" element={<AppLayout><ResultWithoutDetailsPage /></AppLayout>} />
        <Route path="/add-details" element={<AppLayout><AddDetailsPage /></AppLayout>} />
        <Route path="/result-with-details-normal" element={<AppLayout><ResultWithDetailsPageNormal /></AppLayout>} />
        <Route path="/signup" element={<AppLayout showBack onBack={() => navigate("/result-with-details-normal")}><SignUpPage /></AppLayout>} />
        <Route path="/start" element={<AppLayout showBack onBack={() => navigate("https://phera.digital/")}><StartPage /></AppLayout>} />
        <Route path="/registration/username" element={<AppLayout><RegistrationStepName /></AppLayout>} />
        <Route path="/registration/password" element={<AppLayout><RegistrationStepPassword /></AppLayout>} />
        <Route path="/login" element={<AppLayout><LoginPage /></AppLayout>} />
        <Route path="/home/complete" element={<AppLayout headerVariant="auth"><HomeCompletePage /></AppLayout>} />
        <Route path="/home/tested" element={<AppLayout headerVariant="auth"><HomeTestedPage /></AppLayout>} />
        <Route path="/home/start" element={<AppLayout headerVariant="auth"><HomeStartPage /></AppLayout>} />
        <Route path="/test-history" element={<AppLayout headerVariant="auth"><TestsHistoryPage /></AppLayout>} />
        <Route path="/test-history-empty" element={<AppLayout headerVariant="auth"><TestsHistoryEmptyPage /></AppLayout>} />
        <Route path="/health-library" element={<AppLayout headerVariant="auth"><HealthLibrary /></AppLayout>} />
        <Route path="/profile" element={<AppLayout headerVariant="auth"><ProfilePage /></AppLayout>} />
        <Route path="/trend-preview" element={<AppLayout headerVariant="auth"><TrendPreviewPage /></AppLayout>} />
        <Route path="/subscription" element={<AppLayout showBack onBack={() => navigate("/health-library")}><SubscriptionPage /></AppLayout>} />
        <Route path="/payment" element={<AppLayout headerVariant="auth"><PaymentPage /></AppLayout>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App


// ---------------------------------------------------------------------------------------

// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import AppLayout from "./Layout/AppLayout";

// import ScrollToTop from "./ScrollToTop/ScrollToTop";
// import HomePageQr from "../pages/HomePageQr/HomePageQr";
// import HowItWorksPage from "../pages/HowItWorksPage/HowItWorksPage";
// import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
// import Steps from "../pages/Steps/Steps";
// import Steps1 from "../pages/Steps/Steps1/Steps1";
// import Steps2 from "../pages/Steps/Steps2/Steps2";
// import Steps3 from "../pages/Steps/Steps3/Steps3";
// import Steps4 from "../pages/Steps/Steps4/Steps4";
// import Steps5 from "../pages/Steps/Steps5/Steps5";
// import CameraAccess from "../pages/CameraAccess/CameraAccess";
// import CameraCapture from "../pages/CameraCapture/CameraCapture";
// import CameraProcessingPage from "../pages/CameraProcessingPage/CameraProcessingPage";
// import ResultWithoutDetailsPage from "../pages/ResultWithoutDetailsPage/ResultWithoutDetailsPage";
// import AddDetailsPage from "../pages/AddDetailsPage/AddDetailsPage";
// import ResultWithDetailsPageNormal from "../pages/ResultWithDetailsPageNormal/ResultWithDetailsPageNormal";
// import SignUpPage from "../pages/SignUpPage/SignUpPage";
// import StartPage from "../pages/StartPage/StartPage";
// import RegistrationStepPassword from "../pages/RegistrationStepPassword/RegistrationStepPassword";
// import RegistrationStepName from "../pages/RegistrationStepName/RegistrationStepName";
// import LoginPage from "../pages/LoginPage/LoginPage";
// import HomeCompletePage from "../pages/HomeCompletePage/HomeCompletePage";
// import HomeTestedPage from "../pages/HomeTestedPage/HomeTestedPage";
// import HomeStartPage from "../pages/HomeStartPage/HomeStartPage";
// import TestsHistoryPage from "../pages/TestsHistoryPage/TestsHistoryPage";
// import TestsHistoryEmptyPage from "../pages/TestsHistoryEmptyPage/TestsHistoryEmptyPage";
// import HealthLibrary from "../pages/HealthLibrary/HealthLibrary";
// import SubscriptionPage from "../pages/SubscriptionPage/SubscriptionPage";
// import PaymentPage from "../pages/PaymentPage/PaymentPage";
// import ProfilePage from "../pages/ProfilePage/ProfilePage";

// import "../shared/styles/style.css";

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   return (
//     <>
//       <ScrollToTop />
//       <Routes location={location} key={location.pathname}>
//         <Route path="/" element={<AppLayout><HomePageQr /></AppLayout>} />
//         <Route path="/how-it-works" element={<AppLayout><HowItWorksPage /></AppLayout>} />
//         <Route path="/steps" element={<AppLayout><Steps /></AppLayout>} />
//         <Route path="/steps/1" element={<AppLayout><Steps1 /></AppLayout>} />
//         <Route path="/steps/2" element={<AppLayout><Steps2 /></AppLayout>} />
//         <Route path="/steps/3" element={<AppLayout><Steps3 /></AppLayout>} />
//         <Route path="/steps/4" element={<AppLayout><Steps4 /></AppLayout>} />
//         <Route path="/steps/5" element={<AppLayout><Steps5 /></AppLayout>} />
//         <Route path="/camera-access" element={<AppLayout><CameraAccess /></AppLayout>} />
//         <Route path="/camera-capture" element={<CameraCapture
//           onExit={() => navigate("/camera-access")}
//           onCapture={(result) => navigate("/result", { state: result })}
//         />}
//         />
//         <Route path="/camera-processing" element={<AppLayout><CameraProcessingPage /></AppLayout>} />
//         <Route path="/result-without-details" element={<AppLayout><ResultWithoutDetailsPage /></AppLayout>} />
//         <Route path="/add-details" element={<AppLayout><AddDetailsPage /></AppLayout>} />
//         <Route path="/result-with-details-normal" element={<AppLayout><ResultWithDetailsPageNormal /></AppLayout>} />
//         <Route path="/signup" element={<AppLayout showBack onBack={() => navigate("/result-with-details-normal")}><SignUpPage /></AppLayout>} />
//         <Route path="/start" element={<AppLayout showBack onBack={() => navigate("https://phera.digital/")}><StartPage /></AppLayout>} />
//         <Route path="/registration/username" element={<AppLayout><RegistrationStepName /></AppLayout>} />
//         <Route path="/registration/password" element={<AppLayout><RegistrationStepPassword /></AppLayout>} />
//         <Route path="/login" element={<AppLayout><LoginPage /></AppLayout>} />
//         <Route path="/home/complete" element={<AppLayout headerVariant="auth"><HomeCompletePage /></AppLayout>} />
//         <Route path="/home/tested" element={<AppLayout headerVariant="auth"><HomeTestedPage /></AppLayout>} />
//         <Route path="/home/start" element={<AppLayout headerVariant="auth"><HomeStartPage /></AppLayout>} />
//         <Route path="/test-history" element={<AppLayout headerVariant="auth"><TestsHistoryPage /></AppLayout>} />
//         <Route path="/test-history-empty" element={<AppLayout headerVariant="auth"><TestsHistoryEmptyPage /></AppLayout>} />
//         <Route path="/health-library" element={<AppLayout headerVariant="auth"><HealthLibrary /></AppLayout>} />
//         <Route path="/profile" element={<AppLayout headerVariant="auth"><ProfilePage /></AppLayout>} />
//         <Route path="/subscription" element={<AppLayout showBack onBack={() => navigate("/health-library")}><SubscriptionPage /></AppLayout>} />
//         <Route path="/payment" element={<AppLayout headerVariant="auth"><PaymentPage /></AppLayout>} />

//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </>
//   )
// }

// export default App



