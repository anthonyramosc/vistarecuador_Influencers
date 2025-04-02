import React from 'react';
import styles from '../../styles/adherentes.module.css';
import {RiseOutlined} from "@ant-design/icons";

interface BenefitCard {
    title: string;
    description: string;
    imageUrl: string;
}

const Beneficios: React.FC = () => {
    const benefitsCards: BenefitCard[] = [
        {
            title: "Descuentos Exclusivos",
            description: "Accede a descuentos especiales en hoteles, restaurantes y atracciones turísticas en todo Ecuador.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/descuentos.jpg"
        },
        {
            title: "Eventos Privados",
            description: "Participa en eventos exclusivos organizados por el Movimiento VisitaEcuador.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/eventos.jpg"
        },
        {
            title: "Networking",
            description: "Conecta con otros influencers, empresas y marcas interesadas en promocionar Ecuador.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/networking.jpg"
        },
        {
            title: "Capacitación",
            description: "Accede a talleres y cursos para mejorar tus habilidades como creador de contenido.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/capacitacion.jpg"
        },
        {
            title: "Promoción de Contenido",
            description: "Tu contenido será promovido en las plataformas oficiales de VisitaEcuador.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/promocion.jpg"
        },
        {
            title: "Certificación",
            description: "Recibe una certificación oficial como Embajador de VisitaEcuador Influencer.",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/certificacion.jpg"
        }
    ];

    return (
        <div className={styles.beneficiosContainer}>
            <h2 className="sectionTitle" style={{
                fontSize: '24px',
                color: '#333',
                marginBottom: '8px',
                textAlign: 'center',
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontWeight: 700
            }}>
                <RiseOutlined className="titleIcon"
                                 style={{color: '#ff4d4f', fontSize: '24px', gap: '10px', marginRight: '10px'}}/>
                    Beneficios
            </h2>
            <div className={styles.beneficiosDescription}>
                <p>
                    Al formar parte del Movimiento VisitaEcuador Influencer, obtienes acceso a múltiples beneficios
                    que te ayudarán a crecer como creador de contenido y a promover las maravillas de Ecuador.
                </p>
            </div>

            <div className={styles.benefitsGrid}>
                {benefitsCards.map((benefit, index) => (
                    <div key={index} className={styles.benefitCard}>
                        <div className={styles.benefitImageContainer}>
                            <img
                                src={benefit.imageUrl}
                                alt={benefit.title}
                                className={styles.benefitImage}
                            />
                        </div>
                        <div className={styles.benefitContent}>
                            <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                            <p className={styles.benefitDescription}>{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.partnersSection}>
                <h3 className={styles.partnersTitle}>Nuestros Aliados</h3>
                <div className={styles.partnersGrid}>
                    <img src="https://visitaecuadorinfluencer.com/img/diseno/logo_hotel.jpg" alt="Hotel Partner"
                         className={styles.partnerLogo}/>
                    <img src="https://visitaecuadorinfluencer.com/img/diseno/spa.jpg" alt="Spa Partner"
                         className={styles.partnerLogo}/>
                    <img src="https://visitaecuadorinfluencer.com/img/diseno/iatalia.jpg" alt="Fashion Partner"
                         className={styles.partnerLogo}/>
                    <img src="https://visitaecuadorinfluencer.com/img/diseno/visita.jpg" alt="Visita Ecuador"
                         className={styles.partnerLogo}/>
                </div>
            </div>
        </div>
    );
};

export default Beneficios;
