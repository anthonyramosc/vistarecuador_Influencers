import React, { useState } from "react";
import { Modal, Typography, Button, Space, Divider, message, Dropdown, Menu } from "antd";
import { LikeOutlined, ShareAltOutlined, LeftOutlined, RightOutlined,
    CopyOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
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
    const [shareModalVisible, setShareModalVisible] = useState(false);

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

    // Share functionality
    const handleShare = () => {
        if (navigator.share) {
            // Web Share API is available
            navigator.share({
                title: reality.title,
                text: `Échale un vistazo a este proyecto: ${reality.title}`,
                url: window.location.href
            }).catch((error) => {
                console.log('Error sharing:', error);
                // Fallback to manual sharing dialog if native sharing fails
                setShareModalVisible(true);
            });
        } else {
            // Web Share API not available, show custom share modal
            setShareModalVisible(true);
        }
    };

    const copyToClipboard = () => {
        const shareUrl = `${window.location.origin}/reality/${reality.id}`;
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                message.success('Enlace copiado al portapapeles');
                setShareModalVisible(false);
            })
            .catch(() => {
                message.error('No se pudo copiar el enlace');
            });
    };

    const shareToSocial = (platform: string) => {
        const shareUrl = encodeURIComponent(`${window.location.origin}/reality/${reality.id}`);
        const shareTitle = encodeURIComponent(reality.title);
        let url = '';

        switch (platform) {
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
                break;
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
                break;
            default:
                return;
        }

        window.open(url, '_blank', 'width=600,height=400');
        setShareModalVisible(false);
    };

    const shareMenuItems = [
        {
            key: 'copy',
            icon: <CopyOutlined />,
            label: 'Copiar enlace',
            onClick: copyToClipboard
        },
        {
            key: 'facebook',
            icon: <FacebookOutlined />,
            label: 'Compartir en Facebook',
            onClick: () => shareToSocial('facebook')
        },
        {
            key: 'twitter',
            icon: <TwitterOutlined />,
            label: 'Compartir en Twitter',
            onClick: () => shareToSocial('twitter')
        },
        {
            key: 'linkedin',
            icon: <LinkedinOutlined />,
            label: 'Compartir en LinkedIn',
            onClick: () => shareToSocial('linkedin')
        }
    ];

    return (
        <>
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
                                <Dropdown
                                    menu={{ items: shareMenuItems }}
                                    trigger={['click']}
                                    placement="bottomCenter"
                                >
                                    <Button icon={<ShareAltOutlined />} onClick={handleShare}>Compartir</Button>
                                </Dropdown>
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

            {/* Share Modal as a fallback if Web Share API is not available */}
            <Modal
                title="Compartir proyecto"
                open={shareModalVisible}
                onCancel={() => setShareModalVisible(false)}
                footer={null}
                centered
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "16px" }}>
                    <Button icon={<CopyOutlined />} onClick={copyToClipboard} block>
                        Copiar enlace
                    </Button>
                    <Button icon={<FacebookOutlined />} onClick={() => shareToSocial('facebook')} block>
                        Compartir en Facebook
                    </Button>
                    <Button icon={<TwitterOutlined />} onClick={() => shareToSocial('twitter')} block>
                        Compartir en Twitter
                    </Button>
                    <Button icon={<LinkedinOutlined />} onClick={() => shareToSocial('linkedin')} block>
                        Compartir en LinkedIn
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default RealityDetailModal;
