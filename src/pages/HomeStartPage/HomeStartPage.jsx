import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import Button from "../../components/Button/Button";

import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";
import noTestHomeMain from "../../assets/images/noTestHomeMain.jpg"
import carouselHowItWorksStep1 from "../../assets/images/carousel/carouselHowItWorksStep1.jpg"
import carouselHowItWorksStep2 from "../../assets/images/carousel/carouselHowItWorksStep2.jpg"
import carouselHowItWorksStep3 from "../../assets/images/carousel/carouselHowItWorksStep3.jpg"
import library1 from "../../assets/images/library1.jpg"
import library2 from "../../assets/images/library2.jpg"

import styles from "./HomeStartPage.module.css";

const HomeStartPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <div className={styles.containerInner}>
                    <div className={styles.greetingBlock}>
                        <div className={styles.img}>
                            <ImageWrapper src={noTestHomeMain} alt="tests" width={345} height={214} />
                        </div>
                        <div className={styles.wrapText}>
                            <p className={styles.text}>
                                A quick pH test helps you understand your vaginal balance and spot changes early — right from your phone. Have your pHera test box and strip ready. We’ll guide you step by step and scan your result automatically.
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
                                        <ImageWrapper src={carouselHowItWorksStep1} loading="lazy" alt="Step 1" width={218} height={200} />
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
                                        <ImageWrapper src={carouselHowItWorksStep2} loading="lazy" alt="Step 2" width={218} height={200} />
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
                                        <ImageWrapper src={carouselHowItWorksStep3} loading="lazy" alt="Step 3" width={218} height={200} />
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