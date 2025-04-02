import React from 'react';
import imgP from '../../assets/img_6.png'
import { Layout, Row, Col, Typography } from 'antd';
import {
    InstagramOutlined,
    WhatsAppOutlined,
    YoutubeFilled,
    TikTokOutlined,
    XOutlined,
    LinkedinFilled,
    FacebookFilled
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/footer.module.css';

const { Footer } = Layout;
const { Link, Text } = Typography;

const AppFooter: React.FC = () => {
    const navigate = useNavigate();

    const socialLinks = [
        {
            icon: <FacebookFilled className={styles.socialIcon}/>,
            url: 'https://www.facebook.com/visitaecuadorcom'
        },
        {
            icon: <InstagramOutlined className={styles.socialIcon} />,
            url: 'https://www.instagram.com/movimientovisitaecuador/'
        },
        {
            icon: <WhatsAppOutlined className={styles.socialIcon} />,
            url: '#'
        },
        {
            icon: <YoutubeFilled className={styles.socialIcon} />,
            url: 'https://www.youtube.com/user/MovimientoVE'
        },
        {
            icon: <XOutlined className={styles.socialIcon} />,
            url: 'https://x.com/i/flow/login?redirect_after_login=%2Fmovimientove'
        },
        {
            icon: <TikTokOutlined className={styles.socialIcon} />,
            url: 'https://x.com/i/flow/login?redirect_after_login=%2Fmovimientove'
        },
        {
            icon: <LinkedinFilled className={styles.socialIcon} />,
            url: 'https://x.com/i/flow/login?redirect_after_login=%2Fmovimientove'
        }
    ];

    const bottomLinks = [
        {
            title: 'Influencer',
            links: [
                { text: 'Presentación', url: '/presentacion' },
                { text: 'Ser Embajador', url: '/ser-embajador' },
                { text: 'Videos', url: '/dashboard?section=videos' },
                { text: 'Canción', url: '/dashboard?section=cancion' }
            ]
        },
        {
            title: 'Adherentes',
            links: [
                { text: 'Beneficios', url: '/beneficios' },
                { text: 'Adhesión', url: '/adhesion' },
                { text: 'Medios', url: '/medios' }
            ]
        },
        {
            title: 'Menú Principal',
            links: [
                { text: 'Inicio', url: '/dashboard' },
                { text: 'Contáctanos', url: '/contacto' }
            ]
        },
        {
            title: 'Legal',
            links: [
                { text: 'Políticas de privacidad', url: '/privacidad' },
                { text: 'Términos y condiciones', url: '/terminos' }
            ]
        }
    ];

    return (
        <Footer className={styles.footer}>
            <Row className={styles.bottomSection}>
                <Col xs={24} lg={{span: 18, offset: 3}}>
                    <Row gutter={[24, 24]} justify="space-between">
                        {bottomLinks.map((section, index) => (
                            <Col xs={12} sm={8} md={4} key={index}>
                                <div className={styles.bottomSectionTitle}>
                                    {section.title}
                                </div>
                                <ul className={styles.bottomLinksList}>
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex} style={{marginBottom: '5px'}}>
                                            <Link
                                                onClick={() => navigate(link.url)}
                                                className={styles.bottomLink}
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <div className={styles.logoFooter}>
                <img src={imgP} alt="Visita Ecuador Logo" className={styles.logoFooter} />
            </div>
            <div className={styles.socialSection}>
                <div className={styles.socialLinks}>
                    {socialLinks.map((social, index) => (
                        <Link
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {social.icon}
                        </Link>
                    ))}
                </div>
                <div className={styles.copysection}>
                <Text className={styles.copyright} style={{fontSize:10  }}>
                    Copyright © {new Date().getFullYear()} VisitaEcuador.com. Todos los derechos reservados.
                </Text>
                <br/>
                <Text className={styles.companyInfo} style={{fontSize:10}}>
                    VisitaEcuador.com forma parte de Aracno Cia. Ltda., líder nacional en viajes online y servicios
                    relacionados.
                </Text>
                </div>
            </div>

            <div className={styles.whatsappButton}>
                <Link href="https://api.whatsapp.com/send/?phone=593981850436&text&type=phone_number&app_absent=0"
                      target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://visitaecuador.com/img/web/central.svg"
                        alt="Visita Ecuador"
                        className={styles.whatsappIcon}
                    />
                </Link>
            </div>
        </Footer>
    );
};

export default AppFooter;
