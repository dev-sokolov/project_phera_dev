import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../../../components/Button/Button";
import ButtonReverse from "../../../components/ButtonReverse/ButtonReverse";
import Container from "../../../components/Container/Container";
import Logo from "../../../assets/Logo";
import Eye from "../../../assets/icons/Eye";
import { registrPasswordApi } from "../../../shared/api/auth-api";

import styles from "./RegistrationStepPassword.module.css";

const RegistrationStepPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
        mode: "onChange"
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    // проверка валидности формы
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
                        <div className={styles.crumbs}>
                            <div className={styles.itemColored}></div>
                            <div className={styles.itemColored}></div>
                            <div className={styles.item}></div>
                        </div>

                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Set your password</h1>
                            <p className={styles.text}>
                                Create a secure password to protect your account.
                                You’ll use it to log in next time.
                            </p>
                        </div>

                        <div className={styles.dataSent}>
                            <div className={styles.itemInput}>
                                <label htmlFor="password" className={styles.label}>Password</label>

                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("password", {
                                            required: "Create your password",
                                            minLength: { value: 6, message: "Min 6 characters" }
                                        })}
                                        placeholder="Create your password"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className={styles.input}
                                    />
                                    <Eye className={styles.icon} onClick={() => setShowPassword(prev => !prev)} />
                                </div>
                                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                            </div>

                            <div className={styles.itemInput}>
                                <label htmlFor="confirmPassword" className={styles.label}>Confirm your password</label>

                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("confirmPassword", {
                                            required: "Confirm your password",
                                            validate: value =>
                                                value === watch("password") || "Passwords do not match"
                                        })}
                                        placeholder="Confirm your password"
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={styles.input}
                                    />
                                    <Eye className={styles.icon} onClick={() => setShowConfirmPassword(prev => !prev)} />
                                </div>
                                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        {serverError && <p className={styles.error}>{serverError}</p>}

                        <div className={styles.bottomBlock}>
                            <Button
                                type="submit"
                                className={!isFormValid ? styles.btnDisabled : ""}
                                disabled={!isFormValid}
                            >
                                Continue
                            </Button>
                            <ButtonReverse onClick={() => navigate("/signup")}>Go back</ButtonReverse>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default RegistrationStepPassword;

