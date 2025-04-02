import React, { useState, useEffect } from 'react';
import styles from '../styles/promotionsDownload.module.css';
import {DownloadsSectionProps} from "../../interfaces/interfaces.ts";
import {DownloadOutlined} from "@ant-design/icons";


const DownloadsSection: React.FC<DownloadsSectionProps> = ({ downloadItems }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const itemsPerSlide = 3;
    const totalSlides = Math.ceil(downloadItems.length / itemsPerSlide);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            nextSlide();
        }

        if (touchEnd - touchStart > 75) {
            prevSlide();
        }
    };

  /*  const getCurrentSlideItems = () => {
        const start = currentSlide * itemsPerSlide;
        return downloadItems.slice(start, start + itemsPerSlide);
    };*/

    return (
        <div className={styles.downloadsContainer}>
            <div className={styles.sectionWrapper}>
                <div className={styles.downloadsHeader}>
                    <h2 style={{textTransform: "uppercase", letterSpacing:0.5, fontWeight:700, fontSize: 20}}>
                        <DownloadOutlined className="titleIcon" style={{ color: '#ffffff', fontSize: '24px', marginRight: 10}} />
                        Descargas</h2>
                </div>

                <div
                    className={styles.downloadsSliderContainer}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >


                    <div className={styles.downloadsSliderContent}>
                        <div
                            className={styles.downloadsSliderTrack}
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`,
                                width: `${totalSlides * 100}%`
                            }}
                        >
                            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                                <div key={`slide-${slideIndex}`} className={styles.downloadsSlide}>
                                    {downloadItems
                                        .slice(slideIndex * itemsPerSlide, (slideIndex + 2) * itemsPerSlide)
                                        .map((item, itemIndex) => (
                                            <div
                                                key={`download-${slideIndex}-${itemIndex}`}
                                                className={styles.downloadCard}
                                            >
                                                <div className={styles.downloadImageContainer}>
                                                    <img src={item.imageUrl} alt={item.title} className={styles.downloadImage} />
                                                </div>
                                                <div className={styles.downloadTitle}>{item.title}</div>
                                                {item.isAvailable ? (
                                                    <a href={item.link} className={styles.downloadButton}>
                                                        Descargar
                                                    </a>
                                                ) : (
                                                    <span className={styles.notAvailable}>No Disponible</span>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className={styles.sliderDots}>
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={`dot-${index}`}
                            className={`${styles.sliderDot} ${currentSlide === index ? styles.activeDot : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DownloadsSection;
