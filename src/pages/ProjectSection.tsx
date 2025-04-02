import React, { useState } from "react";
import { Col, Row, Card, Carousel, Badge} from "antd";
import { UserOutlined, StarFilled, StarOutlined, FireOutlined, ProductOutlined} from '@ant-design/icons';
import { ProjectsSectionProps, ProjectCard } from "../interfaces/interfaces.ts";
import ProjectDetailModal from "../components/Secundary/Project/ProjectDetailModal";

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projectCards }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const renderRating = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<StarFilled key={i} style={{ color: '#faad14' }} />);
            } else {
                stars.push(<StarOutlined key={i} style={{ color: '#faad14' }} />);
            }
        }
        return <div style={{ display: 'flex', gap: '2px' }}>{stars}</div>;
    };

    const handleProjectClick = (project: ProjectCard, index: number) => {
        setSelectedProject(project);
        setActiveIndex(index);
        setModalVisible(true);
    };

    const handleNextProject = () => {
        const nextIndex = (activeIndex + 1) % projectCards.length;
        setSelectedProject(projectCards[nextIndex]);
        setActiveIndex(nextIndex);
    };

    const handlePrevProject = () => {
        const prevIndex = (activeIndex - 1 + projectCards.length) % projectCards.length;
        setSelectedProject(projectCards[prevIndex]);
        setActiveIndex(prevIndex);
    };

    const carouselRef = React.useRef<any>(null);

    return (
        <div className="projectsContainer" style={{ width: '100%', padding: '32px 0' }}>
            <h2 className="sectionTitle" style={{
                fontSize: '24px',
                color: '#333',
                marginBottom: '8px',
                textAlign: 'center',
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontWeight: 700
            }}>
                <ProductOutlined className="titleIcon" style={{ color: '#ff4d4f', fontSize: '24px', gap: '10px', marginRight:'10px' }} />
                Proyectos Destacados
            </h2>
            <p className="sectionSubtitle" style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '32px',
                textAlign: 'center'
            }}>
                Descubre nuestros proyectos más innovadores
            </p>

            <Row gutter={[24, 24]} className="projectsRow" style={{ margin: '0', width: '100%' }}>
                <Col xs={24} md={24} style={{ width: '100%' }}>
                    <Carousel
                        autoplay
                        dots
                        ref={carouselRef}
                        className="projectCarousel"
                        style={{
                            overflow: 'hidden',
                            borderRadius: '12px',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                            width: '100%'
                        }}
                        slidesToShow={2}
                        responsive={[
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]}
                    >
                        {projectCards.map((project: ProjectCard, index: number) => (
                            <div key={index} className="carouselItem" style={{ padding: '12px' }}>
                                <Badge.Ribbon
                                    text={index === 0 ? "Destacado" : ""}
                                    color="#339933"
                                    style={{display: index === 0 ? 'block' : 'none'}}
                                >
                                    <Card
                                        hoverable
                                        className="projectCard"
                                        onClick={() => handleProjectClick(project, index)}
                                        cover={
                                            <div className="imageContainer" style={{
                                                position: 'relative',
                                                overflow: 'hidden',
                                                height: '250px',
                                            }}>
                                                <img
                                                    alt={project.title}
                                                    src={project.image}
                                                    className="projectImage"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.5s ease'
                                                    }}
                                                />

                                            </div>
                                        }
                                        style={{
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            height: '100%',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            border: 'none',
                                            backgroundColor: 'transparent',
                                        }}
                                    >
                                        <div className="cardContent" style={{ padding: '16px 8px 8px', backgroundColor:'transparent' }}>
                                            <h3 className="projectTitle" style={{
                                                fontSize: '20px',
                                                fontWeight: '600',
                                                marginBottom: '8px',
                                                color: '#333',
                                            }}>
                                                {project.title}
                                            </h3>
                                            <p className="projectDescription" style={{
                                                color: '#666',
                                                fontSize: '14px',
                                                marginBottom: '16px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical'
                                            }}>
                                                {project.description}
                                            </p>

                                            <div className="projectMeta" style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginTop: '16px',
                                                paddingTop: '16px',
                                                borderTop: '1px solid #f0f0f0'
                                            }}>
                                                {project.author && (
                                                    <div className="author" style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        color: '#666',
                                                        fontSize: '14px'
                                                    }}>
                                                        <UserOutlined style={{ marginRight: 5 }} /> {project.author}
                                                    </div>
                                                )}
                                                <div className="statsContainer" style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px'
                                                }}>
                                                    {project.rating && renderRating(project.rating)}
                                                    <div className="trending" style={{
                                                        backgroundColor: '#fff2f0',
                                                        color: '#ff4d4f',
                                                        fontSize: '12px',
                                                        padding: '2px 8px',
                                                        borderRadius: '10px',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}>
                                                        <FireOutlined style={{ marginRight: 5, color: '#ff4d4f' }} /> Trending
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Badge.Ribbon>
                            </div>
                        ))}
                    </Carousel>
                </Col>
            </Row>

            <ProjectDetailModal
                project={selectedProject}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onNext={handleNextProject}
                onPrevious={handlePrevProject}
                hasNext={projectCards.length > 1}
                hasPrevious={projectCards.length > 1}
            />
        </div>
    );
};

export default ProjectsSection;
