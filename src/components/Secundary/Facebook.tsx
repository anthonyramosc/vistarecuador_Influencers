import React, { useState, useEffect } from 'react';
import styles from '../styles/Facebook.module.css';
import { FacebookOutlined, PlayCircleFilled, ExportOutlined, CloseOutlined } from "@ant-design/icons";
import ShareAlt from "@ant-design/icons/ShareAltOutlined"
import imgP from "../../assets/img_7.png"

interface FacebookVideo {
    id: string;
    source: string;
    thumbnail: string;
    title: string;
    published: string;
    likes: number;
    comments: number;
    shares: number;
}

interface FacebookSectionProps {
    facebookRef: React.RefObject<HTMLDivElement>;
}

const Facebook: React.FC<FacebookSectionProps> = ({ facebookRef }) => {
    const [videos, setVideos] = useState<FacebookVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeVideo, setActiveVideo] = useState<FacebookVideo | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const mockVideos = [
                {
                    id: '1',
                    source: 'https://www.facebook.com/107391811013779/videos/265688488183468',
                    thumbnail: imgP,
                    title: 'Descubre VisitaEcuador Influencer',
                    published: '2024-03-01',
                    likes: 243,
                    comments: 45,
                    shares: 28
                },
                {
                    id: '2',
                    source: 'https://www.facebook.com/107391811013779/videos/265688488183468',
                    thumbnail: 'https://visitaecuador.com/img/web/dc_quees.png',
                    title: 'Gastronomía de la Costa',
                    published: '2024-02-15',
                    likes: 187,
                    comments: 32,
                    shares: 15
                }
            ];
            setVideos(mockVideos);
            setLoading(false);
        }, 1000);
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 1) return 'Hoy';
        if (diffDays === 1) return 'Ayer';
        if (diffDays < 7) return `Hace ${diffDays} días`;
        if (diffDays < 30) return `Hace ${Math.floor(diffDays/7)} semanas`;

        return `${date.getDate()} de ${date.toLocaleString('es-ES', { month: 'long' })}`;
    };

    const openVideoModal = (video: FacebookVideo) => {
        setActiveVideo(video);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeVideoModal = () => {
        setModalOpen(false);
        setActiveVideo(null);
        document.body.style.overflow = 'auto';
    };

    const handleShareClick = (video: FacebookVideo) => {
        if (navigator.share) {
            navigator.share({
                title: video.title,
                text: 'Mira este video interesante de Movimiento Visita Ecuador',
                url: video.source,
            })
                .catch((error) => console.log('Error al compartir:', error));
        } else {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(video.source)}`, '_blank');
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.fbLoader}>
                    <div className={styles.spinner}></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorMessage}>
                    <p>{error}</p>
                    <button className={styles.retryButton}>Intentar de nuevo</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.facebookContainer} ref={facebookRef}>
            <div style={{backgroundColor:'white'}}>
                <h2
                    style={{
                        color: '#333',
                        margin: 0,
                        background: "white",
                        marginTop: -55,
                        fontSize: 24,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        fontWeight: 700,
                        textAlign: 'start'
                    }}
                >
                    <FacebookOutlined
                        className="titleIcon"
                        style={{
                            color: '#ff4d4f',
                            fontSize: '24px',
                            marginRight: 10,
                        }}
                    />
                    Nuestra Comunidad
                </h2>
                <p className="sectionSubtitle" style={{
                    fontSize: '16px',
                    color: '#666',
                    marginBottom: '44px',
                    textAlign: 'start',
                    marginLeft: '50px',
                    marginTop: '10.5px'
                }}>
                    Descubre nuestros proyectos más innovadores
                </p>
                <div className={styles.fbHeader}>
                    <div className={styles.fbPageInfo}>
                        <img
                            src="https://scontent.fgye30-1.fna.fbcdn.net/v/t39.30808-1/302161883_453119123499050_8360221940465047080_n.png?stp=dst-png_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeEYNBp16MP3DET0IU5JsC82v8nXblg2dYi_ydduWDZ1iIxKHyZR91mFBk28ak3mxM-9Rt6m_5IkL4H5E411RpQH&_nc_ohc=07VBcM5uVUMQ7kNvgGTHl0c&_nc_oc=Adl7E0wEJX3Fre2eH_878Ei_VkVgzO2l6lbRddI60iFcZqmjZLBNHoQtLRKznPvk-IXxKOreYDCKrkG0P_leJUsV&_nc_zt=24&_nc_ht=scontent.fgye30-1.fna&_nc_gid=2c46xDCIVYStIAGMb9Gelg&oh=00_AYELece2K0z5JAqIFNqdizja3cR6WT3_aqnM57z8kI-lkQ&oe=67F0DAE9"
                            alt="VisitaEcuador"
                            className={styles.fbPageLogo}
                        />
                        <div>
                            <h3 className={styles.fbPageName}>Movimiento Visita Ecuador</h3>
                            <span className={styles.fbVerified}></span>
                        </div>
                        <a
                            href="https://www.facebook.com/profile.php?id=100064028977797"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.fbFollowButton}
                        >
                            Seguir
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.videosContainer}>
                {videos.map((video) => (
                    <div key={video.id} className={styles.fbPost}>
                        <div className={styles.fbPostHeader}>
                            <img
                                src="https://scontent.fgye30-1.fna.fbcdn.net/v/t39.30808-1/302161883_453119123499050_8360221940465047080_n.png?stp=dst-png_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeEYNBp16MP3DET0IU5JsC82v8nXblg2dYi_ydduWDZ1iIxKHyZR91mFBk28ak3mxM-9Rt6m_5IkL4H5E411RpQH&_nc_ohc=07VBcM5uVUMQ7kNvgGTHl0c&_nc_oc=Adl7E0wEJX3Fre2eH_878Ei_VkVgzO2l6lbRddI60iFcZqmjZLBNHoQtLRKznPvk-IXxKOreYDCKrkG0P_leJUsV&_nc_zt=24&_nc_ht=scontent.fgye30-1.fna&_nc_gid=2c46xDCIVYStIAGMb9Gelg&oh=00_AYELece2K0z5JAqIFNqdizja3cR6WT3_aqnM57z8kI-lkQ&oe=67F0DAE9"
                                alt="VisitaEcuador"
                                className={styles.fbPostAvatar}
                            />
                            <div className={styles.fbPostInfo}>
                                <h4>Movimiento Visita Ecuador</h4>
                                <p className={styles.fbPostTime}>{formatDate(video.published)}</p>
                            </div>
                            <div className={styles.fbPostMore}>•••</div>
                        </div>

                        <p className={styles.fbPostText}>{video.title}</p>

                        <div className={styles.fbPostContent} onClick={() => openVideoModal(video)}>
                            <div className={styles.thumbnailContainer}>
                                <img
                                    alt={video.title}
                                    src={video.thumbnail}
                                    className={styles.thumbnailImage}
                                />
                                <div className={styles.playIconContainer}>
                                    <PlayCircleFilled className={styles.modernPlayIcon} />
                                </div>
                            </div>
                        </div>


                        <div className={styles.fbPostActions}>
                            <a
                                href={video.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.fbNewButton}
                            >
                                <ExportOutlined className={styles.buttonIcon} />
                                Ver en Facebook
                            </a>
                            <button
                                className={styles.fbNewButton}
                                onClick={() => handleShareClick(video)}
                            >
                                <ShareAlt className={styles.buttonIcon} />
                                Compartir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && activeVideo && (
                <div className={styles.videoModal} onClick={closeVideoModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeVideoModal}>
                            <CloseOutlined />
                        </button>
                        <h3 className={styles.modalTitle}>{activeVideo.title}</h3>
                        <div className={styles.videoContainer}>
                            <iframe
                                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(activeVideo.source)}&show_text=false&width=734&height=413&appId`}
                                width="100%"
                                height="400"
                                style={{ border: 'none', overflow: 'hidden' }}
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            ></iframe>
                        </div>
                        <div className={styles.modalActions}>
                            <a
                                href={activeVideo.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.modalButton}
                            >
                                <ExportOutlined className={styles.buttonIcon} />
                                Ver en Facebook
                            </a>
                            <button
                                className={styles.modalButton}
                                onClick={() => handleShareClick(activeVideo)}
                            >
                                <ShareAlt className={styles.buttonIcon} />
                                Compartir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Facebook;
