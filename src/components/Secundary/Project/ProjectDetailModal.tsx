import React, { useState } from "react";
import { Modal, Button, Typography, Divider, Tag, Row, Col, Image, Space, Badge, Progress, Avatar } from "antd";
import {
    UserOutlined,
    StarFilled,
    ClockCircleOutlined,
    EyeOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    TagOutlined,
    CodeOutlined,
    TeamOutlined,
    LinkOutlined,
    GithubOutlined
} from '@ant-design/icons';
import { ProjectCard } from "../../../interfaces/interfaces.ts";

const { Title, Paragraph, Text } = Typography;

interface ProjectDetailModalProps {
    project: ProjectCard | null;
    visible: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
    hasNext?: boolean;
    hasPrevious?: boolean;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
                                                                   project,
                                                                   visible,
                                                                   onClose,
                                                                   onNext,
                                                                   onPrevious,
                                                                   hasNext = false,
                                                                   hasPrevious = false
                                                               }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    if (!project) return null;

    const generateTags = () => {
        const possibleTags = [
            { name: "React", color: "#61dafb", bgColor: "#e6f7ff" },
            { name: "TypeScript", color: "#3178c6", bgColor: "#e6f7ff" },
            { name: "UI/UX", color: "#ff4d4f", bgColor: "#fff1f0" },
            { name: "Frontend", color: "#722ed1", bgColor: "#f9f0ff" },
            { name: "Innovación", color: "#13c2c2", bgColor: "#e6fffb" },
            { name: "Móvil", color: "#fa8c16", bgColor: "#fff7e6" },
            { name: "Diseño", color: "#eb2f96", bgColor: "#fff0f6" },
            { name: "Web", color: "#1890ff", bgColor: "#e6f7ff" },
            { name: "API", color: "#52c41a", bgColor: "#f6ffed" }
        ];
        const numTags = Math.floor(Math.random() * 3) + 2;
        const tags = [];

        for (let i = 0; i < numTags; i++) {
            const randomIndex = Math.floor(Math.random() * possibleTags.length);
            if (!tags.find(tag => tag.name === possibleTags[randomIndex].name)) {
                tags.push(possibleTags[randomIndex]);
            }
        }

        return tags;
    };

    const renderRating = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarFilled
                    key={i}
                    style={{
                        color: i <= rating ? '#faad14' : '#d9d9d9',
                        fontSize: '18px'
                    }}
                />
            );
        }
        return stars;
    };

    const projectDate = new Date().toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const projectViews = Math.floor(Math.random() * 1000) + 500;
    const tags = generateTags();

    const projectProgress = Math.floor(Math.random() * 30) + 70; // Random progress between 70-100%


    const teamMembers = [
        { name: "Ana García", role: "Lead Developer", avatar: "https://randomuser.me/api/portraits/women/82.jpg" },
        { name: "Daniel P.", role: "UI Designer", avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
        { name: "Sofía G.", role: "Scrum Master", avatar: "https://randomuser.me/api/portraits/women/39.jpg" },
        { name: "Roberto C.", role: "Jr Developer", avatar: "https://randomuser.me/api/portraits/men/19.jpg" },
        { name: "Natalia F.", role: "Backend Developer", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
        { name: "Alejandro T.", role: "Frontend Developer", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
    ];

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            centered
            className="project-detail-modal"
            bodyStyle={{ padding: 0, borderRadius: '12px', overflow: 'hidden' }}
            style={{ borderRadius: '12px', overflow: 'hidden' }}
        >
            <div style={{ position: 'relative' }}>
                <div
                    style={{
                        height: '300px',
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundColor: '#f0f2f5',
                    }}
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        preview={false}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'brightness(0.8)',
                        }}
                        onLoad={() => setImageLoaded(true)}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '80px 32px 24px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                            transition: 'opacity 0.3s ease',
                            opacity: imageLoaded ? 1 : 0,
                        }}
                    >
                        <Title level={2} style={{ color: 'white', margin: 0 }}>
                            {project.title}
                        </Title>
                        <div style={{ display: 'flex', alignItems: 'center', color: 'white', marginTop: '8px' }}>
                            <UserOutlined style={{ marginRight: 8 }} />
                            <Text style={{ color: 'white' }}>{project.author}</Text>
                            <Divider type="vertical" style={{ backgroundColor: 'rgba(255,255,255,0.5)', margin: '0 12px' }} />
                            <div style={{ display: 'flex' }}>
                                {renderRating(project.rating || 0)}
                            </div>
                        </div>
                    </div>

                    {hasPrevious && (
                        <Button
                            type="text"
                            shape="circle"
                            icon={<ArrowLeftOutlined />}
                            onClick={onPrevious}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: 16,
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: 'none',
                                zIndex: 10,
                            }}
                        />
                    )}

                    {hasNext && (
                        <Button
                            type="text"
                            shape="circle"
                            icon={<ArrowRightOutlined />}
                            onClick={onNext}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: 16,
                                transform: 'translateY(-50%)',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: 'none',
                                zIndex: 10,
                            }}
                        />
                    )}
                </div>

                <div style={{ padding: '24px 32px' }}>
                    <div style={{
                        display: 'flex',
                        borderBottom: '1px solid #f0f0f0',
                        marginBottom: '24px',
                        paddingBottom: '12px'
                    }}>
                        <div
                            style={{
                                cursor: 'pointer',
                                marginRight: '24px',
                                padding: '0 8px 12px 8px',
                                fontWeight: activeTab === 'description' ? 'bold' : 'normal',
                                color: activeTab === 'description' ? '#1890ff' : 'inherit',
                                borderBottom: activeTab === 'description' ? '2px solid #1890ff' : 'none',
                            }}
                            onClick={() => setActiveTab('description')}
                        >
                            Descripción
                        </div>
                        <div
                            style={{
                                cursor: 'pointer',
                                marginRight: '24px',
                                padding: '0 8px 12px 8px',
                                fontWeight: activeTab === 'details' ? 'bold' : 'normal',
                                color: activeTab === 'details' ? '#1890ff' : 'inherit',
                                borderBottom: activeTab === 'details' ? '2px solid #1890ff' : 'none',
                            }}
                            onClick={() => setActiveTab('details')}
                        >
                            Detalles
                        </div>
                        <div
                            style={{
                                cursor: 'pointer',
                                padding: '0 8px 12px 8px',
                                fontWeight: activeTab === 'team' ? 'bold' : 'normal',
                                color: activeTab === 'team' ? '#1890ff' : 'inherit',
                                borderBottom: activeTab === 'team' ? '2px solid #1890ff' : 'none',
                            }}
                            onClick={() => setActiveTab('team')}
                        >
                            Equipo
                        </div>
                    </div>

                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                <TagOutlined style={{ color: '#1890ff', marginRight: '8px', fontSize: '18px' }} />
                                <Text strong style={{ fontSize: '16px' }}>Tecnologías</Text>
                            </div>
                            <div>
                                {tags.map((tag, index) => (
                                    <Tag
                                        key={index}
                                        style={{
                                            marginRight: 8,
                                            marginBottom: 8,
                                            borderRadius: '16px',
                                            padding: '6px 14px',
                                            backgroundColor: tag.bgColor,
                                            color: tag.color,
                                            border: `1px solid ${tag.color}20`,
                                            fontSize: '14px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                            transition: 'all 0.3s',
                                            cursor: 'pointer',
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        {tag.name}
                                    </Tag>
                                ))}
                            </div>
                        </div>

                        {activeTab === 'description' && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                    <CodeOutlined style={{ color: '#1890ff', marginRight: '8px', fontSize: '18px' }} />
                                    <Title level={4} style={{ margin: 0 }}>Descripción del Proyecto</Title>
                                </div>
                                <Paragraph style={{
                                    fontSize: '16px',
                                    lineHeight: '1.8',
                                    backgroundColor: '#f9f9f9',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    border: '1px solid #f0f0f0'
                                }}>
                                    <Text strong>{project.description}</Text>
                                    <br/><br/>
                                    Este proyecto innovador representa una solución avanzada para satisfacer las necesidades de nuestros clientes.
                                    Desarrollado con las tecnologías más recientes y siguiendo las mejores prácticas de diseño UX/UI,
                                    este proyecto demuestra nuestro compromiso con la calidad y la innovación.
                                    <br/><br/>
                                    Los usuarios pueden interactuar con una interfaz intuitiva que facilita la navegación y uso de todas las funcionalidades.
                                    Hemos implementado un enfoque centrado en el usuario para garantizar la mejor experiencia posible.
                                </Paragraph>

                                <div style={{
                                    marginTop: '24px',
                                    backgroundColor: '#f0f7ff',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    border: '1px solid #d6e4ff'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <Text strong>Estado del Proyecto</Text>
                                        <Badge
                                            status="processing"
                                            text={<Text style={{ color: '#1890ff' }}>En Desarrollo</Text>}
                                        />
                                    </div>
                                    <Progress
                                        percent={projectProgress}
                                        status="active"
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'details' && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                    <ClockCircleOutlined style={{ color: '#1890ff', marginRight: '8px', fontSize: '18px' }} />
                                    <Title level={4} style={{ margin: 0 }}>Detalles del Proyecto</Title>
                                </div>

                                <Row gutter={[24, 24]}>
                                    <Col xs={24} md={12}>
                                        <div style={{
                                            padding: '16px',
                                            backgroundColor: '#f6ffed',
                                            borderRadius: '8px',
                                            border: '1px solid #b7eb8f'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                <ClockCircleOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                                                <Text strong>Fecha de publicación</Text>
                                            </div>
                                            <Text>{projectDate}</Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <div style={{
                                            padding: '16px',
                                            backgroundColor: '#fff2e8',
                                            borderRadius: '8px',
                                            border: '1px solid #ffcb91'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                <EyeOutlined style={{ marginRight: 8, color: '#fa8c16' }} />
                                                <Text strong>Vistas</Text>
                                            </div>
                                            <Text>{projectViews.toLocaleString()}</Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <div style={{
                                            padding: '16px',
                                            backgroundColor: '#f9f0ff',
                                            borderRadius: '8px',
                                            border: '1px solid #d3adf7'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                <StarFilled style={{ marginRight: 8, color: '#722ed1' }} />
                                                <Text strong>Valoración</Text>
                                            </div>
                                            <div>{renderRating(project.rating || 0)}</div>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <div style={{
                                            padding: '16px',
                                            backgroundColor: '#e6fffb',
                                            borderRadius: '8px',
                                            border: '1px solid #87e8de'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                <LinkOutlined style={{ marginRight: 8, color: '#13c2c2' }} />
                                                <Text strong>Enlaces</Text>
                                            </div>
                                            <Space>
                                                <Button type="link" icon={<GithubOutlined />} size="small">
                                                    GitHub
                                                </Button>
                                                <Button type="link" icon={<LinkOutlined />} size="small">
                                                    Demo
                                                </Button>
                                            </Space>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )}

                        {activeTab === 'team' && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                                    <TeamOutlined style={{ color: '#1890ff', marginRight: '8px', fontSize: '18px' }} />
                                    <Title level={4} style={{ margin: 0 }}>Equipo del Proyecto</Title>
                                </div>
                                <Row gutter={[16, 16]}>
                                    {teamMembers.map((member, index) => (
                                        <Col xs={24} md={8} key={index}>
                                            <div style={{
                                                padding: '16px',
                                                backgroundColor: '#fff',
                                                borderRadius: '8px',
                                                border: '1px solid #f0f0f0',
                                                textAlign: 'center',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                                transition: 'all 0.3s',
                                                cursor: 'pointer',
                                            }}
                                                 onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                                 onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                            >
                                                <Avatar
                                                    size={64}
                                                    src={member.avatar}
                                                    style={{
                                                        backgroundColor: ['#1890ff', '#52c41a', '#fa8c16'][index % 3],
                                                        marginBottom: '12px'
                                                    }}
                                                />
                                                <div>
                                                    <Text strong style={{ display: 'block', fontSize: '16px' }}>{member.name}</Text>
                                                    <Text type="secondary">{member.role}</Text>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}
                    </Space>
                </div>
            </div>
        </Modal>
    );
};

export default ProjectDetailModal;
