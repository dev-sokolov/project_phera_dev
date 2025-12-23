// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useState, useEffect } from "react";

// import Button from "../../components/Button/Button";
// import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
// import Container from "../../components/Container/Container";
// import Eye from "../../assets/icons/Eye";
// import { registrPasswordApi } from "../../shared/api/auth-api";

// import styles from "./RegistrationStepPassword.module.css";

// const RegistrationStepPassword = () => {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [serverError, setServerError] = useState("");

//     const { register, handleSubmit, watch, formState: { errors }, clearErrors } = useForm({
//         defaultValues: {
//             password: "",
//             confirmPassword: ""
//         },
//         mode: "onBlur"
//     });

//     const password = watch("password");
//     const confirmPassword = watch("confirmPassword");

//     const showPasswordError = errors.password && password.length < 6;
//     const showConfirmError = errors.confirmPassword && confirmPassword !== password;

//     const isFormValid =
//         password.length >= 6 &&
//         confirmPassword.length >= 6 &&
//         password === confirmPassword;

//     const onSubmit = async ({ password }) => {      // temporary Удалить!!!!!!!!!!!!
//         try {
//             setServerError("");

//             await new Promise(res => setTimeout(res, 500)); // imitation of request
//             const token = "fake-token";

//             localStorage.setItem("reg_token", token);
//             navigate("/signup", { replace: true });
//             setTimeout(() => {
//                 navigate("/home/complete");
//             }, 0);
//         } catch (e) {
//             setServerError("Server error");
//         }
//     };

//     const goBack = () => {
//         navigate("/registration/email", { replace: true });
//     };

//     useEffect(() => {
//         if (!location.state?.from) return;

//         sessionStorage.setItem("registration_from", location.state.from);
//     }, [location.state?.from]);

//     return (
//         <div className={styles.content}>
//             <Container>
//                 <div className={styles.containerInner}>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className={styles.crumbs}>
//                             <div className={styles.itemColored}></div>
//                             <div className={styles.itemColored}></div>
//                             <div className={styles.itemColored}></div>
//                         </div>

//                         <div className={styles.textBlock}>
//                             <h1 className={styles.heading}>Create a password</h1>
//                             <p className={styles.text}>
//                                 Create a secure password to protect your account.
//                                 You’ll use it to log in next time.
//                             </p>
//                         </div>

//                         <div className={styles.dataSent}>
//                             <div className={styles.itemInput}>
//                                 <label htmlFor="password" className={styles.label}>Password</label>

//                                 <div className={styles.inputWrapper}>
//                                     <input
//                                         // {...register("password", {
//                                         //     required: "Create your password",
//                                         //     minLength: { value: 6, message: "Min 6 characters" },
//                                         //     onChange: (e) => {
//                                         //         if (e.target.value.length >= 6) clearErrors("password");
//                                         //     }
//                                         // })}

//                                         placeholder="Create your password"
//                                         id="password"
//                                         type={showPassword ? "text" : "password"}
//                                         className={styles.input}
//                                         aria-invalid={!!showPasswordError}
//                                     />
//                                     <Eye className={styles.icon} onClick={() => setShowPassword(prev => !prev)} />
//                                 </div>
//                                 {/* {showPasswordError && <p className={styles.error}>{errors.password.message}</p>} */}

//                                 <div className={styles.infoBlock}>
//                                     <div className={`${styles.infoText} ${styles.success}`}>Use at least 8 characters.</div>
//                                     <div className={`${styles.infoText} ${styles.success}`}>Upper and lowercase characters</div>
//                                     <div className={`${styles.infoText} ${styles.error}`}>At least one symbol (#$&)</div>
//                                 </div>
//                             </div>

//                             <div className={styles.itemInput}>
//                                 <label htmlFor="confirmPassword" className={styles.label}>Confirm your password</label>

//                                 <div className={styles.inputWrapper}>
//                                     <input
//                                         {...register("confirmPassword", {
//                                             required: "Confirm your password",
//                                             validate: value =>
//                                                 value === watch("password") || "Passwords do not match",
//                                             onChange: () => {
//                                                 if (watch("confirmPassword") === watch("password")) clearErrors("confirmPassword");
//                                             }
//                                         })}
//                                         placeholder="Confirm your password"
//                                         id="confirmPassword"
//                                         type={showConfirmPassword ? "text" : "password"}
//                                         className={styles.input}
//                                         aria-invalid={!!showConfirmError}
//                                     />
//                                     <Eye className={styles.icon} onClick={() => setShowConfirmPassword(prev => !prev)} />
//                                 </div>
//                                 {showConfirmError && <p className={styles.error}>{errors.confirmPassword.message}</p>}
//                             </div>
//                         </div>

//                         {serverError && <p className={styles.error}>{serverError}</p>}

//                         <div className={styles.bottomBlock}>
//                             <Button
//                                 type="submit"
//                                 className={!isFormValid ? styles.btnDisabled : ""}
//                                 disabled={!isFormValid}
//                             >
//                                 Confirm
//                             </Button>
//                             <ButtonReverse onClick={goBack}>Go back</ButtonReverse>
//                         </div>
//                     </form>
//                 </div>
//             </Container>
//         </div>
//     );
// };

