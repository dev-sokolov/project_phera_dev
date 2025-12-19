import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import { registrNameApi } from "../../shared/api/auth-api";

import styles from "./RegistrationStepName.module.css";

const RegistrationStepName = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    // Берём значение из localStorage при инициализации формы
    const savedUsername = localStorage.getItem("reg_username") || "";

    const { register, handleSubmit, watch, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            username: savedUsername
        },
        mode: "onBlur"
    });

    const username = watch("username");
    const showUsernameError = errors.username && username.length < 2;

    const isFormValid =
        username.length >= 2;

    // const onSubmit = async ({ username }) => {  // !!!!! реальный запрос на бэкенд  !!!!!!!!!!
    //     try {
    //         setServerError("");

    // 🔹 сохраняем username в localStorage
    // localStorage.setItem("reg_username", username);

    //         // 1️⃣ запрос на backend
    //         const res = await registrNameApi(username);

    //         // 2️⃣ получаем token
    //         const token = res?.token;
    //         if (!token) {
    //             setServerError("Unexpected server response");
    //             return;
    //         }

    //         // 3️⃣ сохраняем токен для следующего шага
    //         localStorage.setItem("reg_token", token);

    //         // 4️⃣ переход на следующий шаг
    //         navigate("/signup/password");

    //     } catch (e) {
    //         setServerError(e?.response?.data?.message || "Server error");
    //     }
    // };

    const onSubmit = async ({ username }) => {      // временный потом Удалить!!!!!!!!!!!!
        try {
            setServerError("");

            // 🔹 сохраняем username в localStorage
            localStorage.setItem("reg_username", username);

            // 🔹 симуляция backend
            await new Promise(res => setTimeout(res, 500)); // имитация запроса
            const token = "fake-token";

            // 🔹 сохраняем токен
            localStorage.setItem("reg_token", token);

            // 🔹 переходим на следующий шаг
            navigate("/registration/password", { replace: true });
        } catch (e) {
            setServerError("Server error");
        }
    };

    // const goBack = () => {
    //     if (window.history.length > 2) {
    //         navigate(-1);
    //     } else {
    //         navigate("/");
    //     }
    // };

    const goBack = () => {
        const from = sessionStorage.getItem("registration_from");

        if (from) {
            navigate(from, { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    };

    // если from уже есть — не перезаписываем
    useEffect(() => {
        if (!location.state?.from) return;

        sessionStorage.setItem(
            "registration_from",
            location.state.from
        );
    }, []);

    return (
        <div className={styles.content}>
            <Container>
                <div className={styles.containerInner}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.crumbs}>
                            <div className={styles.itemColored}></div>
                            <div className={styles.item}></div>
                        </div>

                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Create your pHera account</h1>
                            <p className={styles.text}>
                                Set a unique username to create your account and save your test results securely. You’ll use it to log in next time.
                            </p>
                        </div>

                        <div className={styles.dataSent}>
                            <div className={styles.itemInput}>
                                <label htmlFor="username" className={styles.label}>Username</label>

                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("username", {
                                            required: "Create your username",
                                            minLength: { value: 2, message: "Min 2 characters" },
                                            onChange: (e) => {
                                                if (e.target.value.length >= 2) clearErrors("username");
                                            }
                                        })}
                                        placeholder="Set your username"
                                        id="username"
                                        type="text"
                                        className={styles.input}
                                        value={username}
                                        aria-invalid={!!showUsernameError}
                                    />
                                </div>
                                {showUsernameError && <p className={styles.error}>{errors.username.message}</p>}
                            </div>
                        </div>

                        {serverError && <p className={styles.error}>{serverError}</p>}

                        <div className={styles.bottomBlock}>
                            <Button
                                type="submit"
                                className={!isFormValid ? styles.btnDisabled : ""}
                                disabled={!isFormValid}
                            >
                                Confirm
                            </Button>
                            <ButtonReverse onClick={goBack}>Go back</ButtonReverse>
                        </div>
                    </form>
                    <div className={styles.wrapinfo}>
                        <p className={styles.info}>Already have an account?<Link to="/login" className={styles.login}>LOG IN</Link></p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default RegistrationStepName;

