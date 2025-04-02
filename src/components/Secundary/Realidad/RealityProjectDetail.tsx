import React from "react";
import { Typography, Progress, Space, Avatar, Tag, Row, Col } from "antd";
import { TeamOutlined, CalendarOutlined, FireOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { RealityCard } from "../../../interfaces/interfaces";

const { Title, Text, Paragraph } = Typography;

interface RealityProjectDetailProps {
    reality: RealityCard;
}

const RealityProjectDetail: React.FC<RealityProjectDetailProps> = ({ reality }) => {

    const projectDataArray = [
        {
            id: 1,
            createdAt: "15 de Marzo, 2025",
            supporters: 87,
            progress: 65,
            goal: 10000,
            current: 6500,
            category: "Comunidad",
            location: "Barcelona, España",
            team: [
                { name: "María G.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
                { name: "Juan P.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
                { name: "Ana R.", avatar: "https://randomuser.me/api/portraits/women/68.jpg" },
            ],
            milestones: [
                { title: "Planificación", completed: true },
                { title: "Diseño", completed: true },
                { title: "Desarrollo", completed: false },
                { title: "Implementación", completed: false }
            ]
        },
        {
            id: 2,
            createdAt: "3 de Febrero, 2025",
            supporters: 124,
            progress: 78,
            goal: 15000,
            current: 11700,
            category: "Educación",
            location: "Madrid, España",
            team: [
                { name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
                { name: "Laura S.", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
                { name: "Pablo D.", avatar: "https://randomuser.me/api/portraits/men/56.jpg" },
                { name: "Elena R.", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
            ],
            milestones: [
                { title: "Investigación", completed: true },
                { title: "Curriculum", completed: true },
                { title: "Materiales", completed: true },
                { title: "Implementación", completed: false },
                { title: "Evaluación", completed: false }
            ]
        },
        {
            id: 3,
            createdAt: "22 de Enero, 2025",
            supporters: 56,
            progress: 42,
            goal: 8000,
            current: 3360,
            category: "Medio Ambiente",
            location: "Valencia, España",
            team: [
                { name: "Marta L.", avatar: "https://randomuser.me/api/portraits/women/17.jpg" },
                { name: "Javier A.", avatar: "https://randomuser.me/api/portraits/men/28.jpg" },
            ],
            milestones: [
                { title: "Estudio de impacto", completed: true },
                { title: "Diseño solución", completed: false },
                { title: "Prueba piloto", completed: false },
                { title: "Expansión", completed: false }
            ]
        },
        {
            id: 4,
            createdAt: "8 de Marzo, 2025",
            supporters: 203,
            progress: 91,
            goal: 12000,
            current: 10920,
            category: "Tecnología",
            location: "Bilbao, España",
            team: [
                { name: "Daniel P.", avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
                { name: "Sofía G.", avatar: "https://randomuser.me/api/portraits/women/39.jpg" },
                { name: "Roberto C.", avatar: "https://randomuser.me/api/portraits/men/19.jpg" },
                { name: "Natalia F.", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
                { name: "Alejandro T.", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
            ],
            milestones: [
                { title: "Prototipo", completed: true },
                { title: "Pruebas", completed: true },
                { title: "Desarrollo", completed: true },
                { title: "Lanzamiento", completed: false }
            ]
        },
        {
            id: 5,
            createdAt: "17 de Febrero, 2025",
            supporters: 72,
            progress: 30,
            goal: 20000,
            current: 6000,
            category: "Salud",
            location: "Sevilla, España",
            team: [
                { name: "Carmen R.", avatar: "https://randomuser.me/api/portraits/women/82.jpg" },
                { name: "Miguel S.", avatar: "https://randomuser.me/api/portraits/men/53.jpg" },
                { name: "Isabel D.", avatar: "https://randomuser.me/api/portraits/women/57.jpg" },
            ],
            milestones: [
                { title: "Investigación", completed: true },
                { title: "Diseño de programa", completed: false },
                { title: "Formación", completed: false },
                { title: "Implementación", completed: false },
                { title: "Evaluación", completed: false }
            ]
        }
    ];

    const projectData = projectDataArray.find(project => project.id === reality.id) || projectDataArray[0];

    return (
        <div className="reality-project-detail">
            <Row gutter={[24, 24]}>
                <Col xs={24} md={16}>
                    <div>
                        <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                            {reality.description}
                        </Paragraph>
                        <Paragraph style={{ fontSize: "16px", lineHeight: "1.8" }}>
                            Este proyecto busca transformar nuestra comunidad mediante soluciones innovadoras y sostenibles.
                            Trabajando juntos, podemos crear un impacto positivo y duradero que beneficie a todos.
                        </Paragraph>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <Title level={4}>Objetivos del Proyecto</Title>
                        <Paragraph>
                            <ul style={{ paddingLeft: "20px" }}>
                                <li>Mejorar la calidad de vida en la comunidad local</li>
                                <li>Fomentar la participación ciudadana en iniciativas sociales</li>
                                <li>Implementar soluciones sostenibles y escalables</li>
                                <li>Crear un modelo replicable para otras comunidades</li>
                            </ul>
                        </Paragraph>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <Title level={4}>Avances del Proyecto</Title>
                        <div style={{ marginBottom: "15px" }}>
                            {projectData.milestones.map((milestone, index) => (
                                <Tag
                                    key={index}
                                    color={milestone.completed ? "#52c41a" : "#f5f5f5"}
                                    style={{
                                        padding: "5px 10px",
                                        margin: "0 10px 10px 0",
                                        color: milestone.completed ? "white" : "rgba(0,0,0,0.65)"
                                    }}
                                >
                                    {milestone.completed && <CheckCircleOutlined style={{ marginRight: "5px" }} />}
                                    {milestone.title}
                                </Tag>
                            ))}
                        </div>
                    </div>
                </Col>

                <Col xs={24} md={8}>
                    <div className="project-stats" style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px" }}>
                        <div style={{ marginBottom: "20px" }}>
                            <Text type="secondary">Progreso del Proyecto</Text>
                            <Progress
                                percent={projectData.progress}
                                strokeColor="#ff4d4f"
                                format={percent => `${percent}%`}
                            />
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <Space>
                                <CalendarOutlined style={{ color: "#ff4d4f" }} />
                                <Text>Creado: {projectData.createdAt}</Text>
                            </Space>
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <Space>
                                <TeamOutlined style={{ color: "#ff4d4f" }} />
                                <Text>{projectData.supporters} Personas apoyan</Text>
                            </Space>
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <Space>
                                <FireOutlined style={{ color: "#ff4d4f" }} />
                                <Text>Categoría: {projectData.category}</Text>
                            </Space>
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <Text type="secondary">Equipo del Proyecto</Text>
                            <div style={{ marginTop: "10px" }}>
                                <Avatar.Group maxCount={5}>
                                    {projectData.team.map((member, index) => (
                                        <Avatar
                                            key={index}
                                            src={member.avatar}
                                            title={member.name}
                                        />
                                    ))}
                                </Avatar.Group>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default RealityProjectDetail;
