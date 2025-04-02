import React, { useState } from 'react';
import {
    InstagramOutlined,
    TikTokOutlined,
    XOutlined,
    FacebookFilled,
    YoutubeFilled,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import { Modal } from 'antd';
import { Influencer } from '../../../interfaces/influencer.ts';
import styles from '../../styles/ProfileSlider.module.css';

interface InfluencerModalProps {
    influencer: Influencer | null;
    isOpen: boolean;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
}
type SocialPlatform = 'instagram' | 'youtube' | 'twitter' | 'facebook' | 'tiktok';

const socialIcons: Record<SocialPlatform, React.ComponentType> = {
    'instagram': InstagramOutlined,
    'youtube': YoutubeFilled,
    'twitter': XOutlined,
    'facebook': FacebookFilled,
    'tiktok': TikTokOutlined
};

const socialColors: Record<SocialPlatform, string> = {
    'instagram': '#E1306C',
    'youtube': '#FF0000',
    'twitter': '#151414',
    'facebook': '#1877F2',
    'tiktok': '#000000'
};

const getSocialIcon = (platform: SocialPlatform) => {
    const Icon = socialIcons[platform];
    return Icon ? (
        <Icon
            style={{ color: socialColors[platform] }}
            className={styles.influencerModalSocialLink}
        />
    ) : null;
};

const InfluencerModal: React.FC<InfluencerModalProps> = ({
                                                             influencer,
                                                             isOpen,
                                                             onClose,
                                                             onPrevious,
                                                             onNext
                                                         }) => {
    const [activeTab, setActiveTab] = useState<'biografia' | 'redes' | 'videos'>('biografia');

    if (!influencer) return null;

    const renderTabContent = () => {
        switch (activeTab) {
            case 'biografia':
                return (
                    <div className={styles.tabContent}>
                        {influencer.bio && (
                            <p className={styles.influencerModalBio}>
                                {`"${influencer.bio}"`}
                            </p>
                        )}
                    </div>
                );
            case 'redes':
                return (
                    <div className={styles.tabContent}>
                        {influencer.socialLinks && influencer.socialLinks.length > 0 ? (
                            <div className={styles.socialLinksGrid}>
                                {influencer.socialLinks.map((link) => {
                                    const platform = link.platform as SocialPlatform;
                                    return (
                                        <a
                                            key={link.platform}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.socialLinkCard}
                                        >
                                            <div className={styles.socialIconWrapper}>
                                                {getSocialIcon(platform)}
                                            </div>
                                            <span className={styles.socialPlatformName}>
                                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className={styles.noContentMessage}>No social networks available</p>
                        )}
                    </div>
                );
            case 'videos':
                return (
                    <div className={styles.tabContent}>
                        {influencer.videos && influencer.videos.length > 0 ? (
                            <div className={styles.influencerModalVideoGrid}>
                                {influencer.videos.map((video) => (
                                    <div
                                        key={video.id}
                                        className={styles.influencerModalVideoThumbnail}
                                        onClick={() => window.open(video.videoUrl, '_blank')}
                                    >
                                        <img
                                            src={video.thumbnailUrl}
                                            alt={video.title}
                                            style={{width:'100%',height:'100%', cursor: 'pointer'}}
                                        />
                                        <p className={styles.influencerModalVideoTitle}>{video.title}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className={styles.noContentMessage}>No videos available</p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            width={800}
            footer={null}
            className={`${styles.influencerModal} responsive-modal`}
            style={{ marginTop: '-80px' }}
        >
            <div className={styles.influencerModalHeader}>
                <div className={styles.influencerModalProfileImageContainer}>
                    <img
                        src={influencer.imageUrl}
                        alt={influencer.name}
                        className={styles.influencerModalProfileImage}
                    />
                </div>
            </div>

            <div className={styles.influencerModalInfo}>
                <h2 className={styles.influencerModalName}>{influencer.name}</h2>
                <p className={styles.influencerModalRole}>{influencer.role}</p>

                <div className={styles.modalTabs}>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'biografia' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('biografia')}
                    >
                        Biografía
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'redes' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('redes')}
                    >
                        Redes Sociales
                    </button>
                    <button
                        className={`${styles.tabButton} ${activeTab === 'videos' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('videos')}
                    >
                        Videos
                    </button>
                </div>

                {renderTabContent()}
            </div>

            <button
                className={styles.modalNavPrev}
                onClick={onPrevious}
                aria-label="Previous influencer"
            >
                <LeftOutlined />
            </button>
            <button
                className={styles.modalNavNext}
                onClick={onNext}
                aria-label="Next influencer"
            >
                <RightOutlined />
            </button>
        </Modal>
    );
};

export default InfluencerModal;
