import { useState } from "react";
import { Form, Input, Button, Select, message, Row, Col, Card } from "antd";
import { WhatsAppOutlined, MailOutlined } from "@ant-design/icons";
import emailjs from '@emailjs/browser';
import styles from "../../styles/ContactoSubmenu.module.css";

const { Option } = Select;
const { TextArea } = Input;

interface ContactFormProps {
    contactMethod: "whatsapp" | "email";
    whatsappNumber: string;
    emailAddress: string;
    emailJsServiceId?: string;
    emailJsTemplateId?: string;
    emailJsUserId?: string;
}

const ContactForm = ({
                         contactMethod,
                         whatsappNumber,
                         emailAddress,
                         emailJsServiceId = "your_service_id",
                         emailJsTemplateId = "your_template_id",
                         emailJsUserId = "your_user_id"
                     }: ContactFormProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);

        try {
            if (contactMethod === "whatsapp") {
                sendWhatsAppMessage(values);
            } else {
                await sendEmailMessage(values);
            }
            form.resetFields();
        } catch (error) {
            message.error(`Hubo un problema al procesar tu solicitud. Por favor intenta nuevamente.`);
            console.error(`Error sending ${contactMethod} message:`, error);
        } finally {
            setLoading(false);
        }
    };

    const sendWhatsAppMessage = (values: any) => {
        const formattedMessage = `
            *Nuevo mensaje de contacto*
            *Nombre:* ${values.nombre} ${values.apellido}
            *Email:* ${values.email}
            ${values.telefono ? `*Teléfono:* ${values.telefono}` : ''}
            *Asunto:* ${getAsuntoText(values.asunto)}
            *Mensaje:* ${values.mensaje}
        `.trim();

        const encodedMessage = encodeURIComponent(formattedMessage);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        message.success("Redirigiendo a WhatsApp para completar tu mensaje...");
        window.open(whatsappUrl, '_blank');
    };

    const sendEmailMessage = async (values: any) => {
        try {
            const templateParams = {
                to_email: emailAddress,
                from_name: `${values.nombre} ${values.apellido}`,
                from_email: values.email,
                from_phone: values.telefono || 'No proporcionado',
                subject: getAsuntoText(values.asunto),
                message: values.mensaje
            };

            const response = await emailjs.send(
                emailJsServiceId,
                emailJsTemplateId,
                templateParams,
                emailJsUserId
            );

            if (response.status === 200) {
                message.success("Tu mensaje ha sido enviado con éxito.");
            } else {
                throw new Error(`Failed to send email: ${response.text}`);
            }
        } catch (error) {
            console.error("EmailJS error:", error);
            throw error;
        }
    };

    const getAsuntoText = (asuntoValue: string) => {
        const asuntos: {[key: string]: string} = {
            'informacion': 'Información general',
            'influencer': 'Programa de Influencers',
            'adherentes': 'Programa de Adherentes',
            'soporte': 'Soporte técnico',
            'otro': 'Otro'
        };
        return asuntos[asuntoValue] || asuntoValue;
    };

    const buttonIcon = contactMethod === "whatsapp" ? <WhatsAppOutlined /> : <MailOutlined />;
    const buttonText = contactMethod === "whatsapp" ? "Enviar via WhatsApp" : "Enviar por Email";
    const formTitle = contactMethod === "whatsapp" ?
        "Envíanos un Mensaje via WhatsApp" :
        "Envíanos un Email";
    const formDescription = contactMethod === "whatsapp" ?
        "Complete el formulario y será redirigido a WhatsApp para finalizar su consulta" :
        "Complete el formulario y le responderemos a la brevedad";

    const buttonClassName = contactMethod === "whatsapp"
        ? `${styles.submitButton} ${styles.whatsappButton}`
        : `${styles.submitButton} ${styles.emailButton}`;

    return (
        <Card className={styles.formCard}>
            <h2 style={{color:'black'}}>{formTitle}</h2>
            <p>{formDescription}</p>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className={styles.contactForm}
            >
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="nombre"
                            label="Nombre"
                            rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
                        >
                            <Input placeholder="Tu nombre" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="apellido"
                            label="Apellido"
                            rules={[{ required: true, message: "Por favor ingresa tu apellido" }]}
                        >
                            <Input placeholder="Tu apellido" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: "Por favor ingresa tu email" },
                                { type: "email", message: "Email no válido" }
                            ]}
                        >
                            <Input placeholder="tu@email.com" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="telefono"
                            label="Teléfono"
                        >
                            <Input placeholder="+593 99 123 4567" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="asunto"
                    label="Asunto"
                    rules={[{ required: true, message: "Por favor selecciona un asunto" }]}
                >
                    <Select placeholder="Selecciona un asunto">
                        <Option value="informacion">Información general</Option>
                        <Option value="influencer">Programa de Influencers</Option>
                        <Option value="adherentes">Programa de Adherentes</Option>
                        <Option value="soporte">Soporte técnico</Option>
                        <Option value="otro">Otro</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="mensaje"
                    label="Mensaje"
                    rules={[{ required: true, message: "Por favor escribe tu mensaje" }]}
                >
                    <TextArea rows={4} placeholder="Escribe tu mensaje aquí..." />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={buttonIcon}
                        loading={loading}
                        className={buttonClassName}
                    >
                        {buttonText}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ContactForm;
