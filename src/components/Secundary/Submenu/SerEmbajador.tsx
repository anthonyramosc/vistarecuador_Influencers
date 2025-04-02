import React from 'react';
import { Card, Row, Col, Typography, Button, List, Avatar, Tag } from 'antd';
import styles from '../../styles/SerEmbajador.module.css';
import imgP from "../../../assets/profiles/img_1.png";
import imgP1 from "../../../assets/profiles/img_2.png";

const { Title, Paragraph, Text } = Typography;

interface EmbajadorBenefit {
    icon: string;
    title: string;
    description: string;
}

interface TestimonialType {
    name: string;
    avatar: string;
    location: string;
    content: string;
}

const SerEmbajador: React.FC = () => {
    const benefits: EmbajadorBenefit[] = [
        {
            icon: "https://visitaecuadorinfluencer.com/img/diseno/logo-11.svg",
            title: "Reconocimiento Oficial",
            description: "Sé reconocido como embajador oficial de la marca VisitaEcuador Influencer."
        },
        {
            icon: "https://visitaecuadorinfluencer.com/img/diseno/logo-11.svg",
            title: "Acceso Exclusivo",
            description: "Accede a eventos, destinos y experiencias exclusivas para embajadores."
        },
        {
            icon: "https://visitaecuadorinfluencer.com/img/diseno/logo-11.svg",
            title: "Formación Continua",
            description: "Recibe capacitación especializada en creación de contenido y marketing digital."
        },
        {
            icon: "https://visitaecuadorinfluencer.com/img/diseno/logo-11.svg",
            title: "Oportunidades Comerciales",
            description: "Conecta con marcas y empresas interesadas en colaboraciones."
        }
    ];

    const testimonials: TestimonialType[] = [
        {
            name: "Critina Ortega",
            avatar: imgP1,
            location: "Guayaquil",
            content: "Ser embajador de VisitaEcuador me ha permitido mostrar mi país como nunca antes. He conocido lugares increíbles y personas maravillosas."
        },
        {
            name: "Kamila Ramona",
            avatar: imgP,
            location: "Quito",
            content: "Gracias a este programa he podido profesionalizar mi trabajo como creadora de contenido y abrir puertas a nuevas oportunidades."
        }
    ];

    return (
        <div className={styles.container}>
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card className={styles.heroCard}>
                        <div className={styles.heroContent}>
                            <div className={styles.heroImageContainer}>
                                <img
                                    src="https://visitaecuadorinfluencer.com/img/contenido/articulos/adhesionembajador.gif"
                                    alt="Embajador VisitaEcuador"
                                    className={styles.heroImage}
                                />
                            </div>
                            <div>
                                <Title level={2} className={styles.title}>Sé un Embajador de VisitaEcuador</Title>
                                <Paragraph className={styles.subtitle}>
                                    Únete a nuestra red de influencers comprometidos con promover las maravillas de
                                    Ecuador
                                </Paragraph>
                                <Button type="primary" size="large" className={styles.applyButton}>
                                    Aplica Ahora
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]} className={styles.sectionRow}>
                <Col span={24}>
                    <Title level={3} className={styles.sectionTitle}>¿Qué significa ser un Embajador?</Title>
                    <Paragraph className={styles.paragraph}>
                        Los embajadores de VisitaEcuador Influencer son creadores de contenido apasionados por mostrar
                        la belleza, cultura y experiencias únicas que ofrece nuestro país. Como embajador, serás parte
                        de una comunidad selecta que tiene acceso a oportunidades exclusivas y recursos para crecer
                        profesionalmente mientras promueves Ecuador.
                    </Paragraph>
                </Col>

                <Col span={24}>
                    <Title level={3} className={styles.sectionTitle}>Beneficios de ser Embajador</Title>
                    <Row gutter={[16, 16]}>
                        {benefits.map((benefit, index) => (
                            <Col xs={24} sm={12} md={6} key={index}>
                                <Card className={styles.benefitCard}>
                                    <div className={styles.benefitIcon}>
                                        <img src={benefit.icon} alt={benefit.title} width={40}/>
                                    </div>
                                    <Title level={4} className={styles.benefitTitle}>{benefit.title}</Title>
                                    <Paragraph className={styles.benefitDesc}>{benefit.description}</Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col span={24}>
                    <Title level={3} className={styles.sectionTitle}>Requisitos</Title>
                    <Card className={styles.requirementsCard}>
                        <List
                            itemLayout="horizontal"
                            dataSource={[
                                "Tener una comunidad activa en redes sociales",
                                "Crear contenido relacionado con turismo, cultura o gastronomía",
                                "Compartir valores alineados con VisitaEcuador Influencer",
                                "Compromiso de generar contenido de calidad regularmente",
                                "Residir en Ecuador o tener fuerte conexión con el país"
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{backgroundColor: '#96C121', color: 'white'}}>✓</Avatar>}
                                        title={<Text className={styles.requirementText}>{item}</Text>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col span={24}>
                    <Title level={3} className={styles.sectionTitle}>Testimonios de Embajadores</Title>
                    <Row gutter={[16, 16]}>
                        {testimonials.map((testimonial, index) => (
                            <Col xs={24} md={12} key={index}>
                                <Card className={styles.testimonialCard}>
                                    <div className={styles.testimonialHeader}>
                                        <Avatar src={testimonial.avatar} size={64}/>
                                        <div className={styles.testimonialInfo}>
                                            <Text strong>{testimonial.name}</Text>
                                            <Tag color="#96C121">{testimonial.location}</Tag>
                                        </div>
                                    </div>
                                    <Paragraph className={styles.testimonialContent}>
                                        "{testimonial.content}"
                                    </Paragraph>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col span={24} className={styles.ctaSection}>
                    <Card className={styles.ctaCard}>
                        <Title level={3}>¿Listo para ser parte de VisitaEcuador Influencer?</Title>
                        <Paragraph>
                            Completa tu solicitud hoy y comienza tu viaje como embajador oficial.
                        </Paragraph>
                        <Button type="primary" size="large" className={styles.applyButton}>
                            Aplica Ahora
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default SerEmbajador;
