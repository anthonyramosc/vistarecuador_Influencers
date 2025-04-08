import React, { useState, useEffect } from "react";
import { Col, Row, Card, Badge } from "antd";
import { UserOutlined, StarFilled, StarOutlined, FireOutlined, ProductOutlined } from '@ant-design/icons';
import { ProjectsSectionProps, ProjectCard } from "../interfaces/interfaces.ts";
import ProjectDetailModal from "../components/Secundary/Project/ProjectDetailModal";

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projectCards }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);


    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [animating, setAnimating] = useState<boolean>(false);

    const visibleCards = 2;
    const totalCards = projectCards.length;


    useEffect(() => {
        const timer = setInterval(() => {
            if (!animating && !modalVisible) {
                goNext();
            }
        }, 8000);

        return () => clearInterval(timer);
    }, [currentIndex, animating, modalVisible]);

    const goNext = () => {
        setAnimating(true);
        if (currentIndex + visibleCards < totalCards) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCurrentIndex(0);
        }
        setTimeout(() => setAnimating(false), 500);
    };

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

    // Get currently visible cards
    const visibleProjectCards = projectCards.slice(currentIndex, currentIndex + visibleCards);

    return (
        <div className="projectsContainer" style={{ width: '100%', padding: '40px 0', marginBottom: '20px' }}>
            <h2 className="sectionTitle" style={{
                fontSize: '24px',
                color: '#333',
                marginBottom: '8px',
                textAlign: 'start',
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontWeight: 700,
            }}>
                <ProductOutlined className="titleIcon" style={{ color: '#ff4d4f', fontSize: '24px', marginRight: '10px' }} />
                Proyectos Destacados
            </h2>
            <p className="sectionSubtitle" style={{
                fontSize: '16px',
                color: '#666',
                textAlign: 'start',
                marginLeft: '50px',
            }}>
                Descubre nuestros proyectos más innovadores
            </p>

            <div className="projectCardsContainer" style={{
                display: 'flex',
                alignItems: 'start',
                width: '100%',
                position: 'relative',
                marginTop: '25px',
                height: '525px'
            }}>
                <Row gutter={[24, 24]} style={{
                    display: 'flex',
                    flex: 1,
                    transition: 'transform 0.5s ease-in-out',
                    width: '100%'
                }}>
                    {visibleProjectCards.map((project: ProjectCard, index: number) => (
                        <Col xs={24} sm={24} md={12} key={index} className="carouselItem">
                            <Badge.Ribbon
                                text={projectCards.indexOf(project) === 0 ? "Destacado" : ""}
                                color="#339933"
                                style={{ display: projectCards.indexOf(project) === 0 ? 'block' : 'none' }}
                            >
                                <Card
                                    className="projectCard"
                                    onClick={() => handleProjectClick(project, projectCards.indexOf(project))}
                                    cover={
                                        <div className="imageContainer" style={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            height: '298px',
                                            width: '100%',
                                            cursor: 'pointer'
                                        }}>
                                            <img
                                                alt={project.title}
                                                src={project.image}
                                                className="projectImage"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    transition: 'transform 0.5s ease',
                                                    cursor: 'pointer'
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
                                    <div className="cardContent" style={{ padding: '0 8px 8px', backgroundColor: 'transparent', marginTop:'-20px' }}>
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
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Pagination dots, just like in RealitySection */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'
            }}>
                {Array.from({ length: Math.ceil(totalCards / visibleCards) }).map((_, idx) => (
                    <span
                        key={idx}
                        style={{
                            width: '10px',
                            height: '10px',
                            margin: '0 5px',
                            background: Math.floor(currentIndex / visibleCards) === idx ? '#ff4d4f' : '#bbb',
                            borderRadius: '50%',
                            cursor: 'pointer'
                        }}
                        onClick={() => !animating && setCurrentIndex(idx * visibleCards)}
                    />
                ))}
            </div>

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