// export default RegistrationStepPassword;


// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useState } from "react";

// import Button from "../../components/Button/Button";
// import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
// import Container from "../../components/Container/Container";
// import Eye from "../../assets/icons/Eye";

// import styles from "./RegistrationStepPassword.module.css";

// const RegistrationStepPassword = () => {
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [serverError, setServerError] = useState("");

//     const { register, handleSubmit, watch, formState: { errors }, clearErrors } = useForm({
//         defaultValues: {
//             password: "",
//             confirmPassword: ""
//         },
//         mode: "onChange"
//     });

//     const password = watch("password");
//     const confirmPassword = watch("confirmPassword");

//     // Динамическая проверка требований
//     const checks = {
//         minLength: password.length >= 8,
//         hasUppercase: /[A-Z]/.test(password),
//         hasLowercase: /[a-z]/.test(password),
//         hasSymbol: /[#\$&]/.test(password),
//         passwordsMatch: password === confirmPassword && confirmPassword.length > 0
//     };

//     const isFormValid = Object.values(checks).every(Boolean);

//     const onSubmit = async ({ password }) => {
//         try {
//             setServerError("");

//             await new Promise(res => setTimeout(res, 500)); // имитация запроса
//             const token = "fake-token";

//             localStorage.setItem("reg_token", token);
//             navigate("/signup", { replace: true });
//             setTimeout(() => {
//                 navigate("/home/complete");
//             }, 0);
//         } catch (e) {
//             setServerError("Server error");
//         }
//     };

//     const goBack = () => {
//         navigate("/registration/email", { replace: true });
//     };

//     return (
//         <div className={styles.content}>
//             <Container>
//                 <div className={styles.containerInner}>
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className={styles.crumbs}>
//                             <div className={styles.itemColored}></div>
//                             <div className={styles.itemColored}></div>
//                             <div className={styles.itemColored}></div>
//                         </div>

//                         <div className={styles.textBlock}>
//                             <h1 className={styles.heading}>Create a password</h1>
//                             <p className={styles.text}>
//                                 Create a secure password to protect your account. You’ll use it to log in next time.
//                             </p>
//                         </div>

//                         <div className={styles.dataSent}>
//                             <div className={styles.itemInput}>
//                                 <label htmlFor="password" className={styles.label}>Password</label>
//                                 <div className={styles.inputWrapper}>
//                                     <input
//                                         {...register("password", {
//                                             required: "Create your password",
//                                             onChange: () => clearErrors("password")
//                                         })}
//                                         placeholder="Create your password"
//                                         id="password"
//                                         type={showPassword ? "text" : "password"}
//                                         className={styles.input}
//                                         aria-invalid={!!errors.password}
//                                     />
//                                     <Eye className={styles.icon} onClick={() => setShowPassword(prev => !prev)} />
//                                 </div>

//                                 <label htmlFor="confirmPassword" className={styles.label}>Confirm your password</label>
//                                 <div className={styles.inputWrapper}>
//                                     <input
//                                         {...register("confirmPassword", {
//                                             required: "Confirm your password",
//                                             onChange: () => clearErrors("confirmPassword")
//                                         })}
//                                         placeholder="Confirm your password"
//                                         id="confirmPassword"
//                                         type={showConfirmPassword ? "text" : "password"}
//                                         className={styles.input}
//                                         aria-invalid={!!errors.confirmPassword}
//                                     />
//                                     <Eye className={styles.icon} onClick={() => setShowConfirmPassword(prev => !prev)} />
//                                 </div>

//                                 {/* Info block с динамической подсветкой */}
//                                 <div className={styles.infoBlock}>
//                                     <div className={`${styles.infoText} ${checks.minLength ? styles.success : styles.error}`}>
//                                         {checks.minLength ? "✅" : "❌"} Use at least 8 characters
//                                     </div>
//                                     <div className={`${styles.infoText} ${checks.hasUppercase ? styles.success : styles.error}`}>
//                                         {checks.hasUppercase ? "✅" : "❌"} At least one uppercase letter
//                                     </div>
//                                     <div className={`${styles.infoText} ${checks.hasLowercase ? styles.success : styles.error}`}>
//                                         {checks.hasLowercase ? "✅" : "❌"} At least one lowercase letter
//                                     </div>
//                                     <div className={`${styles.infoText} ${checks.hasSymbol ? styles.success : styles.error}`}>
//                                         {checks.hasSymbol ? "✅" : "❌"} At least one symbol (# $ &)
//                                     </div>
//                                     <div className={`${styles.infoText} ${checks.passwordsMatch ? styles.success : styles.error}`}>
//                                         {checks.passwordsMatch ? "✅" : "❌"} Passwords match
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {serverError && <p className={styles.error}>{serverError}</p>}

