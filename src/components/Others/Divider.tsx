import React from 'react';
import { Divider } from 'antd';
import styles from '../styles/SectionDivider.module.css';

interface SectionDividerProps {
    title: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ title }) => {
    return (
        <div className={styles.dividerContainer}>
            <Divider orientation="left" className={styles.divider}>
                <span className={styles.dividerTitle}>{title}</span>
            </Divider>
        </div>
    );
};

export default SectionDivider;
