import { useNavigate, Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import healthLibrary from "../../assets/images/healthLibrary.jpg"
import ArrowRightBlack from "../../assets/icons/ArrowRightBlack";

import styles from "./HealthLibrary.module.css";

const HealthLibrary = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <div className={styles.containerInner}>
                    <h1 className={styles.title}>Health library</h1>
                    <div className={styles.libraryBlock}>
                        <div className={styles.wrapHeading}>
                            <h2 className={styles.heading}>About care</h2>
                            <Link to="/subscription" className={styles.wrapSeeAll}>
                                <div className={styles.seeAll}>See all</div>
                                <ArrowRightBlack />
                            </Link>
                        </div>
                        <Swiper
                            className={`${styles.swiper} ${styles.librarySwiper}`}
                            modules={[]}
                            slidesPerView="auto"
                            spaceBetween={10}
                        >
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={healthLibrary} alt="healthLibrary" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Health article name here
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={healthLibrary} alt="healthLibrary" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Health article name here
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={healthLibrary} alt="healthLibrary" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Health article name here
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={healthLibrary} alt="healthLibrary" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Health article name here
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={healthLibrary} alt="healthLibrary" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Health article name here
                                    </p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                    <div className={styles.libraryBlock}>
                        <div className={styles.wrapHeading}>
                            <h2 className={styles.heading}>About care</h2>
                            <Link to="/subscription" className={styles.wrapSeeAll}>
                                <div className={styles.seeAll}>See all</div>
                                <ArrowRightBlack />
                            </Link>
                        </div>
                        <Swiper
                            className={`${styles.swiper} ${styles.librarySwiper}`}
                            modules={[]}
                            slidesPerView="auto"
                            spaceBetween={10}
                        >
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={healthLibrary} alt="healthLibrary" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Health article name here
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={healthLibrary} alt="healthLibrary" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Health article name here
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={healthLibrary} alt="healthLibrary" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Health article name here
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={healthLibrary} alt="healthLibrary" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Health article name here
                                    </p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.libraryItem}>
                                    <div className={styles.libraryImg}>
                                        <img src={healthLibrary} alt="healthLibrary" />
                                    </div>
                                    <p className={styles.libraryText}>
                                        Health article name here
                                    </p>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <BottomBlock>
                        <Button onClick={() => navigate("/subscription")} >Unlock all articles</Button>
                    </BottomBlock>
                </div>
            </div >
        </>
    )
};

export default HealthLibrary;