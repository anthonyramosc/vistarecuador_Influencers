import React from 'react';
import styles from '../../styles/News.module.css';
import { TagOutlined } from '@ant-design/icons';

const CategoryFilters = ({ categories, activeCategory, setActiveCategory }) => {
    return (
        <div className={styles.categoryFiltersContainer}>
            <div className={styles.categoryFiltersHeader}>
                <TagOutlined style={{ color: '#e30613', fontSize: '16px' }} />
                <span>Filtrar por:</span>
            </div>
            <div className={styles.categoryFiltersTabs}>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`${styles.categoryTab} ${activeCategory === category ? styles.activeTab : ''}`}
                    >
                        <div className={styles.tabIndicator}></div>
                        <span>{category}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilters;
