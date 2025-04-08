import { useEffect, useRef, useState } from "react";
import styles from '../components/styles/Dashboard.module.css';
import imgPng from '../assets/img.png';
import imgPng2 from '../assets/img_5.png';
import sidebarStyles from '../components/styles/Sidebar.module.css';
import Hero from '../components/Secundary/banner.tsx';
import SectionDivider from '../components/Others/Divider.tsx';
import ProjectsSection from './ProjectSection.tsx';
import CancionSection from '../components/Secundary/cancionSection.tsx';
import RealitySection from './RealitySection.tsx';
import LinksSection from '../components/Secundary/LinksSection.tsx';
import Facebook from "../components/Secundary/Facebook.tsx";
import SerEmbajador from "../components/Secundary/Submenu/SerEmbajador.tsx";
import NewsSection from "../components/Secundary/NewSection.tsx";
import PromotionsBenefitsSection from "../components/Secundary/promotions.tsx";
import DownloadsSection from "../components/Secundary/download.tsx";
import ProfileSlider from "./profiles.tsx";
import Presentacion from "../components/Secundary/Submenu/Presentacion.tsx";
import Medios from "../components/Secundary/Submenu/Medios.tsx";
import Adhesion from "../components/Secundary/Submenu/Adhesion.tsx";
import Beneficios from "../components/Secundary/Submenu/Beneficios.tsx";
import Contactanos from "../components/Secundary/Contactanos.tsx";
import imgP from '../assets/Descargas/img.png';
import imgP1 from '../assets/Descargas/img_1.png';
import imgP2 from '../assets/Descargas/img_2.png';
import imgP3 from '../assets/Descargas/img_3.png';
import imgP4 from '../assets/Descargas/img_4.png';


interface MenuClickEvent extends CustomEvent {
    detail?: {
        menuItem: string;
    };
}

