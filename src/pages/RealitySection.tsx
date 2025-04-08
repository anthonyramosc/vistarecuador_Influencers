import React, { useState, useEffect } from "react";
import { Row, Col, Card, Typography, Badge, Tooltip } from "antd";
import { LikeOutlined, FireOutlined } from '@ant-design/icons';
import {RealitySectionProps, RealityCard, LikedItemsState} from "../interfaces/interfaces.ts";
import RealityDetailModal from "../components/Secundary/Realidad/RealityDetail";

const { Title, Text } = Typography;

const RealitySection: React.FC<RealitySectionProps> = ({ realityCards }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [likedItems, setLikedItems] = useState<LikedItemsState>({});
    const [animating, setAnimating] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedReality, setSelectedReality] = useState<RealityCard | null>(null);

    const visibleCards = 2;
    const totalCards = realityCards.length;

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

    const handleLike = (id: number) => {
        setLikedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleCardClick = (reality: RealityCard) => {
        setSelectedReality(reality);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const visibleRealityCards = realityCards.slice(currentIndex, currentIndex + visibleCards);
    const isPopular = (likes: number) => likes > 50;

    const handleModalNavigation = (direction: 'prev' | 'next') => {
        if (!selectedReality) return;

        const currentIndex = realityCards.findIndex(item => item.id === selectedReality.id);
        if (direction === 'prev' && currentIndex > 0) {
            setSelectedReality(realityCards[currentIndex - 1]);
        } else if (direction === 'next' && currentIndex < realityCards.length - 1) {
            setSelectedReality(realityCards[currentIndex + 1]);
        }
    };

    return (
        <div className="hazloRealidadSection">
            <div className="sectionHeader" >
                <div className="titleContainer" style={{ display: 'flex', alignItems: 'end', justifyContent: 'start',marginBottom: '8px', }}>
                    <FireOutlined className="titleIcon" style={{ color: '#ff4d4f', fontSize: '24px', marginLeft: -20 }} />
                    <Title level={3} className="hazloRealidadTitle" style={{  color: '#333', margin: 0, marginLeft: '10px', textTransform: "uppercase", letterSpacing:0.5, fontWeight:700, fontSize: 24 }}>
                        Hagámoslo Realidad
                    </Title>
                </div>
                <Text className="hazloRealidadSubtitle" style={{ fontSize: '16px', color: '#777', marginTop: '5px', display: 'block', textAlign: 'start',marginBottom: '20px',
                    marginLeft: '50px', }}>
                    Vota por tus ideas favoritas y ayúdalas a hacerse realidad
                </Text>
            </div>

            <div className="realityCardsContainer" style={{ display: 'flex', alignItems: 'start', width: '100%', position: 'relative', marginTop: '40px', height:'450px' }}>
                <Row gutter={[24, 24]} style={{
                    display: 'flex',
                    flex: 1,
                    transition: 'transform 0.5s ease-in-out'
                }}>
                    {visibleRealityCards.map((reality: RealityCard) => (
                        <Col xs={24} sm={24} md={12} key={reality.id}>
                            <div style={{ position: 'relative' }}>
                                <Badge.Ribbon
                                    text="Popular"
                                    color="#ff4d4f"
                                    style={{ display: isPopular(reality.likes) ? 'block' : 'none' }}
                                >
                                    <Card
                                        hoverable
                                        cover={
                                            <div
                                                style={{ height: '300px', overflow: 'hidden', cursor: 'pointer' }}
                                                onClick={() => handleCardClick(reality)}
                                            >
                                                <img
                                                    alt={reality.title}
                                                    src={reality.image}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover',  }}
                                                />
                                            </div>
                                        }
                                        style={{
                                            borderRadius: '10px',
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                                            overflow: 'hidden',
                                            height: '100%',
                                            backgroundColor: 'transparent',
                                        }}
                                        onClick={() => handleCardClick(reality)}
                                    >
                                        <Card.Meta
                                            title={reality.title}
                                            description={
                                                <Tooltip title={reality.description}>
                                                    <div style={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        color: '#555'
                                                    }}>
                                                        {reality.description}
                                                    </div>
                                                </Tooltip>
                                            }
                                        />
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginTop: '15px',
                                            cursor: 'pointer',
                                            backgroundColor: 'transparent',
                                        }}
                                             onClick={(e) => {
                                                 e.stopPropagation();
                                                 handleLike(reality.id);
                                             }}
                                        >
                                            <LikeOutlined
                                                style={{
                                                    color: likedItems[reality.id] ? '#ff4d4f' : 'inherit',
                                                    fontSize: '18px',
                                                    marginRight: '5px'
                                                }}
                                            />
                                            <span>{likedItems[reality.id] ? reality.likes + 1 : reality.likes} Me gusta</span>
                                        </div>
                                    </Card>
                                </Badge.Ribbon>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

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

            <RealityDetailModal
                visible={modalVisible}
                reality={selectedReality}
                onClose={closeModal}
                onLike={handleLike}
                isLiked={selectedReality ? !!likedItems[selectedReality.id] : false}
                allRealities={realityCards}
                onNavigate={handleModalNavigation}
            />
        </div>
    );
};

export default RealitySection;
