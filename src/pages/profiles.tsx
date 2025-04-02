import { useState, useEffect } from 'react';
import styles from '../components/styles/ProfileSlider.module.css';
import { UsergroupAddOutlined } from "@ant-design/icons";
import {influencers} from "../hooks/useInfluencerData.ts";
import InfluencerModal from "../components/Secundary/Profiles/ModalProfile.tsx";
import {Influencer} from "../interfaces/influencer.ts";

const ProfileSlider = () => {
    const [position, setPosition] = useState(0);
    const [visibleProfiles, setVisibleProfiles] = useState(4);
    const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
    const [selectedInfluencerIndex, setSelectedInfluencerIndex] = useState<number>(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const maxPosition = Math.max(0, Math.ceil(influencers.length / visibleProfiles) + 6 );

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleProfiles(1);
            } else if (width < 1024) {
                setVisibleProfiles(2);
            } else if (width < 1280) {
                setVisibleProfiles(3);
            } else {
                setVisibleProfiles(4);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition((prevPosition) =>
                prevPosition >= maxPosition ? 0 : prevPosition + 1
            );
        }, 8000);

        return () => clearInterval(interval);
    }, [maxPosition]);

    const handlePrev = () => {
        setPosition((prevPosition) =>
            prevPosition <= 0 ? maxPosition : prevPosition - 1
        );
    };

    const handleNext = () => {
        setPosition((prevPosition) =>
            prevPosition >= maxPosition ? 0 : prevPosition + 1
        );
    };

    const handleInfluencerClick = (influencer: Influencer, index: number) => {
        setSelectedInfluencer(influencer);
        setSelectedInfluencerIndex(index);
        setIsModalOpen(true);
    };

    const handlePreviousInfluencer = () => {
        const prevIndex = selectedInfluencerIndex <= 0 ? influencers.length - 1 : selectedInfluencerIndex - 1;
        setSelectedInfluencerIndex(prevIndex);
        setSelectedInfluencer(influencers[prevIndex]);
    };

    const handleNextInfluencer = () => {
        const nextIndex = selectedInfluencerIndex >= influencers.length - 1 ? 0 : selectedInfluencerIndex + 1;
        setSelectedInfluencerIndex(nextIndex);
        setSelectedInfluencer(influencers[nextIndex]);
    };

    const cardWidth = 100 / visibleProfiles;

    return (
        <div className={styles.sliderContainer}>
            <h2 className={styles.sliderTitle}>
                <UsergroupAddOutlined
                    className="titleIcon"
                    style={{color: '#ff4d4f', fontSize: '24px', marginRight: 10}}
                />

                Nuestros Embajadores
            </h2>
            <p className={styles.sliderSubtitle}>
                Conoce a los influencers que representan a VisitaEcuador
            </p>

            <div className={styles.sliderWrapper}>
                <button
                    onClick={handlePrev}
                    className={styles.prevButton}
                    aria-label="Previous slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>

                <div className={styles.sliderViewport}>
                    <div
                        className={styles.sliderTrack}
                        style={{transform: `translateX(-${position * cardWidth}%)`}}
                    >
                        {influencers.map((profile, index) => (
                            <div
                                key={profile.id}
                                className={styles.profileCard}
                                style={{ width: `${cardWidth}%` }}
                                onClick={() => handleInfluencerClick(profile, index)}
                            >
                                <div className={styles.profileImageContainer}>
                                    <img
                                        src={profile.imageUrl}
                                        alt={profile.name}
                                        className={styles.profileImage}
                                    />
                                </div>
                                <span className={styles.profileName}>{profile.name}</span>
                                <span className={styles.profileRole}>{profile.role}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    className={styles.nextButton}
                    aria-label="Next slide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            <div className={styles.sliderIndicators}>
                {[...Array(maxPosition + 1)].map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.indicatorDot} ${position === i ? styles.active : ''}`}
                        onClick={() => setPosition(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
            <InfluencerModal
                influencer={selectedInfluencer}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPrevious={handlePreviousInfluencer}
                onNext={handleNextInfluencer}
            />
        </div>
    );
};

export default ProfileSlider;
