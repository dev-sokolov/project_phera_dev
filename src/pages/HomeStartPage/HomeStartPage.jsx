import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import AppLayout from "../../components/Layout/AppLayout";

import Logo from "../../assets/Logo";
import noTestHomeMain from "../../assets/images/noTestHomeMain.jpg"
import onboardingStep1 from "../../assets/images/onboardingStep1.jpg"
import onboardingStep2 from "../../assets/images/onboardingStep2.jpg"
import onboardingStep3 from "../../assets/images/onboardingStep3.jpg"
import library1 from "../../assets/images/library1.jpg"
import library2 from "../../assets/images/library2.jpg"

import styles from "./HomeStartPage.module.css";

const HomeStartPage = () => {
    const navigate = useNavigate();
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const toggleMenu = () => setIsOpenMenu(prev => !prev);

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <AppLayout />
                <div className={styles.containerInner}>
                    <div className={styles.greetingBlock}>
                        <div className={styles.img}>
                            <img src={noTestHomeMain} alt="tests" />
                        </div>
                        <div className={styles.wrapText}>
                            <p className={styles.text}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                            </p>
                        </div>
                        <div className={styles.btn}>
                            <Button onClick={() => navigate("/steps")}>Start new scan</Button>
                        </div>
                    </div>

                    <div className={styles.howItWorksBlock}>
                        <h2 className={styles.title}>How it works</h2>

                        <Swiper
                            className={styles.swiper}
                            modules={[]}
                            slidesPerView="auto"
                            spaceBetween={16}
                        >
                            <SwiperSlide>
                                <div className={styles.carouselItem}>
                                    <div className={styles.carouselImg}>
                                        <img src={onboardingStep1} alt="Step 1" />
                                    </div>
                                    <h3 className={styles.carouselTitle}>Scan your kit</h3>
                                    <p className={styles.carouselText}>
                                        Scan the QR code on your pHera box to start the test. This helps us identify your kit and guide you through the process.
                                    </p>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className={styles.carouselItem}>
                                    <div className={styles.carouselImg}>
                                        <img src={onboardingStep2} alt="Step 2" />
                                    </div>
                                    <h3 className={styles.carouselTitle}>Allow camera access</h3>
                                    <p className={styles.carouselText}>
                                        Give pHera one-time access to your camera, so it can scan your test-strip. pHera doesn’t take or save any photos - it checks the colors in real time to give you interpretation.
                                    </p>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className={styles.carouselItem}>
                                    <div className={styles.carouselImg}>
                                        <img src={onboardingStep3} alt="Step 3" />
                                    </div>
                                    <h3 className={styles.carouselTitle}>Get your result</h3>
                                    <p className={styles.carouselText}>
                                        After you scan your strip, we’ll process the color and show your pH result within seconds — along with a clear explanation.
                                    </p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className={styles.libraryBlock}>
                        <h2 className={styles.title}>Health Library</h2>

                        <Swiper
                            className={`${styles.swiper} ${styles.librarySwiper}`}
                            modules={[]}
                            slidesPerView="auto"
                            spaceBetween={12}
                        >
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={library1} alt="Library 1" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Lorem ipsum dolor
                                    </p>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={library2} alt="Library 1" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Lorem ipsum dolor
                                    </p>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={library1} alt="Library 1" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Lorem ipsum dolor
                                    </p>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={library2} alt="Library 1" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Lorem ipsum dolor
                                    </p>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={library1} alt="Library 1" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Lorem ipsum dolor
                                    </p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div >
        </>
    )
};

export default HomeStartPage;