//                         <div className={styles.bottomBlock}>
//                             <Button type="submit" className={!isFormValid ? styles.btnDisabled : ""} disabled={!isFormValid}>
//                                 Confirm
//                             </Button>
//                             <ButtonReverse onClick={goBack}>Go back</ButtonReverse>
//                         </div>
//                     </form>
//                 </div>
//             </Container>
//         </div>
//     );
// };

// export default RegistrationStepPassword;

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import Eye from "../../assets/icons/Eye";

import styles from "./RegistrationStepPassword.module.css";

const RegistrationStepPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const { register, handleSubmit, watch, formState: { errors }, clearErrors, trigger } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
        mode: "onChange"
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false
    });

    // Объединяем проверку на верхний и нижний регистр
    const checks = {
        minLength: password.length >= 8,
        hasUpperAndLower: /[A-Z]/.test(password) && /[a-z]/.test(password),
        hasSymbol: /[#\$&]/.test(password),
        passwordsMatch: password === confirmPassword && confirmPassword.length > 0
    };

    const isFormValid = Object.values(checks).every(Boolean);

    const onSubmit = async ({ password }) => {
        try {
            setServerError("");

            await new Promise(res => setTimeout(res, 500)); // имитация запроса
            const token = "fake-token";

            localStorage.setItem("reg_token", token);
            navigate("/signup", { replace: true });
            setTimeout(() => {
                navigate("/home/complete");
            }, 0);
        } catch (e) {
            setServerError("Server error");
        }
    };

    const goBack = () => {
        navigate("/confirm-email", { replace: true });
    };

    return (
        <div className={styles.content}>
            <Container>
                <div className={styles.containerInner}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.crumbs}>
                            <div className={styles.itemColored}></div>
                            <div className={styles.itemColored}></div>
                            <div className={styles.itemColored}></div>
                        </div>

                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Create a password</h1>
                            <p className={styles.text}>
                                Create a secure password to protect your account. You’ll use it to log in next time.
                            </p>
                        </div>

                        <div className={styles.dataSent}>
                            <div className={styles.itemInput}>
                                <label htmlFor="password" className={styles.label}>Password</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("password", {
                                            required: "Create your password",
                                            onChange: () => {
                                                clearErrors("password");
                                            },
                                            onBlur: () => setTouched(prev => ({ ...prev, password: true }))
                                        })}
                                        placeholder="Create your password"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className={styles.input}
                                        aria-invalid={!!errors.password}
                                    />
                                    <Eye className={styles.icon} onClick={() => setShowPassword(prev => !prev)} />
                                </div>

                                {/* Info block с классами infoText + error/access */}
                                <div className={styles.infoBlock}>
                                    <div className={`${styles.infoText} ${touched.password ? (checks.minLength ? styles.access : styles.error) : ""}`}>
                                        Use at least 8 characters
                                    </div>
                                    <div className={`${styles.infoText} ${touched.password ? (checks.hasUpperAndLower ? styles.access : styles.error) : ""}`}>
                                        Contains uppercase and lowercase letters
                                    </div>
                                    <div className={`${styles.infoText} ${touched.password ? (checks.hasSymbol ? styles.access : styles.error) : ""}`}>
                                        At least one symbol (# $ &)
                                    </div>
                                    <div className={`${styles.infoText} ${touched.confirmPassword ? (checks.passwordsMatch ? styles.access : styles.error) : ""}`}>
                                        Passwords match
                                    </div>
                                </div>

                                <label htmlFor="confirmPassword" className={styles.label}>Confirm your password</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("confirmPassword", {
                                            required: "Confirm your password",
                                            onChange: () => clearErrors("confirmPassword"),
                                            onBlur: () => setTouched(prev => ({ ...prev, confirmPassword: true }))
                                        })}
                                        placeholder="Confirm your password"
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={styles.input}
                                        aria-invalid={!!errors.confirmPassword}
                                    />
                                    <Eye className={styles.icon} onClick={() => setShowConfirmPassword(prev => !prev)} />
                                </div>

                                {/* Info block с классами infoText + error/access */}
                                {/* <div className={styles.infoBlock}>
                                    <div className={`${styles.infoText} ${touched.password ? (checks.minLength ? styles.access : styles.error) : ""}`}>
                                        Use at least 8 characters
                                    </div>
                                    <div className={`${styles.infoText} ${touched.password ? (checks.hasUpperAndLower ? styles.access : styles.error) : ""}`}>
                                        Contains uppercase and lowercase letters
                                    </div>
                                    <div className={`${styles.infoText} ${touched.password ? (checks.hasSymbol ? styles.access : styles.error) : ""}`}>
                                        At least one symbol (# $ &)
                                    </div>
                                    <div className={`${styles.infoText} ${touched.confirmPassword ? (checks.passwordsMatch ? styles.access : styles.error) : ""}`}>
                                        Passwords match
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {serverError && <p className={styles.error}>{serverError}</p>}

                        <div className={styles.bottomBlock}>
                            <Button type="submit" className={!isFormValid ? styles.btnDisabled : ""} disabled={!isFormValid}>
                                Confirm
                            </Button>
                            <ButtonReverse onClick={goBack}>Go back</ButtonReverse>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default RegistrationStepPassword;

