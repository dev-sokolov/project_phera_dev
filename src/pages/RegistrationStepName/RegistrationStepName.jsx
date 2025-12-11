import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import Logo from "../../assets/Logo";
import { registrNameApi } from "../../shared/api/auth-api";

import styles from "./RegistrationStepName.module.css";

const RegistrationStepName = () => {
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
            navigate("/signup/password");
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
                            {/* <div className={styles.itemColored}></div> */}
                            <div className={styles.item}></div>
                        </div>

                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Welcome! Create your pHera account</h1>
                            <p className={styles.text}>
                                Enter your number to receive a one-time code and securely save your results.
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
                                        placeholder="Enter your username"
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
                            <ButtonReverse onClick={() => navigate("/signup")}>Go back</ButtonReverse>
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

