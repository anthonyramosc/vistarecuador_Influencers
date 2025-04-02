import { Layout, Menu, Button, Dropdown } from 'antd';
import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import AppFooter from './foot.tsx';
import { MenuOutlined } from '@ant-design/icons';
import styles from '../styles/layout.module.css';

const { Header, Content } = Layout;

const NavLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    const handleMenuClick = (menuKey: string, path?: string) => {
        window.dispatchEvent(new CustomEvent("menuClick", { detail: { menuItem: menuKey } }));

        if (menuKey === 'serEmbajador' || menuKey ==='presentacion' || menuKey ==='beneficios' || menuKey ==='adhesion' || menuKey ==='medios') {
            navigate('/dashboard');

            setTimeout(() => {
                window.dispatchEvent(new Event(menuKey + "Click"));
            }, 300);
        }else if (path){
            navigate(path);
        }
    };


    const getMenuItem = (key: string, label: ReactNode, onClick: () => void, className?: string) => ({
        key,
        label: <span className={className} onClick={onClick}>{label}</span>
    });

    const influencerItems = [
        getMenuItem('presentacion', 'Presentación', () => handleMenuClick('presentacion'), styles.submenuItem),
        getMenuItem('serEmbajador', 'Ser Embajador', () => handleMenuClick('serEmbajador'), styles.submenuItem),
        getMenuItem('videos', 'Videos', () => {
            handleMenuClick('videos', '/dashboard');
            setTimeout(() => {
                window.dispatchEvent(new Event("scrollToFacebook"))
            })
        },  styles.submenuItem),
        getMenuItem('cancion', 'Canción', () => {
            handleMenuClick('cancion', '/dashboard');
            setTimeout(() => {
                window.dispatchEvent(new Event("scrollToCancion"));
            }, 300);
        }, styles.submenuItem),
    ];

    const adherentesItems = [
        getMenuItem('beneficios', 'Beneficios', () => handleMenuClick('beneficios'), styles.submenuItem),
        getMenuItem('adhesion', 'Adhesión', () => handleMenuClick('adhesion'), styles.submenuItem),
        getMenuItem('medios', 'Medios', () => handleMenuClick('medios'), styles.submenuItem),
    ];

    const menuItems = [
        getMenuItem('inicio', 'Inicio', () => handleMenuClick('inicio', '/dashboard'), styles.menuItem),
        {
            key: 'influencer',
            label: (
                <Dropdown menu={{ items: influencerItems }} placement="bottom">
                    <span className={styles.menuItemDropdown}>Visita Ecuador Influencer</span>
                </Dropdown>
            ),
        },
        {
            key: 'adherentes',
            label: (
                <Dropdown menu={{ items: adherentesItems }} placement="bottom">
                    <span className={styles.menuItemDropdown}>Adherentes</span>
                </Dropdown>
            ),
        },
        getMenuItem('contacto', 'Contáctanos', () => handleMenuClick('contacto', '/contacto'), styles.menuItem),
    ];

    const mobileMenu = {
        items:[
            getMenuItem('inicio', 'Inicio', () => handleMenuClick('inicio', '/dashboard'), styles.menuItemMobile),
            {
                key: 'influencer',
                label: (
                    <Dropdown menu={{ items: influencerItems }} placement="bottom">
                        <span className={styles.menuItemDropdownMobile}>Visita Ecuador Influencer</span>
                    </Dropdown>
                ),
            },
            {
                key: 'adherentes',
                label: (
                    <Dropdown menu={{ items: adherentesItems }} placement="bottom">
                        <span className={styles.menuItemDropdownMobile}>Adherentes</span>
                    </Dropdown>
                ),
            },
            getMenuItem('contacto', 'Contáctanos', () => handleMenuClick('contacto', '/contacto'), styles.menuItemMobile),
        ],
    };

    return (
        <Layout className={styles.layout}>
            <Header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.logoContainer}>
                        <img
                            src="https://visitaecuadorinfluencer.com/img/diseno/logo-11.svg"
                            alt="Visita Ecuador Influencer"
                            className={styles.logo}
                            onClick={() => handleMenuClick('inicio', '/')}
                        />
                    </div>

                    <div className={styles.bannerContainer}>
                        <img
                            src="https://visitaecuadorinfluencer.com/img/diseno/BANNER3.png"
                            alt="Banner"
                            className={styles.banner}
                        />
                        <div className={styles.menuDesktop}>
                            <Menu
                                mode="horizontal"
                                items={menuItems}
                                className={styles.menu}
                            />
                        </div>

                    </div>

                    <div className={styles.loginContainer}>
                        <div className={styles.menuMobile}>
                            <Dropdown menu={mobileMenu} trigger={['click']}>
                                <Button type="text" icon={<MenuOutlined/>} className={styles.menuButton}/>
                            </Dropdown>
                        </div>
                        <div className={styles.loginInputs}>
                            <Button type="primary" className={styles.loginButton}>Suscribirse</Button>
                            <Button type="primary" className={styles.loginButton}>Entrar</Button>
                        </div>

                        <img
                            src="https://visitaecuadorinfluencer.com/img/diseno/marca_pais-14.png"
                            alt="Ecuador"
                            className={styles.ecuadorLogo}
                        />
                    </div>
                </div>
            </Header>

            <Content className={styles.content}>
                {children}
            </Content>

            <AppFooter/>
        </Layout>
    );
};

export default NavLayout;
