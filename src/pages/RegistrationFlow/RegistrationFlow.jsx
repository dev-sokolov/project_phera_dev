// import { useState } from "react";
// import RegistrationStepPassword from "./RegistrationStepPassword/RegistrationStepPassword";
// import RegistrationStepName from "./RegistrationStepName/RegistrationStepName";

// const RegistrationFlow = () => {
//     const [step, setStep] = useState(1);

//     const [data, setData] = useState({
//         password: "",
//         name: "",
//     });

//     const next = () => setStep((s) => s + 1);
//     // const back = () => setStep((s) => s - 1);
//     const back = () => setStep((s) => Math.max(s - 1, 1));

//     const updateData = (fields) => {
//         setData((prev) => ({ ...prev, ...fields }));
//     };

//     const handleSubmitToBackend = async () => {
//         console.log("Sending to backend:", data);

//         // await fetch("/api/register", {
//         //     method: "POST",
//         //     headers: { "Content-Type": "application/json" },
//         //     body: JSON.stringify(data),
//         // });
//     };

//     return (
//         <>
//             {step === 1 && (
//                 <RegistrationStepPassword
//                     defaultValue={data.password}
//                     updateData={updateData}
//                     next={next}
//                     back={back}
//                 />
//             )}
//             {step === 2 && (
//                 <RegistrationStepName
//                     defaultValue={data.name}
//                     updateData={updateData}
//                     back={back}
//                     finish={handleSubmitToBackend}
//                 />
//             )}
//         </>
//     );
// };

// export default RegistrationFlow;

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import RegistrationStepPassword from "./RegistrationStepPassword/RegistrationStepPassword";
import RegistrationStepName from "./RegistrationStepName/RegistrationStepName";

const RegistrationFlow = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        password: "",
        name: "",
    });

    const updateData = (fields) => {
        setData((prev) => ({ ...prev, ...fields }));
    };

    const next = (path) => navigate(path);
    const back = (path) => navigate(path);

    const finish = () => {
        console.log("Sending to backend:", data);
    };

    return (
        <Routes>
            {/* <Route 
                path="password"
                element={
                    <RegistrationStepPassword
                        defaultValue={data.password}
                        updateData={updateData}
                        // next={() => next("/signup/name")}
                        next={() => next("name")}
                    />
                }
            />

            <Route 
                path="name"
                element={
                    <RegistrationStepName
                        defaultValue={data.name}
                        updateData={updateData}
                        back={() => back("/signup/password")}
                        finish={finish}
                    />
                }
            /> */}

            <Route
                path="password"
                element={
                    <RegistrationStepPassword
                        defaultValue={data.password}
                        updateData={updateData}
                        next={() => next("name")}   // OK
                    />
                }
            />

            <Route
                path="name"
                element={
                    <RegistrationStepName
                        defaultValue={data.name}
                        updateData={updateData}
                        back={() => back("password")}   // поменяли
                        finish={finish}
                    />
                }
            />
        </Routes>
    );
};

export default RegistrationFlow;