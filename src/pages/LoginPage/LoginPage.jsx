import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import Logo from "../../assets/Logo";
import Eye from "../../assets/icons/Eye";
import { registrPasswordApi } from "../../shared/api/auth-api";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const { register, handleSubmit, watch, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
        mode: "onBlur"
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const showPasswordError = errors.password && password.length < 6;
    const showConfirmError = errors.confirmPassword && confirmPassword !== password;

    const isFormValid =
        password.length >= 6 &&
        confirmPassword.length >= 6 &&
        password === confirmPassword;

    // const onSubmit = async ({ password }) => {  // !!!!! реальный запрос на бэкенд  !!!!!!!!!!
    //     try {
    //         setServerError("");

    //         // 1️⃣ запрос на backend
    //         const res = await registrPasswordApi(password);

    //         // 2️⃣ получаем token
    //         const token = res?.token;
    //         if (!token) {
    //             setServerError("Unexpected server response");
    //             return;
    //         }

    //         // 3️⃣ сохраняем токен для следующего шага
    //         localStorage.setItem("reg_token", token);

    //         // 4️⃣ переход на следующий шаг
    //         navigate("/signup/name");

    //     } catch (e) {
    //         setServerError(e?.response?.data?.message || "Server error");
    //     }
    // };

    const onSubmit = async ({ password }) => {      // временный потом Удалить!!!!!!!!!!!!
        try {
            setServerError("");

            // 🔹 симуляция backend
            await new Promise(res => setTimeout(res, 500)); // имитация запроса
            const token = "fake-token";

            // 🔹 сохраняем токен
            localStorage.setItem("reg_token", token);

            // 🔹 переходим на следующий шаг
            navigate("/signup/name");
        } catch (e) {
            setServerError("Server error");
        }
    };

    return (
        <div className={styles.content}>
            <div className={styles.wrapLogo}>
                <div className={styles.logo}>
                    <Logo />
                </div>
            </div>

            <Container>
                <div className={styles.containerInner}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Welcome back! Log in to your account</h1>
                        </div>

                        <div className={styles.dataSent}>
                            <div className={styles.itemInput}>
                                <label htmlFor="password" className={styles.label}>Username</label>

                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("password", {
                                            required: "Enter your username",
                                            // minLength: { value: 6, message: "Min 6 characters" },
                                            onChange: (e) => {
                                                if (e.target.value.length >= 6) clearErrors("password");
                                            }
                                        })}
                                        placeholder="Enter your username"
                                        id="password"
                                        type="text"
                                        className={styles.input}
                                        aria-invalid={!!showPasswordError}
                                    />
                                </div>
                                {showPasswordError && <p className={styles.error}>{errors.password.message}</p>}
                            </div>

                            <div className={styles.itemInput}>
                                <label htmlFor="confirmPassword" className={styles.label}>Password</label>

                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("confirmPassword", {
                                            required: "Confirm your password",
                                            validate: value =>
                                                value === watch("password") || "Passwords do not match",
                                            onChange: () => {
                                                if (watch("confirmPassword") === watch("password")) clearErrors("confirmPassword");
                                            }
                                        })}
                                        // placeholder="Confirm your password"
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={styles.input}
                                        aria-invalid={!!showConfirmError}
                                    />
                                    <Eye className={styles.icon} onClick={() => setShowConfirmPassword(prev => !prev)} />
                                </div>
                                {showConfirmError && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        {serverError && <p className={styles.error}>{serverError}</p>}

                        <div className={styles.bottomBlock}>
                            <Button
                                type="submit"
                                className={!isFormValid ? styles.btnDisabled : ""}
                                disabled={!isFormValid}
                            >
                                Log In
                            </Button>
                            <ButtonReverse onClick={() => navigate("/signup")}>Go back</ButtonReverse>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;

