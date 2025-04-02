import React from "react";
import { Card, Badge } from "antd";
import {CommentOutlined, YoutubeOutlined} from '@ant-design/icons';
import styles from '../styles/cancion.module.css';
import Cancion from "../Others/cancion.tsx";

interface CancionCard {
    title: string;
    description: string;
    image: string;
    views?: string;
    comments?: number;
    price?: string;
}

interface CancionSectionProps {
    cancionCard: CancionCard[];
    cancionRef: React.RefObject<HTMLDivElement>;
}

const CancionSection: React.FC<CancionSectionProps> = ({ cancionCard, cancionRef }) => {
    return (
        <div className={styles.cancionContainer} ref={cancionRef}>
            <h2
                style={{color: '#333', margin: 0, background:"white", marginTop:-20, fontSize: 18, textTransform: "uppercase", letterSpacing:0.5, fontWeight:700}}>
                <YoutubeOutlined className="titleIcon" style={{ color: '#ff4d4f', fontSize: '24px', marginRight: 10}} />
                Cancion Oficial</h2>
            <p className={styles.sectionSubtitle}>Descubre la canción oficial de VisitaEcuador Influencer</p>

            {cancionCard.map((cancion, index) => (
                <Badge.Ribbon text="Oficial" color="#339933" key={index}>
                    <Card
                        hoverable
                        cover={<Cancion/>}
                        className={styles.cancionCard}
                    >
                        <div className={styles.cancionContent}>
                            <h3 className={styles.cancionTitle}>{cancion.title}</h3>
                            <p className={styles.cancionDescription}>{cancion.description}</p>

                            <div className={styles.cancionMeta}>
                                <div className={styles.metaLeft}>
                                    {cancion.views && <div className={styles.views}>{cancion.views}</div>}
                                    {cancion.comments && (
                                        <div className={styles.comments}>
                                            <CommentOutlined style={{ marginRight: 5 }} />
                                            {cancion.comments} comentarios
                                        </div>
                                    )}
                                </div>
                                <div className={styles.metaRight}>
                                    {cancion.price && <div className={styles.price}>Desde {cancion.price}</div>}
                                </div>
                            </div>
                        </div>
                    </Card>
                </Badge.Ribbon>
            ))}
        </div>
    );
};

export default CancionSection;
