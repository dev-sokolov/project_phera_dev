import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";

import styles from "./RegistrationStepEmail.module.css";

const RegistrationStepEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    // Email from localStorage
    const savedEmail = localStorage.getItem("reg_email") || "";

    const { register, handleSubmit, watch, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            email: savedEmail
        },
        mode: "onBlur"
    });

    const email = watch("email");

    // validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showEmailError = errors.email && !emailRegex.test(email);

    const isFormValid = emailRegex.test(email);

    const onSubmit = async ({ email }) => {
        try {
            setServerError("");

            localStorage.setItem("reg_email", email);

            // imitation of request
            await new Promise(res => setTimeout(res, 500));
            navigate("/confirm-email", { state: { from: location.state?.from || location.pathname } })

        } catch (e) {
            setServerError("Server error");
        }
    };

    useEffect(() => {
        if (!location.state?.from) return;

        sessionStorage.setItem("registration_from", location.state.from);
    }, [location.state?.from]);

    const goBack = () => {
        navigate("/registration/username", { replace: true });
    };

    return (
        <div className={styles.content}>
            <Container>
                <div className={styles.containerInner}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.crumbs}>
                            <div className={styles.itemColored}></div>
                            <div className={styles.itemColored}></div>
                            <div className={styles.item}></div>
                        </div>

                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Add your email</h1>
                            <p className={styles.text}>
                                Your email helps keep your account secure and ensures you don’t lose access to your test history.
                            </p>
                        </div>

                        <div className={styles.dataSent}>
                            <div className={styles.itemInput}>
                                <label htmlFor="email" className={styles.label}>Email</label>

                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("email", {
                                            required: "Enter your email",
                                            validate: value =>
                                                emailRegex.test(value) || "Invalid email format",
                                            onChange: () => {
                                                if (emailRegex.test(email)) clearErrors("email");
                                            }
                                        })}
                                        placeholder="Enter your email"
                                        id="email"
                                        type="email"
                                        className={styles.input}
                                        aria-invalid={!!showEmailError}
                                    />
                                </div>

                                {showEmailError && (
                                    <p className={styles.error}>{errors.email.message}</p>
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
                                Confirm
                            </Button>
                            <ButtonReverse onClick={goBack}>Go back</ButtonReverse>
                        </div>
                    </form>

                    <div className={styles.wrapinfo}>
                        <p className={styles.info}>
                            Already have an account?
                            <Link to="/login" className={styles.login}>LOG IN</Link>
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default RegistrationStepEmail;

