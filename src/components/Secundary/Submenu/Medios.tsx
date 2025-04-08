import React, { useState } from 'react';
import { Tabs, Card, Button, Modal, Space } from 'antd';
import styles from '../../styles/adherentes.module.css';
import { FundViewOutlined, PlayCircleFilled, ShareAltOutlined, ExportOutlined } from "@ant-design/icons";
import imgP from '../../../assets/entrevistas/img.png';
import imgP1 from '../../../assets/entrevistas/img_1.png';
import imgP2 from '../../../assets/entrevistas/img_2.png';



const { TabPane } = Tabs;

interface MediaItem {
    title: string;
    description: string;
    imageUrl: string;
    source: string;
    date: string;
    url: string;
}

interface VideoItem extends MediaItem {
    videoUrl: string;
    platform: string;
}

const Medios: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);

    const newsItems: MediaItem[] = [
        {
            title: "VisitaEcuador Influencer lanza nueva plataforma para creadores de contenido",
            description: "El programa VisitaEcuador Influencer presentó su nueva plataforma digital que conecta a creadores de contenido con empresas turísticas del país.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/news1.jpg",
            source: "El Comercio",
            date: "15/01/2024",
            url: "#"
        },
        {
            title: "Influencers ecuatorianos promueven destinos turísticos poco conocidos",
            description: "Un grupo de creadores de contenido recorre zonas rurales del país para promocionar atractivos turísticos que no están en las rutas tradicionales.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/news2.jpg",
            source: "El Universo",
            date: "03/03/2024",
            url: "#"
        },
        {
            title: "Movimiento VisitaEcuador organiza evento para creadores digitales",
            description: "El encuentro reunió a más de 100 influencers de diferentes especialidades para compartir experiencias y estrategias de promoción turística.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/news3.jpg",
            source: "La Hora",
            date: "28/05/2024",
            url: "#"
        }
    ];

    const videoItems: VideoItem[] = [
        {
            title: "Entrevista con Bernardo Polo Andrade, director de VisitaEcuador Influencer",
            description: "Conversamos sobre el crecimiento del programa y los planes futuros para promover el turismo ecuatoriano a través de creadores digitales.",
            imageUrl: imgP,
            videoUrl: "https://www.youtube.com/embed/jXB-9I6uUkw",
            source: "Ecuador TV",
            date: "10/02/2024",
            url: "#",
            platform: "YouTube"
        },
        {
            title: "Los desafíos de promover destinos turísticos en redes sociales",
            description: "Influencers ecuatorianos hablan sobre su experiencia promocionando atractivos del país y los retos que enfrentan.",
            imageUrl: imgP1 ,
            videoUrl: "https://www.youtube.com/embed/lmnopqrstu",
            source: "Radio Pichincha",
            date: "22/04/2024",
            url: "#",
            platform: "YouTube"
        },
        {
            title: "Turismo comunitario: nueva tendencia en Ecuador",
            description: "Conversatorio con representantes de comunidades y creadores de contenido sobre el impulso al turismo comunitario.",
            imageUrl: imgP2,
            videoUrl: "https://www.youtube.com/embed/vwxyz12345",
            source: "VisitaEcuador TV",
            date: "15/03/2024",
            url: "#",
            platform: "YouTube"
        }
    ];

    const pressReleaseItems: MediaItem[] = [
        {
            title: "VisitaEcuador Influencer anuncia alianza con el Ministerio de Turismo",
            description: "El programa fortalece lazos con entidades gubernamentales para potenciar la promoción turística del país a través de creadores de contenido.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/press1.jpg",
            source: "VisitaEcuador",
            date: "05/03/2024",
            url: "#"
        },
        {
            title: "Convocatoria para nuevos embajadores de VisitaEcuador Influencer",
            description: "El programa busca incorporar creadores de contenido especializados en turismo, gastronomía, aventura y cultura ecuatoriana.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/press2.jpg",
            source: "VisitaEcuador",
            date: "17/06/2024",
            url: "#"
        },
        {
            title: "Resultados del primer año del programa VisitaEcuador Influencer",
            description: "Balance de logros y alcance de las campañas realizadas con creadores de contenido para promover destinos turísticos ecuatorianos.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/press3.jpg",
            source: "VisitaEcuador",
            date: "30/12/2023",
            url: "#"
        }
    ];

    const showVideoModal = (video: VideoItem) => {
        setCurrentVideo(video);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const shareVideo = () => {
        if (currentVideo && navigator.share) {
            navigator.share({
                title: currentVideo.title,
                text: currentVideo.description,
                url: currentVideo.url
            }).catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = currentVideo?.url || '';
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert('Enlace copiado al portapapeles');
        }
    };

    const renderMediaItems = (items: MediaItem[]) => {
        return (
            <div className={styles.mediaGrid}>
                {items.map((item, index) => (
                    <Card
                        key={index}
                        className={styles.mediaCard}
                        cover={<img alt={item.title} src={item.imageUrl} className={styles.mediaImage} />}
                    >
                        <h3 className={styles.mediaTitle}>{item.title}</h3>
                        <p className={styles.mediaDescription}>{item.description}</p>
                        <div className={styles.mediaFooter}>
                            <span className={styles.mediaSource}>{item.source}</span>
                            <span className={styles.mediaDate}>{item.date}</span>
                        </div>
                        <Button type="primary" className={styles.readMoreButton}>
                            Leer más
                        </Button>
                    </Card>
                ))}
            </div>
        );
    };

    const renderVideoItems = (items: VideoItem[]) => {
        return (
            <div className={styles.mediaGrid}>
                {items.map((item, index) => (
                    <Card
                        key={index}
                        className={`${styles.mediaCard} ${styles.videoCard}`}
                        cover={
                            <div className={styles.videoThumbnail}>
                                <img alt={item.title} src={item.imageUrl} className={styles.mediaImage} />
                                <div className={styles.playButtonOverlay} onClick={() => showVideoModal(item)}>
                                    <PlayCircleFilled className={styles.playButton} />
                                </div>
                            </div>
                        }
                    >
                        <h3 className={styles.mediaTitle}>{item.title}</h3>
                        <p className={styles.mediaDescription}>{item.description}</p>
                        <div className={styles.mediaFooter}>
                            <span className={styles.mediaSource}>{item.source}</span>
                            <span className={styles.mediaDate}>{item.date}</span>
                        </div>
                        <Button
                            type="primary"
                            className={styles.watchVideoButton}
                            icon={<PlayCircleFilled />}
                            onClick={() => showVideoModal(item)}
                        >
                            Ver Entrevista
                        </Button>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.mediosContainer}>
            <h2 className="sectionTitle" style={{
                fontSize: '24px',
                color: '#333',
                marginBottom: '8px',
                textAlign: 'center',
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontWeight: 700
            }}>
                <FundViewOutlined className="titleIcon"
                                  style={{color: '#ff4d4f', fontSize: '24px', gap: '10px', marginRight: '10px'}}/>
                Medios
            </h2>
            <div className={styles.mediosDescription}>
                <p>
                    Conoce las publicaciones, entrevistas y comunicados de prensa relacionados
                    con el programa VisitaEcuador Influencer y sus actividades de promoción turística del Ecuador.
                </p>
            </div>

            <Tabs defaultActiveKey="1" className={styles.mediaTabs}>
                <TabPane tab="Noticias" key="1">
                    {renderMediaItems(newsItems)}
                </TabPane>

                <TabPane tab="Entrevistas" key="2">
                    {renderVideoItems(videoItems)}
                </TabPane>

                <TabPane tab="Comunicados de Prensa" key="3">
                    {renderMediaItems(pressReleaseItems)}
                </TabPane>
            </Tabs>

            <div className={styles.contactMediaSection}>
                <div className={styles.contactMediaContent}>
                    <h3>¿Eres periodista o medio de comunicación?</h3>
                    <p>
                        Si estás interesado en cubrir nuestras actividades o entrevistar a alguno
                        de nuestros embajadores, ponte en contacto con nuestro departamento de prensa.
                    </p>
                    <Button type="primary" className={styles.contactButton}>
                        Contacto para Prensa
                    </Button>
                </div>
                <div className={styles.contactMediaImage}>
                    <img
                        src="https://visitaecuadorinfluencer.com/img/diseno/press-contact.jpg"
                        alt="Contacto para prensa"
                        className={styles.mediaContactImage}
                    />
                </div>
            </div>

            <Modal
                title={currentVideo?.title}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
                className={styles.videoModal}
                centered
            >
                <div className={styles.videoContainer}>
                    <iframe
                        src={currentVideo?.videoUrl}
                        title={currentVideo?.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={styles.videoFrame}
                    ></iframe>
                </div>

                <p className={styles.modalDescription}>{currentVideo?.description}</p>

                <div className={styles.modalFooter}>
                    <div className={styles.videoInfo}>
                        <span className={styles.videoSource}>{currentVideo?.source}</span>
                        <span className={styles.videoDate}>{currentVideo?.date}</span>
                    </div>

                    <Space>
                        <Button
                            type="primary"
                            icon={<ShareAltOutlined />}
                            onClick={shareVideo}
                            className={styles.shareButton}
                        >
                            Compartir
                        </Button>
                        <Button
                            icon={<ExportOutlined />}
                            href={currentVideo?.url}
                            target="_blank"
                            className={styles.platformButton}
                        >
                            Ver en {currentVideo?.platform}
                        </Button>
                    </Space>
                </div>
            </Modal>
        </div>
    );
};

export default Medios;
