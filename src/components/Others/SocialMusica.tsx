import React from 'react';
import { Space, Button } from 'antd';
import {
    FacebookOutlined,
    InstagramOutlined,
    YoutubeOutlined,
    PlayCircleOutlined
} from '@ant-design/icons';

const SocialAndMusic = () => {
    const socialLinks = [
        {
            name: "Facebook",
            icon: <FacebookOutlined />,
            url: "https://www.facebook.com/profile.php?id=100064028977797",
            color: "#1877F2"
        },
        {
            name: "YouTube",
            icon: <YoutubeOutlined />,
            url: "https://www.youtube.com/user/MovimientoVE",
            color: "#FF0000"
        },
        {
            name: "Instagram",
            icon: <InstagramOutlined />,
            url: "https://www.instagram.com/movimientovisitaecuador/",
            color: "#E4405F"
        }
    ];

    return (
        <div style={{ marginTop: '16px' }}>
            <div style={{
                backgroundImage: 'url("/api/placeholder/400/200")',
                backgroundSize: 'cover',
                height: '200px',
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '10px'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white'
                }}>
                    <h3 style={{ color: 'white', margin: 0 }}>Quinto Elemento</h3>
                    <p style={{ color: '#ccc', margin: '8px 0 0' }}>Movimiento Visita Ecuador</p>
                    <Button
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        style={{ marginTop: '10px', background: '#722ed1', borderColor: '#722ed1' }}
                    >
                        Ver Video
                    </Button>
                </div>
            </div>

            <div style={{textAlign: 'center', marginTop: '20px'}}>
                <h4 style={{color: '#722ed1', marginBottom: '16px'}}>Síguenos en</h4>
                <Space size="large">
                    {socialLinks.map((social, index) => (
                        <Button
                            key={index}
                            type="link"
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            icon={React.cloneElement(social.icon, {
                                style: {
                                    fontSize: '28px',
                                    color: social.color
                                }
                            })}
                            style={{
                                padding: '8px',
                                background: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        />
                    ))}
                </Space>
            </div>
        </div>
    );
};

export default SocialAndMusic;
