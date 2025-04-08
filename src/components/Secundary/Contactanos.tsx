import { useState, useRef } from "react";
import {Row, Col, Card, Button} from "antd";
import {PhoneOutlined, EnvironmentOutlined, MailOutlined, WhatsAppOutlined} from "@ant-design/icons";
import styles from "../styles/ContactoSubmenu.module.css";
import ContactForm from "./Contactanos/ContactForm";

const Contacto = () => {
    const [contactMethod, setContactMethod] = useState<"whatsapp" | "email">("whatsapp");
    const mapRef = useRef<HTMLDivElement>(null);

    const whatsappNumber = "593985862555";
    const emailAddress = "info@visitaecuadorinfluencer.com";

    const scrollToMap = () => {
        mapRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className={styles.contactoContainer}>
            <div className={styles.contactoHeader}>
                <h1 style={{
                    textTransform:'uppercase',
                    fontSize: '24px',
                    color:'black'
                }}>
                    <PhoneOutlined className="titleIcon"
                                   style={{color: '#ff4d4f', fontSize: '24px', gap: '10px', marginRight: '10px'}}/>
                    Contáctanos</h1>
                <p>Estamos aquí para responder tus preguntas sobre VisitaEcuador Influencer</p>
            </div>

            <Row gutter={[32, 32]} className={styles.contactContent}>
                <Col xs={24} md={10}>
                    <div className={styles.contactInfo}>
                        <Card className={styles.contactCard}>
                            <h2 style={{color:'black'}}>Información de Contacto</h2>
                            <p>Comunícate con nosotros a través de cualquiera de los siguientes medios:</p>

                            <div
                                className={`${styles.contactItem} ${contactMethod === "whatsapp" ? styles.activeMethod : ""}`}
                                onClick={() => setContactMethod("whatsapp")}
                                style={{ cursor: "pointer" }}
                            >
                                <WhatsAppOutlined className={styles.contactIcon} />
                                <div>
                                    <h3>WhatsApp</h3>
                                    <p>+593 99 123 4567</p>
                                </div>
                            </div>

                            <div
                                className={`${styles.contactItem} ${contactMethod === "email" ? styles.activeMethod : ""}`}
                                onClick={() => setContactMethod("email")}
                                style={{ cursor: "pointer" }}
                            >
                                <MailOutlined className={styles.contactIcon} />
                                <div>
                                    <h3>Email</h3>
                                    <p>{emailAddress}</p>
                                </div>
                            </div>

                            <div
                                className={styles.contactItem}
                                onClick={scrollToMap}
                                style={{ cursor: "pointer" }}
                            >
                                <EnvironmentOutlined className={styles.contactIcon} />
                                <div>
                                    <h3>Dirección</h3>
                                    <p>Av. Francisco de Orellana, Guayaquil, Ecuador</p>
                                </div>
                            </div>

                            <div className={styles.socialIcons}>
                                <Button type="link" shape="circle" icon={<span className="icon-facebook"></span>} />
                                <Button type="link" shape="circle" icon={<span className="icon-twitter"></span>} />
                                <Button type="link" shape="circle" icon={<span className="icon-instagram"></span>} />
                                <Button type="link" shape="circle" icon={<span className="icon-youtube"></span>} />
                            </div>
                        </Card>
                    </div>
                </Col>

                <Col xs={24} md={14}>
                    <ContactForm
                        contactMethod={contactMethod}
                        whatsappNumber={whatsappNumber}
                            emailAddress={emailAddress}
                            emailJsServiceId="your_actual_service_id"
                            emailJsTemplateId="your_actual_template_id"
                            emailJsUserId="your_actual_user_id"
                    />
                </Col>
            </Row>

            <div className={styles.mapContainer} ref={mapRef}>
                <h2>Encuéntranos</h2>
                <div className={styles.map}>
                    <div className={styles.placeholderMap}>
                        <EnvironmentOutlined className={styles.mapMarker} />
                        <p>Mapa de ubicación</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
