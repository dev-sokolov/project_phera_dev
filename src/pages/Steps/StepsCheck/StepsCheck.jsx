import { useNavigate, Link } from "react-router-dom";

import Container from "../../../components/Container/Container";

import styles from "./StepsCheck.module.css";

const StepsCheck = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content}>
                <div className={styles.scrollable}>
                    <Container>
                        <div className={styles.containerInner}>
                            <div className={styles.check}></div>
                            <div className={styles.check2}></div>
                            <div className={styles.check}>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis possimus, consequatur nemo magnam, quasi porro repudiandae at corporis, exercitationem vitae rem fugit veniam molestiae animi? Iste, quidem? Eligendi natus impedit quis assumenda illo! Nemo a nesciunt corrupti, facere recusandae alias, quas porro ab facilis at neque ducimus maiores laborum aliquid.</p>
                            </div>

                        </div>
                    </Container>
                </div>


            </div>
        </>
    )
};

export default StepsCheck;