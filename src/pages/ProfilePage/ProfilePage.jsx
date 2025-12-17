import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("Helena");
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [password, setPassword] = useState("123456");
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const [showPassword, setShowPassword] = useState(false);


    const handleLogout = () => {
        // 1. очистить токен
        localStorage.removeItem("token");

        // 2. очистить состояние (если есть)
        // dispatch(logout())

        // 3. перейти на страницу логина
        navigate("/start", { replace: true });
    };

    return (
        <div className={styles.content}>
            <div className={styles.containerInner}>
                <h1 className={styles.title}>My profile</h1>

                <div className={styles.wrapper}>
                    {/* USERNAME */}
                    <div className={styles.item}>
                        <div className={styles.data}>
                            <div className={styles.heading}>Username</div>

                            {isEditingUsername ? (
                                <input
                                    className={styles.input}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={() => setIsEditingUsername(false)}
                                    autoFocus
                                />
                            ) : (
                                <div className={styles.value}>{username}</div>
                            )}
                        </div>

                        <button
                            className={styles.edit}
                            onClick={() => setIsEditingUsername(true)}
                        >
                            EDIT
                        </button>
                    </div>

                    {/* PASSWORD */}
                    <div className={styles.item}>
                        <div className={styles.data}>
                            <div className={styles.heading}>Password</div>

                            {isEditingPassword ? (
                                // <input
                                //     className={styles.input}
                                //     // type="text"
                                //     type={showPassword ? "text" : "password"}
                                //     value={password}
                                //     onChange={(e) => setPassword(e.target.value)}
                                //     onBlur={() => setIsEditingPassword(false)}
                                //     autoFocus
                                // />
                                <input
                                    className={styles.input}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setIsEditingPassword(false);
                                            setShowPassword(false);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <div className={styles.value}>{"•".repeat(password.length)}</div>
                            )}
                        </div>

                        {/* <button className={styles.btn} onClick={() => setShowPassword(v => !v)}>
                            {showPassword ? "HIDE" : "SHOW"}
                        </button> */}

                        {isEditingPassword && (
                            <button
                                className={styles.btn}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setShowPassword(v => !v)}
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </button>
                        )}

                        {/* <button
                            className={styles.edit}
                            onClick={() => {
                                setIsEditingPassword(true);
                                setShowPassword(false);
                            }}
                        >
                            EDIT
                        </button> */}

                        <button
                            className={styles.edit}
                            onClick={() => {
                                if (isEditingPassword) {
                                    setIsEditingPassword(false);
                                    setShowPassword(false);
                                } else {
                                    setIsEditingPassword(true);
                                }
                            }}
                        >
                            {isEditingPassword ? "DONE" : "EDIT"}
                        </button>


                    </div>

                    {/* LOGOUT */}
                    <div className={styles.item}>
                        <button className={styles.logout} onClick={handleLogout}>LOG OUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;