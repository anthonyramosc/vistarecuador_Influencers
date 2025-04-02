import React from "react";
import { Modal, Typography, Button, Space, Divider } from "antd";
import { LikeOutlined, ShareAltOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { RealityCard } from "../../../interfaces/interfaces";
import RealityProjectDetail from "./RealityProjectDetail";

const { Title } = Typography;

interface RealityDetailModalProps {
    visible: boolean;
    reality: RealityCard | null;
    onClose: () => void;
    onLike: (id: number) => void;
    isLiked: boolean;
    allRealities?: RealityCard[];
    onNavigate?: (direction: 'prev' | 'next') => void;
}

const RealityDetailModal: React.FC<RealityDetailModalProps> = ({
                                                                   visible,
                                                                   reality,
                                                                   onClose,
                                                                   onLike,
                                                                   isLiked,
                                                                   allRealities = [],
                                                                   onNavigate
                                                               }) => {
    if (!reality) return null;

    const handleLike = () => {
        onLike(reality.id);
    };


    const currentIndex = allRealities.findIndex(item => item.id === reality.id);
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < allRealities.length - 1 && currentIndex !== -1;

    const handlePrevious = () => {
        if (onNavigate && hasPrevious) {
            onNavigate('prev');
        }
    };

    const handleNext = () => {
        if (onNavigate && hasNext) {
            onNavigate('next');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            centered
            className="reality-detail-modal"
            bodyStyle={{ padding: 0, borderRadius: "12px", overflow: "hidden" }}
        >
            <div style={{ display: "flex", flexDirection: "column", maxHeight: "85vh" }}>
                <div
                    style={{
                        height: "280px",
                        overflow: "hidden",
                        position: "relative"
                    }}
                >
                    {hasPrevious && (
                        <Button
                            icon={<LeftOutlined />}
                            shape="circle"
                            style={{
                                position: "absolute",
                                left: "15px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 10,
                                backgroundColor: "rgba(255,255,255,0.7)"
                            }}
                            onClick={handlePrevious}
                        />
                    )}
                    {hasNext && (
                        <Button
                            icon={<RightOutlined />}
                            shape="circle"
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                zIndex: 10,
                                backgroundColor: "rgba(255,255,255,0.7)"
                            }}
                            onClick={handleNext}
                        />
                    )}

                    {allRealities.length > 1 && (
                        <div
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "white",
                                padding: "2px 10px",
                                borderRadius: "12px",
                                zIndex: 10,
                                fontSize: "14px"
                            }}
                        >
                            {currentIndex + 1} / {allRealities.length}
                        </div>
                    )}

                    <img
                        src={reality.image}
                        alt={reality.title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                            padding: "20px"
                        }}
                    >
                        <Title level={2} style={{ color: "white", margin: 0 }}>
                            {reality.title}
                        </Title>
                        <div style={{ color: "rgba(255,255,255,0.8)", marginTop: "5px" }}>
                            Publicado: {formatDate(reality.date)}
                        </div>
                    </div>
                </div>

                <div style={{ padding: "24px", overflow: "auto" }}>
                    <RealityProjectDetail reality={reality} />

                    <Divider style={{ margin: "20px 0" }} />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Space size="large">
                            <Button
                                type={isLiked ? "primary" : "default"}
                                icon={<LikeOutlined />}
                                onClick={handleLike}
                                style={{
                                    backgroundColor: isLiked ? "#ff4d4f" : undefined,
                                    borderColor: isLiked ? "#ff4d4f" : undefined
                                }}
                            >
                                {isLiked ? "Me gusta" : "Me gusta"} ({isLiked ? reality.likes + 1 : reality.likes})
                            </Button>
                            <Button icon={<ShareAltOutlined />}>Compartir</Button>
                        </Space>

                        <Space size="small" className="mobile-navigation" style={{ display: "none" }}>
                            <Button
                                icon={<LeftOutlined />}
                                disabled={!hasPrevious}
                                onClick={handlePrevious}
                            />
                            <Button
                                icon={<RightOutlined />}
                                disabled={!hasNext}
                                onClick={handleNext}
                            />
                        </Space>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default RealityDetailModal;
