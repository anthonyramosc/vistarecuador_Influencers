import { useEffect } from "react";
import styles from '../../styles/Presentacion.module.css';
import { Card, Row, Col, Typography, Tabs } from 'antd';
import { HomeOutlined, AimOutlined, EyeOutlined, BulbOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const Presentacion = () => {
    useEffect(() => {
        window.scrollTo(0, 0);

        document.title = "Presentación - VisitaEcuador Influencer";
    }, []);

    return (
        <div className={styles.presentacionContainer}>
            <Card className={styles.headerCard}>
                <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} md={8}>
                        <img
                            src="https://visitaecuador.com/img/web/ve_quees.png"
                            alt="VisitaEcuador Influencer"
                            className={styles.headerImage}
                        />
                    </Col>
                    <Col xs={24} md={16}>
                        <Title level={2}>Movimiento VisitaEcuador Influencer</Title>
                        <Paragraph className={styles.headerDescription}>
                            VisitaEcuador Influencer nace con un objetivo claro: profesionalizar el trabajo de los influencers en Ecuador y promover el turismo responsable en nuestro hermoso país, destacando su riqueza cultural, natural y gastronómica.
                        </Paragraph>
                    </Col>
                </Row>
            </Card>



            <Tabs defaultActiveKey="quienes-somos" className={styles.tabs}>
                <TabPane
                    tab={<span><TeamOutlined /> Quiénes Somos</span>}
                    key="quienes-somos"
                >
                    <Card className={styles.contentCard}>
                        <Title level={3}>Quiénes Somos</Title>
                        <Paragraph>
                            Somos un movimiento nacido en Ecuador con la visión de transformar la manera en que se promociona nuestro país. Reunimos a entusiastas, profesionales y creativos comprometidos con mostrar al mundo la verdadera esencia ecuatoriana.
                        </Paragraph>
                        <Paragraph>
                            VisitaEcuador Influencer es una comunidad que conecta a creadores de contenido con empresas turísticas, culturales y gastronómicas para generar experiencias auténticas que inspiren tanto a ecuatorianos como extranjeros a descubrir cada rincón de nuestro territorio.
                        </Paragraph>
                        <Row gutter={[24, 24]} className={styles.imageGallery}>
                            <Col xs={24} md={12}>
                                <img
                                    src="https://visitaecuador.com/img/web/ve_testimonios.png"
                                    alt="Comunidad VisitaEcuador"
                                    className={styles.galleryImage}
                                />
                            </Col>
                            <Col xs={24} md={12}>
                                <img
                                    src="https://visitaecuador.com/img/web/dc_quees.png"
                                    alt="Experiencias VisitaEcuador"
                                    className={styles.galleryImage}
                                />
                            </Col>
                        </Row>
                    </Card>
                </TabPane>

                <TabPane
                    tab={<span><AimOutlined /> Misión</span>}
                    key="mision"
                >
                    <Card className={styles.contentCard}>
                        <Title level={3}>Nuestra Misión</Title>
                        <Paragraph>
                            Contribuir comprometidamente con el desarrollo turístico del Ecuador, conscientes de la importancia de generar un sentido de pertenencia y amor al país como una de las bases para una vida equilibrada, a partir de actividades familiares, turisticas, sociales, de protección y conservación en el marco de nuestros valores.
                        </Paragraph>
                        <Paragraph>
                            Buscamos:
                        </Paragraph>
                        <ul className={styles.bulletPoints}>
                            <li>Profesionalizar el trabajo de los influencers ecuatorianos.</li>
                            <li>Crear una red colaborativa entre creadores de contenido y empresas turísticas.</li>
                            <li>Generar contenido de calidad que represente fielmente las maravillas de Ecuador.</li>
                            <li>Impulsar el turismo interno y externo con estrategias innovadoras y responsables.</li>
                            <li>Contribuir al desarrollo económico de comunidades locales a través del turismo responsable.</li>
                        </ul>
                        <img
                            src="https://visitaecuador.com/ve/img/contenido/informacion/thum500x500/river_garden_hotel_suites_240403124903_0.jpg"
                            alt="Misión VisitaEcuador"
                            className={styles.fullWidthImage}
                        />
                    </Card>
                </TabPane>

                <TabPane
                    tab={<span><EyeOutlined /> Visión</span>}
                    key="vision"
                >
                    <Card className={styles.contentCard}>
                        <Title level={3}>Nuestra Visión</Title>
                        <Paragraph>
                            Ser el movimiento líder en la promoción turística de Ecuador, reconocido internacionalmente por la calidad y autenticidad de su contenido, logrando posicionar al país como un destino turístico de primera categoría a nivel mundial.
                        </Paragraph>
                        <Paragraph>
                            Para 2030, aspiramos a:
                        </Paragraph>
                        <ul className={styles.bulletPoints}>
                            <li>Contar con una red de más de 1,000 influencers certificados y profesionales.</li>
                            <li>Ser referentes en la creación de contenido turístico sostenible en Latinoamérica.</li>
                            <li>Incrementar significativamente el flujo turístico hacia Ecuador, contribuyendo al desarrollo económico del país.</li>
                            <li>Establecer estándares de calidad y ética para los creadores de contenido turístico.</li>
                            <li>Desarrollar programas educativos que formen nuevas generaciones de influencers responsables.</li>
                        </ul>
                        <img
                            src="https://visitaecuador.com/ve/img/contenido/informacion/thum500x500/hotel_wyndham_garden_guayaquil_Phzjs_0.jpg"
                            alt="Visión VisitaEcuador"
                            className={styles.fullWidthImage}
                        />
                    </Card>
                </TabPane>

                <TabPane
                    tab={<span><BulbOutlined /> Objetivos</span>}
                    key="objetivos"
                >
                    <Card className={styles.contentCard}>
                        <Title level={3}>Nuestros Objetivos</Title>
                        <Row gutter={[24, 24]} className={styles.objectivesContainer}>
                            <Col xs={24} md={8}>
                                <Card className={styles.objectiveCard}>
                                    <Title level={4}>Corto Plazo</Title>
                                    <ul className={styles.bulletPoints}>
                                        <li>Incorporar y capacitar a 100 nuevos influencers en técnicas de creación de contenido turístico responsable.</li>
                                        <li>Desarrollar alianzas estratégicas con al menos 50 empresas turísticas ecuatorianas.</li>
                                        <li>Lanzar campañas de promoción para destinos menos conocidos pero con alto potencial turístico.</li>
                                        <li>Implementar un programa de certificación para influencers de turismo.</li>
                                    </ul>
                                </Card>
                            </Col>
                            <Col xs={24} md={8}>
                                <Card className={styles.objectiveCard}>
                                    <Title level={4}>Mediano Plazo</Title>
                                    <ul className={styles.bulletPoints}>
                                        <li>Expandir nuestra red a 500 influencers activos en toda la región andina.</li>
                                        <li>Crear una plataforma digital interactiva que conecte experiencias turísticas con creadores de contenido.</li>
                                        <li>Establecer programas de intercambio con influencers internacionales para ampliar el alcance global.</li>
                                        <li>Desarrollar contenido multimedia en múltiples idiomas para mercados específicos.</li>
                                    </ul>
                                </Card>
                            </Col>
                            <Col xs={24} md={8}>
                                <Card className={styles.objectiveCard}>
                                    <Title level={4}>Largo Plazo</Title>
                                    <ul className={styles.bulletPoints}>
                                        <li>Lograr un aumento del 30% en el turismo receptivo hacia Ecuador atribuible a nuestras campañas.</li>
                                        <li>Crear un instituto de formación para nuevos creadores de contenido especializados en turismo sostenible.</li>
                                        <li>Desarrollar proyectos de turismo comunitario en las cuatro regiones del Ecuador con participación directa de influencers locales.</li>
                                        <li>Posicionar a Ecuador entre los 15 destinos turísticos más deseados de América.</li>
                                    </ul>
                                </Card>
                            </Col>
                        </Row>
                        <img
                            src="https://visitaecuador.com/ve/img/contenido/informacion/thum500x500/villa_ana_maria_240249120149_0.jpg"
                            alt="Objetivos VisitaEcuador"
                            className={styles.fullWidthImage}
                        />
                    </Card>
                </TabPane>
            </Tabs>

            <Card className={styles.joinCard}>
                <Title level={3}>¡Sé parte del movimiento!</Title>
                <Paragraph>
                    Si compartes nuestra pasión por Ecuador y quieres formar parte de esta comunidad de creadores de contenido comprometidos con la promoción responsable de nuestro país, te invitamos a unirte a nosotros.
                </Paragraph>
                <div className={styles.joinButtons}>
                    <button
                        className={styles.primaryButton}
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent("menuClick", { detail: { menuItem: 'serEmbajador' } }));
                            setTimeout(() => {
                                window.dispatchEvent(new Event("serEmbajadorClick"));
                            }, 100);
                        }}
                    >
                        Ser Embajador
                    </button>
                    <button
                        className={styles.secondaryButton}
                        onClick={() => window.location.href = '/contacto'}
                    >
                        Contáctanos
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Presentacion;
