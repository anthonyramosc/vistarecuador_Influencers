import React, { useState } from 'react';
import { Form, Input, Button, Select, Checkbox, message } from 'antd';
import styles from '../../styles/adherentes.module.css';
import {TeamOutlined} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

interface FormValues {
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    ciudad: string;
    provincia: string;
    especialidad: string;
    redesSociales: {
        instagram?: string;
        youtube?: string;
        tiktok?: string;
        facebook?: string;
    };
    descripcion: string;
    terminosCondiciones: boolean;
}

const Adhesion: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const provincias = [
        'Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi',
        'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas', 'Imbabura', 'Loja',
        'Los Ríos', 'Manabí', 'Morona Santiago', 'Napo', 'Orellana', 'Pastaza',
        'Pichincha', 'Santa Elena', 'Santo Domingo de los Tsáchilas', 'Sucumbíos', 'Tungurahua', 'Zamora Chinchipe'
    ];

    const especialidades = [
        'Turismo', 'Gastronomía', 'Fotografía', 'Aventura', 'Cultura', 'Naturaleza',
        'Historia', 'Deportes', 'Música', 'Arte', 'Moda', 'Tecnología', 'Otro'
    ];

    const onFinish = (values: FormValues) => {
        setLoading(true);

        setTimeout(() => {
            console.log('Valores del formulario:', values);
            message.success('¡Formulario enviado con éxito! Pronto recibirás un correo con tu código de identificación.');
            form.resetFields();
            setLoading(false);
        }, 1500);
    };

    return (
        <div className={styles.adhesionContainer}>
            <h2 className="sectionTitle" style={{
                fontSize: '24px',
                color: '#333',
                marginBottom: '8px',
                textAlign: 'center',
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontWeight: 700
            }}>
                <TeamOutlined className="titleIcon"
                              style={{color: '#ff4d4f', fontSize: '24px', gap: '10px', marginRight: '10px'}}/>
                Adhesion
            </h2>
            <div className={styles.adhesionInfo}>
                <div className={styles.adhesionImage}>
                    <img src="https://visitaecuadorinfluencer.com/img/contenido/articulos/adhesionpersonanatural.gif" alt="Adhesión"/>
                </div>

                <div className={styles.adhesionDescription}>
                    <p>
                        Es libre, voluntaria y no contempla costo alguno; simplemente
                        requiere llenar un formulario con sus datos personales y forma de
                        contacto a través de nuestro Website. El nuevo adherente recibe un
                        código de identificación con el que podrá validar su participación en
                        los proyectos, eventos, promociones y demás actividades del
                        Movimiento.
                    </p>
                </div>
            </div>

            <div className={styles.formContainer}>
                <h3 className={styles.formTitle}>Formulario de Adhesión</h3>

                <Form
                    form={form}
                    name="adhesion_form"
                    layout="vertical"
                    onFinish={onFinish}
                    className={styles.form}
                >
                    <div className={styles.formRow}>
                        <Form.Item
                            name="nombres"
                            label="Nombres"
                            rules={[{required: true, message: 'Por favor ingresa tus nombres'}]}
                            className={styles.formItem}
                        >
                            <Input placeholder="Ingresa tus nombres"/>
                        </Form.Item>

                        <Form.Item
                            name="apellidos"
                            label="Apellidos"
                            rules={[{required: true, message: 'Por favor ingresa tus apellidos'}]}
                            className={styles.formItem}
                        >
                            <Input placeholder="Ingresa tus apellidos"/>
                        </Form.Item>
                    </div>

                    <div className={styles.formRow}>
                        <Form.Item
                            name="email"
                            label="Correo Electrónico"
                            rules={[
                                {required: true, message: 'Por favor ingresa tu correo electrónico'},
                                {type: 'email', message: 'Ingresa un correo electrónico válido'}
                            ]}
                            className={styles.formItem}
                        >
                            <Input placeholder="ejemplo@correo.com"/>
                        </Form.Item>

                        <Form.Item
                            name="telefono"
                            label="Teléfono"
                            rules={[{required: true, message: 'Por favor ingresa tu número de teléfono'}]}
                            className={styles.formItem}
                        >
                            <Input placeholder="Ingresa tu número de teléfono"/>
                        </Form.Item>
                    </div>

                    <div className={styles.formRow}>
                        <Form.Item
                            name="provincia"
                            label="Provincia"
                            rules={[{required: true, message: 'Por favor selecciona tu provincia'}]}
                            className={styles.formItem}
                        >
                            <Select placeholder="Selecciona tu provincia">
                                {provincias.map(provincia => (
                                    <Option key={provincia} value={provincia}>{provincia}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="ciudad"
                            label="Ciudad"
                            rules={[{required: true, message: 'Por favor ingresa tu ciudad'}]}
                            className={styles.formItem}
                        >
                            <Input placeholder="Ingresa tu ciudad"/>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="especialidad"
                        label="Especialidad como Creador de Contenido"
                        rules={[{required: true, message: 'Por favor selecciona tu especialidad'}]}
                    >
                        <Select placeholder="Selecciona tu especialidad">
                            {especialidades.map(especialidad => (
                                <Option key={especialidad} value={especialidad}>{especialidad}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <h4 className={styles.redesTitle}>Redes Sociales (incluye tu nombre de usuario)</h4>

                    <div className={styles.formRow}>
                        <Form.Item
                            name={['redesSociales', 'instagram']}
                            label="Instagram"
                            className={styles.formItem}
                        >
                            <Input placeholder="@usuario"/>
                        </Form.Item>

                        <Form.Item
                            name={['redesSociales', 'tiktok']}
                            label="TikTok"
                            className={styles.formItem}
                        >
                            <Input placeholder="@usuario"/>
                        </Form.Item>
                    </div>

                    <div className={styles.formRow}>
                        <Form.Item
                            name={['redesSociales', 'youtube']}
                            label="Youtube"
                            className={styles.formItem}
                        >
                            <Input placeholder="Canal de Youtube"/>
                        </Form.Item>

                        <Form.Item
                            name={['redesSociales', 'facebook']}
                            label="Facebook"
                            className={styles.formItem}
                        >
                            <Input placeholder="Perfil de Facebook"/>
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="descripcion"
                        label="Cuéntanos más sobre ti y tu contenido"
                        rules={[{required: true, message: 'Por favor describe tu perfil como creador de contenido'}]}
                    >
                        <TextArea
                            placeholder="Describe brevemente tu experiencia como creador de contenido, temas que abordas, proyectos realizados, etc."
                            rows={4}
                        />
                    </Form.Item>

                    <Form.Item
                        name="terminosCondiciones"
                        valuePropName="checked"
                        rules={[{
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject('Debes aceptar los términos y condiciones')
                        }]}
                    >
                        <Checkbox>
                            Acepto los <a href="#" className={styles.link}>términos y condiciones</a> del programa
                            VisitaEcuador Influencer
                        </Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className={styles.submitButton}
                        >
                            Enviar Solicitud
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Adhesion;
