import { Layout, Menu, Button, Dropdown } from 'antd';
import { FC, ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppFooter from './foot.tsx';
import {
    MenuOutlined,
    UserOutlined,
    LoginOutlined,
    HomeOutlined,
    VideoCameraOutlined,
    StarOutlined,
    ContactsOutlined,
    TeamOutlined,
    GiftOutlined,
    SoundOutlined
} from '@ant-design/icons';
import styles from '../styles/layout.module.css';

const { Header, Content } = Layout;

const NavLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [selectedKey, setSelectedKey] = useState('inicio');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Set the selected key based on the current path
        const path = location.pathname;
        if (path === '/dashboard') {
            setSelectedKey('inicio');
        } else if (path.includes('contacto')) {
            setSelectedKey('contacto');
        }
        // Add more conditions as needed for other paths
    }, [location]);

    const handleMenuClick = (menuKey: string, path?: string) => {
        setSelectedKey(menuKey);
        window.dispatchEvent(new CustomEvent("menuClick", { detail: { menuItem: menuKey } }));

        if (menuKey === 'serEmbajador' || menuKey ==='presentacion' || menuKey ==='beneficios' ||
            menuKey ==='adhesion' || menuKey ==='medios' || menuKey === 'contacto') {
            navigate('/dashboard');

            setTimeout(() => {
                window.dispatchEvent(new Event(menuKey + "Click"));
            }, 300);
        } else if (path) {
            navigate(path);
        }
    };

    const getMenuItem = (key: string, label: ReactNode, onClick: () => void, className?: string, icon?: ReactNode) => ({
        key,
        icon: icon,
        label: (
            <span
                className={`${className} ${selectedKey === key ? styles.selectedMenuItem : ''}`}
                onClick={onClick}
            >
                {label}
            </span>
        )
    });

    const influencerItems = [
        getMenuItem('presentacion', 'Presentación', () => handleMenuClick('presentacion'), styles.submenuItem, <StarOutlined />),
        getMenuItem('serEmbajador', 'Ser Embajador', () => handleMenuClick('serEmbajador'), styles.submenuItem, <TeamOutlined />),
        getMenuItem('videos', 'Videos', () => {
            handleMenuClick('videos', '/dashboard');
            setTimeout(() => {
                window.dispatchEvent(new Event("scrollToFacebook"))
            })
        },  styles.submenuItem, <VideoCameraOutlined />),
        getMenuItem('cancion', 'Canción', () => {
            handleMenuClick('cancion', '/dashboard');
            setTimeout(() => {
                window.dispatchEvent(new Event("scrollToCancion"));
            }, 300);
        }, styles.submenuItem, <SoundOutlined />),
    ];

    const adherentesItems = [
        getMenuItem('beneficios', 'Beneficios', () => handleMenuClick('beneficios'), styles.submenuItem, <GiftOutlined />),
        getMenuItem('adhesion', 'Adhesión', () => handleMenuClick('adhesion'), styles.submenuItem, <UserOutlined />),
        getMenuItem('medios', 'Medios', () => handleMenuClick('medios'), styles.submenuItem, <StarOutlined />),
    ];

    const menuItems = [
        getMenuItem('inicio', 'Inicio', () => handleMenuClick('inicio', '/dashboard'), styles.menuItem,
            <div className={`${styles.iconContainer} ${selectedKey === 'inicio' ? styles.selectedIcon : ''}`}>
                <HomeOutlined style={{color:"black"}}/>
            </div>
        ),
        {
            key: 'influencer',
            icon:
                <div className={`${styles.iconContainer} ${selectedKey === 'influencer' ||
                ['presentacion', 'serEmbajador', 'videos', 'cancion'].includes(selectedKey) ?
                    styles.selectedIcon : ''}`}>
                    <TeamOutlined style={{color:"black"}} />
                </div>,
            label: (
                <Dropdown menu={{ items: influencerItems }} placement="bottom">
                    <span className={`${styles.menuItemDropdown} ${
                        selectedKey === 'influencer' ||
                        ['presentacion', 'serEmbajador', 'videos', 'cancion'].includes(selectedKey) ?
                            styles.selectedMenuItem : ''}`}>
                        Visita Ecuador Influencer
                    </span>
                </Dropdown>
            ),
        },
        {
            key: 'adherentes',
            icon:
                <div className={`${styles.iconContainer} ${selectedKey === 'adherentes' ||
                ['beneficios', 'adhesion', 'medios'].includes(selectedKey) ?
                    styles.selectedIcon : ''}`}>
                    <StarOutlined style={{color:"black"}}/>
                </div>,
            label: (
                <Dropdown menu={{ items: adherentesItems }} placement="bottom">
                    <span className={`${styles.menuItemDropdown} ${
                        selectedKey === 'adherentes' ||
                        ['beneficios', 'adhesion', 'medios'].includes(selectedKey) ?
                            styles.selectedMenuItem : ''}`}>
                        Adherentes
                    </span>
                </Dropdown>
            ),
        },
        getMenuItem('contacto', 'Contáctanos', () => handleMenuClick('contacto'), styles.menuItem,
            <div className={`${styles.iconContainer} ${selectedKey === 'contacto' ? styles.selectedIcon : ''}`}>
                <ContactsOutlined style={{color:"black"}} />
            </div>
        ),
    ];

    const mobileMenu = {
        items:[
            getMenuItem('inicio', 'Inicio', () => handleMenuClick('inicio', '/dashboard'), styles.menuItemMobile, <HomeOutlined style={{color:"black", marginLeft:'5px'}}/>),
            {
                key: 'influencer',
                icon: <TeamOutlined />,
                label: (
                    <Dropdown menu={{ items: influencerItems }} placement="bottom">
                        <span className={`${styles.menuItemDropdownMobile} ${
                            selectedKey === 'influencer' ||
                            ['presentacion', 'serEmbajador', 'videos', 'cancion'].includes(selectedKey) ?
                                styles.selectedMenuItemMobile : ''}`}>
                            Visita Ecuador Influencer
                        </span>
                    </Dropdown>
                ),
            },
            {
                key: 'adherentes',
                icon: <StarOutlined />,
                label: (
                    <Dropdown menu={{ items: adherentesItems }} placement="bottom">
                        <span className={`${styles.menuItemDropdownMobile} ${
                            selectedKey === 'adherentes' ||
                            ['beneficios', 'adhesion', 'medios'].includes(selectedKey) ?
                                styles.selectedMenuItemMobile : ''}`}>
                            Adherentes
                        </span>
                    </Dropdown>
                ),
            },
            getMenuItem('contacto', 'Contáctanos', () => handleMenuClick('contacto'), styles.menuItemMobile, <ContactsOutlined />),
        ],
    };

    return (
        <Layout className={styles.layout}>
            <Header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
                <div className={styles.headerContent}>
                    <div className={styles.logoContainer}>
                        <img
                            src="https://visitaecuadorinfluencer.com/img/diseno/logo-11.svg"
                            alt="Visita Ecuador Influencer"
                            className={`${styles.logo} ${styles.logoHover}`}
                            onClick={() => handleMenuClick('inicio', '/')}
                        />
                    </div>

                    <div className={styles.bannerContainer}>
                        <div className={styles.menuDesktop}>
                            <Menu
                                mode="horizontal"
                                items={menuItems}
                                className={styles.menu}
                                selectedKeys={[selectedKey]}
                            />
                        </div>
                    </div>

                    <div className={styles.loginContainer}>
                        <div className={styles.menuMobile}>
                            <Dropdown menu={mobileMenu} trigger={['click']}>
                                <Button type="text" icon={<MenuOutlined />} className={styles.menuButton}/>
                            </Dropdown>
                        </div>
                        <div className={styles.loginInputs}>
                            <Button type="primary" icon={<UserOutlined />} className={`${styles.loginButton} ${styles.buttonHover}`}>
                                Suscribirse
                            </Button>
                            <Button type="primary" icon={<LoginOutlined />} className={`${styles.loginButton} ${styles.buttonHover}`}>
                                Entrar
                            </Button>
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
