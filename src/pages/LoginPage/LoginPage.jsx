import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import Logo from "../../assets/Logo";
import Eye from "../../assets/icons/Eye";
import { loginApi } from "../../shared/api/auth-api";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const { register, handleSubmit, watch, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onBlur"
    });

    const username = watch("username");
    const password = watch("password");

    const isFormValid = username.length >= 2 && password.length >= 6;

    // const onSubmit = async ({ username, password }) => {  //!!!!!!!! реальный  !!!!!!!!!!
    //     try {
    //         setServerError("");

    //         // 🔹 запрос на backend
    //         const res = await loginApi({ username, password });

    //         // 🔹 backend возвращает токен
    //         const token = res?.token;
    //         if (!token) {
    //             setServerError("Unexpected server response");
    //             return;
    //         }

    //         // 🔹 сохраняем токен
    //         localStorage.setItem("token", token);

    //         // 🔹 переход на домашнюю страницу
    //         navigate("/home");

    //     } catch (e) {
    //         setServerError(e?.response?.data?.message || "Invalid username or password");
    //     }
    // };

    const onSubmit = async ({ password }) => {      // временный потом Удалить!!!!!!!!!!!!
        try {
            setServerError("");

            // 🔹 симуляция backend
            await new Promise(res => setTimeout(res, 500)); // имитация запроса
            const token = "fake-token";

            // 🔹 сохраняем токен
            localStorage.setItem("token", token);

            navigate("/home/complete");
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
                                <label htmlFor="username" className={styles.label}>Username</label>

                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("username", {
                                            required: "Enter your username",
                                            minLength: { value: 2, message: "Min 2 characters" },
                                            onChange: (e) => {
                                                if (e.target.value.length >= 2) clearErrors("username");
                                            }
                                        })}
                                        placeholder="Enter your username"
                                        id="username"
                                        type="text"
                                        className={styles.input}
                                    />
                                    {errors.username && (
                                        <p className={styles.error}>{errors.username.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.itemInput}>
                                <label htmlFor="password" className={styles.label}>Password</label>

                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("password", {
                                            required: "Enter your password",
                                            minLength: { value: 6, message: "Min 6 characters" },
                                            onChange: (e) => {
                                                if (e.target.value.length >= 6) clearErrors("password");
                                            }
                                        })}
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className={styles.input}
                                    />
                                    <Eye className={styles.icon} onClick={() => setShowPassword(s => !s)} />
                                </div>
                                {errors.password && (
                                    <p className={styles.error}>{errors.password.message}</p>
                                )}
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
                    <div className={styles.wrapinfo}>
                        <p className={styles.info}>New to pHera?<Link to="/registration/username" className={styles.signin}>SIGN UP</Link></p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LoginPage;