const Dashboard = () => {
    const cancionRef = useRef<HTMLDivElement>(null);
    const facebookRef = useRef<HTMLDivElement>(null);
    const [showSerEmbajador, setShowSerEmbajador] = useState(false);
    const [showPresentacion, setShowPresentacion] = useState(false);
    const [showBeneficios, setShowBeneficios] = useState(false);
    const [showAdhesion, setShowAdhesion] = useState(false);
    const [showMedios, setShowMedios] = useState(false);
    const [showContacto, setShowContacto] = useState(false);

    useEffect(() => {
        const handleScrollToCancion = () => {
            if (cancionRef.current) {
                cancionRef.current.scrollIntoView({ behavior: "smooth" });
            }
        };

        window.addEventListener("scrollToCancion", handleScrollToCancion);

          const handleScrollToFacebook = () => {
            if (facebookRef.current) {
                facebookRef.current.scrollIntoView({ behavior: "smooth" });
            }
          };

          window.addEventListener("scrollToFacebook", handleScrollToFacebook)

        const handleSerEmbajadorClick = () => {
            setShowSerEmbajador(true);
            setShowPresentacion(false)
            setShowBeneficios(false);
            setShowAdhesion(false);
            setShowMedios(false);
            setShowContacto(false);
        };
        const handlePresentacionClick = () => {
            setShowPresentacion(true);
            setShowSerEmbajador(false);
            setShowBeneficios(false);
            setShowAdhesion(false);
            setShowMedios(false);
            setShowContacto(false);
        };
        const handleMediosClick = () => {
            setShowMedios(true);
            setShowBeneficios(false);
            setShowAdhesion(false);
            setShowSerEmbajador(false);
            setShowPresentacion(false);
            setShowContacto(false);
        };
        const handleBeneficiosClick = () => {
            setShowBeneficios(true);
            setShowMedios(false);
            setShowAdhesion(false);
            setShowSerEmbajador(false);
            setShowPresentacion(false);
            setShowContacto(false);
        };
        const handleAdhesionClick = () => {
            setShowAdhesion(true);
            setShowBeneficios(false);
            setShowMedios(false);
            setShowSerEmbajador(false);
            setShowPresentacion(false);
            setShowContacto(false);
        };

        const handleContactoClick = () => {
            setShowContacto(true);
            setShowAdhesion(false);
            setShowBeneficios(false);
            setShowMedios(false);
            setShowSerEmbajador(false);
            setShowPresentacion(false);
        };


        const handleOtherMenuClick = (e: MenuClickEvent) => {
            if (e.detail?.menuItem !== 'serEmbajador') {
                setShowSerEmbajador(false);
            }

            if (e.detail?.menuItem !== 'presentacion') {
                setShowPresentacion(false);
            }
            if (e.detail?.menuItem !== 'beneficios') {
                setShowBeneficios(false);
            }
            if (e.detail?.menuItem !== 'medios') {
                setShowMedios(false);
            }
            if (e.detail?.menuItem !== 'adhesion') {
                setShowAdhesion(false);
            }
            if (e.detail?.menuItem !== 'contacto') {
                setShowContacto(false);
            }
        };

        window.addEventListener("serEmbajadorClick", handleSerEmbajadorClick);
        window.addEventListener("presentacionClick", handlePresentacionClick);
        window.addEventListener("beneficiosClick", handleBeneficiosClick);
        window.addEventListener("mediosClick", handleMediosClick);
        window.addEventListener("adhesionClick", handleAdhesionClick);
        window.addEventListener("contactoClick", handleContactoClick);
        window.addEventListener("menuClick", handleOtherMenuClick as EventListener);

        return () => {
            window.removeEventListener("scrollToCancion", handleScrollToCancion);
            window.removeEventListener("scrollToFacebook", handleScrollToFacebook);
            window.removeEventListener("serEmbajadorClick", handleSerEmbajadorClick);
            window.removeEventListener("presentacionClick", handlePresentacionClick);
            window.removeEventListener("beneficiosClick", handleBeneficiosClick);
            window.removeEventListener("mediosClick", handleMediosClick);
            window.removeEventListener("adhesionClick", handleAdhesionClick);
            window.removeEventListener("contactoClick", handleContactoClick);
            window.removeEventListener("menuClick", handleOtherMenuClick as EventListener);
        };
    }, []);

    const carouselItems = [
        { imageUrl: imgPng },
        { imageUrl: imgPng2 },
        {imageUrl: "https://marketplace.canva.com/EAGH1fiX5L8/1/0/1600w/canva-banner-d-youtube-noticias-profesional-sencillo-azul-62Pz5mJjGKM.jpg"}
    ];

    const projectCards = [
        {
            title: "VisitaEcuador Influencer",
            description: "VisitaEcuador Influencer nace con un objetivo claro: profesionalizar el trabajo de los influencers en Ecuador.",
            image: "https://visitaecuador.com/img/web/ve_quees.png",
            author: "Bernardo Polo ",
            rating: 4,
            comments: 10
        },
        {
            title: "Promoción Turística",
            description: "Descubre los mejores destinos de Ecuador con nuestros influencers locales.",
            image: "https://visitaecuador.com/img/web/ve_testimonios.png",
            author: "María González",
            rating: 5,
            comments: 15
        },
        {
            title: "Gastronomía Ecuatoriana",
            description: "Exploración de los sabores tradicionales de Ecuador a través de los influencers culinarios.",
            image: "https://visitaecuador.com/img/web/dc_quees.png",
            author: "Carlos Mendoza",
            rating: 4,
            comments: 8
        }
    ];

    const cancionCard = [
        {
            title: "Canción: Quinto Elemento",
            description: "La canción oficial del movimiento VisitaEcuador Influencer.",
            image: "/api/placeholder/400/200",
            views: "3.8 K vistas hace 13 años",
            comments: 4,
            price: "$92"
        }
    ];

    const realityCards = [
        {
            id: 1,
            title: "Estudiantes Destacados",
            description: "Premiaremos a los mejores estudiantes y deportistas de los planteles educativos del país con un viaje a República Dominicana para ellos...",
            image: "https://visitaecuador.com/ve/img/contenido/informacion/thum500x500/river_garden_hotel_suites_240403124903_0.jpg",
            likes: 56,
            comments: 6,
            date: "2013-08-07"
        },
        {
            id: 2,
            title: "VisitaEcuador Influencer",
            description: "VisitaEcuador Influencer nace con un objetivo claro: profesionalizar el trabajo de los influencers...",
            image: "https://visitaecuador.com/ve/img/contenido/informacion/thum500x500/hotel_wyndham_garden_guayaquil_Phzjs_0.jpg",
            likes: 204,
            comments: 10,
            date: "2024-08-21"
        },
        {
            id: 3,
            title: "Acaba tu casa",
            description: "Regalaremos porcelanato Graiman a todo aquel que ame su país y esté construyendo o remodelado su casa...",
            image: "https://visitaecuador.com/ve/img/contenido/informacion/thum500x500/villa_ana_maria_240249120149_0.jpg",
            likes: 34,
            comments: 4,
            date: "2013-08-07"
        },
        {
            id: 4,
            title: "Nuevos Talentos",
            description: "Descubre y vota por los nuevos talentos emergentes de Ecuador en diferentes áreas creativas...",
            image: "https://visitaecuador.com/ve/img/contenido/informacion/thum500x500/river_garden_hotel_suites_240403124903_0.jpg",
            likes: 89,
            comments: 12,
            date: "2024-09-15"
        },
        {
            id: 5,
            title: "Turismo Local",
            description: "Apoya iniciativas de turismo comunitario en zonas rurales del Ecuador...",
            image: "https://visitaecuador.com/ve/img/contenido/informacion/thum500x500/hotel_wyndham_garden_guayaquil_Phzjs_0.jpg",
            likes: 127,
            comments: 8,
            date: "2024-07-30"
        }
    ];

    const linkCards = [
        {
            title: "PORTAL VISITA ECUADOR",
            image: "https://visitaecuadorinfluencer.com/img/diseno/portalVisitaEcuador.jpg",
            url: "https://www.visitaecuador.com/"
        },
        {
            title: "CLUB VISITA",
            image: "https://visitaecuadorinfluencer.com/img/diseno/clubVisita.jpg",
            url: "https://www.visitaecuador.com/"
        },
        {
            title: "CLUB VISITA ECUADOR",
            image: "https://visitaecuadorinfluencer.com/img/diseno/clubVisitaEcuador.jpg",
            url: "https://www.visitaecuador.com/"
        },
        {
            title: "MOVIMIENTO VISITA ECUADOR",
            image: "https://visitaecuadorinfluencer.com/img/diseno/movimientoVisitaEcuador.jpg",
            url: "https://www.visitaecuador.com/"
        }
    ];

    const promotions = [
        {
            title: "Club Visita",
            description: "Descuento 50% en nueva suscripción Club Visita Ecuador",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/visita.jpg"
        },
        {
            title: "Fin de semana en Guayaquil",
            description: "Hotel Sonesta 3 Días 2 Noches, 2 Adultos 2 Niños, Incluye buffet",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/logo_hotel.jpg"
        }
    ];

    const benefits = [
        {
            title: "Paradiso SPA",
            description: "Tratamiento Relax, Masaje relajante con barro, Mascarilla Facial",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/spa.jpg"
        },
        {
            title: "Italia Fashion",
            description: "Prenda para Vestir para damas y caballeros, Marcas 100% originales Made in USA - Italy",
            imageUrl: "https://visitaecuadorinfluencer.com/img/diseno/iatalia.jpg"
        }
    ];

    const downloadItems = [
        {
            title: "Apps",
            imageUrl: imgP,
            isAvailable: true
        },
        {
            title: "Música",
            imageUrl: imgP2,
            isAvailable: false
        },
        {
            title: "Wallpapers",
            imageUrl: imgP3,
            isAvailable: false
        },
        {
            title: "Fotos",
            imageUrl: imgP4,
            isAvailable: false
        },
        {
            title: "Wallpapers",
            imageUrl: "https://visitaecuador.com/img/web/ve_wallpaper_icon.png",
            isAvailable: false
        },
        {
            title: "Fotos",
            imageUrl: "https://visitaecuador.com/img/web/ve_photo_icon.png",
            isAvailable: false
        },
        {
            title: "Wallpapers",
            imageUrl: "https://visitaecuador.com/img/web/ve_wallpaper_icon.png",
            isAvailable: false
        },
        {
            title: "Fotos",
            imageUrl: "https://visitaecuador.com/img/web/ve_photo_icon.png",
            isAvailable: false
        }
    ];

    return (
        <div className={styles.container}>
            {showSerEmbajador ? (
                <SerEmbajador />
            ) : showPresentacion ? (
                <Presentacion/>
            ) : showBeneficios ? (
                <Beneficios/>
            ) : showAdhesion ? (
                    <Adhesion/>
            ) : showMedios ? (
                    <Medios/>
            ) : showContacto ? (
                    <Contactanos/>
                ) : (
                <>
                    <Hero carouselItems={carouselItems} />

                    <div className={styles.mainContent}>
                        <div className={styles.contentArea}>
                            <ProjectsSection projectCards={projectCards} />
                            <RealitySection realityCards={realityCards} />
                            <PromotionsBenefitsSection promotions={promotions} benefits={benefits} />
                            <DownloadsSection downloadItems={downloadItems} />
                            <ProfileSlider  />
                        </div>

                        <div className={`${styles.sidebarArea} ${styles.sidebarAreaResponsive}`}>
                            <div className={sidebarStyles.sidebarContainer}>
                                <SectionDivider title="" />
                                <CancionSection cancionCard={cancionCard} cancionRef={cancionRef} />

                                <SectionDivider title="" />
                                <Facebook facebookRef={facebookRef} />

                                <SectionDivider title="" />
                                <NewsSection />
                            </div>
                        </div>
                    </div>

                    <div className={styles.linksSectionWrapper}>
                        <LinksSection linkCards={linkCards} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
