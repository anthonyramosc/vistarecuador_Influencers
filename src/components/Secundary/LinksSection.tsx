import React from "react";
import { Row, Col, Card, Typography, Divider } from "antd";
import styles from '../styles/Dashboard.module.css';
import {LinksSectionProps} from "../../interfaces/interfaces.ts";

const { Title } = Typography;



const LinksSection: React.FC<LinksSectionProps> = ({ linkCards }) => {
    return (
        <div className={styles.ecuadorLinksSection}>
            <Divider orientation="left" className={styles.divider}>
                <Title level={3} className={styles.dividerTitle}>
                    Enlaces de Interés
                </Title>
            </Divider>

            <Row gutter={[24, 24]} className={styles.linksCardRow}>
                {linkCards.map((card, index) => (
                    <Col xs={24} sm={24} md={5} key={index}>
                        <a href={card.url} target="_blank" rel="noopener noreferrer" className={styles.linkCardAnchor}>
                            <Card
                                hoverable
                                className={styles.linkCard}
                                cover={
                                    <div className={styles.linkCardImgContainer}>
                                        <img
                                            alt={card.title}
                                            src={card.image}
                                            className={styles.linkCardImage}
                                        />
                                    </div>
                                }
                            >
                            </Card>
                        </a>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default LinksSection;
