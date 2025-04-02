import React from "react";
import { Col, Row, Carousel } from "antd";
import styles from '../styles/Dashboard.module.css';

interface CarouselItem {
    imageUrl: string;
}

interface HeroProps {
    carouselItems: CarouselItem[];
}

const Hero: React.FC<HeroProps> = ({ carouselItems }) => {
    return (
        <Row gutter={[0, 0]} className={styles.heroSection}>
            <Col xs={24} md={24}>
                <Carousel autoplay className={styles.carousel}>
                    {carouselItems.map((item, index) => (
                        <div key={index}>
                            <div
                                className={styles.carouselSlide}
                                style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                    backgroundSize: 'cover'
                                }}
                            >
                            </div>
                        </div>
                    ))}
                </Carousel>
            </Col>
        </Row>
    );
};

export default Hero;
