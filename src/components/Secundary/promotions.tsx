import React from 'react';
import styles from '../styles/promotionsDownload.module.css';
import {PromosBenefitsProps} from "../../interfaces/interfaces.ts";
import {FacebookOutlined, RiseOutlined} from "@ant-design/icons";



const PromotionsBenefitsSection: React.FC<PromosBenefitsProps> = ({ promotions, benefits }) => {
    return (
        <div className={styles.promotionsBenefitsContainer}>
            <div className={styles.sectionWrapper}>
                <div className={styles.promotionsBenefitsHeader}>
                    <div className={styles.headerLeft}>  <FacebookOutlined
                        className="titleIcon"
                        style={{
                            color: '#ff4d4f',
                            fontSize: '24px',
                            marginRight: 10,
                        }}
                    />Promociones</div>
                    <div className={styles.headerRight}>  <RiseOutlined
                        className="titleIcon"
                        style={{
                            color: '#ff4d4f',
                            fontSize: '24px',
                            marginRight: 10,

                        }}
                    />Beneficios</div>
                </div>

                <div className={styles.promotionsBenefitsContent}>
                    <div className={styles.promotionsColumn}>
                        {promotions.map((promo, index) => (
                            <div key={`promo-${index}`} className={styles.promoCard}>
                                <div className={styles.promoImageContainer}>
                                    <img src={promo.imageUrl} alt={promo.title} className={styles.promoImage} />
                                </div>
                                <div className={styles.promoContent}>
                                    <h3 className={styles.promoTitle}>{promo.title}</h3>
                                    <p className={styles.promoDescription}>{promo.description}</p>
                                </div>
                            </div>
                        ))}
                        <div className={styles.viewMoreContainer}>
                            <a href="#" className={styles.viewMoreLink}>
                                Más Promociones
                                <span className={styles.arrowIcon}>➔</span>
                            </a>
                        </div>
                    </div>

                    <div className={styles.benefitsColumn}>
                        {benefits.map((benefit, index) => (
                            <div key={`benefit-${index}`} className={styles.benefitCard}>
                                <div className={styles.benefitImageContainer}>
                                    <img src={benefit.imageUrl} alt={benefit.title} className={styles.benefitImage} />
                                </div>
                                <div className={styles.benefitContent}>
                                    <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                                    <p className={styles.benefitDescription}>{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                        <div className={styles.viewMoreContainer}>
                            <a href="#" className={styles.viewMoreLink}  onClick={() => {
                                window.dispatchEvent(new CustomEvent("menuClick", { detail: { menuItem: 'beneficios' } }));
                                setTimeout(() => {
                                    window.dispatchEvent(new Event("beneficiosClick"));
                                }, 100);
                            }}>
                                Más Beneficios
                                <span className={styles.arrowIcon}>➔</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionsBenefitsSection;
