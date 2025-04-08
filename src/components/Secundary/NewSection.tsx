import React, { useState, useEffect } from 'react';
import styles from '../styles/News.module.css';
import {
    NotificationOutlined,
    ClockCircleOutlined,
    ShareAltOutlined,
    RightOutlined,
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    WhatsAppOutlined,
    CloseOutlined
} from "@ant-design/icons";
import CategoryFilters from "./News/CategoryFilters.tsx";

interface NewsItem {
    id: string;
    title: string;
    summary: string;
    date: string;
    category: string;
    important?: boolean;
    readTime?: string;
    content?: string;
}

const NewsSection: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [animatedItems, setAnimatedItems] = useState<string[]>([]);
    const [expandedArticle, setExpandedArticle] = useState<string | null>(null);
    const [showShareModal, setShowShareModal] = useState<boolean>(false);
    const [shareItemId, setShareItemId] = useState<string | null>(null);

    const newsItems: NewsItem[] = [
        {
            id: '1',
            title: 'Influencers emergentes transforman el turismo en Ecuador',
            summary: 'Jóvenes creadores de contenido están revolucionando la forma en que se promocionan los destinos turísticos menos conocidos, atrayendo visitantes a comunidades rurales y generando impacto económico positivo.',
            date: '2024-03-09',
            category: 'TENDENCIAS',
            important: true,
            readTime: '4 min',
            content: 'Los influencers ecuatorianos se han convertido en embajadores digitales de destinos poco explorados. Con sus cámaras y creatividad, jóvenes como María Delgado (156K seguidores) y Carlos Ramírez (203K seguidores) han logrado que pequeñas comunidades como Agua Blanca en Manabí y Salinas de Guaranda en Bolívar experimenten un aumento del 45% en visitantes durante el último trimestre.\n\nEsta nueva forma de promoción turística se caracteriza por mostrar experiencias auténticas, sostenibles y con un fuerte componente cultural. "No se trata solo de lugares bonitos para Instagram, sino de conectar realmente con las comunidades y sus tradiciones", comenta Delgado, quien ha colaborado con cinco comunidades indígenas para crear rutas alternativas en la Sierra ecuatoriana.\n\nEl Ministerio de Turismo ha reconocido el impacto de estos nuevos promotores y ha lanzado el programa "Influencers por Ecuador", que certificará a creadores de contenido comprometidos con mostrar el país de manera responsable y auténtica.'
        },
        {
            id: '2',
            title: 'Festival Gastronómico "Sabores del Ecuador" llega a tres provincias',
            summary: 'El evento culinario más importante del país recorrerá Azuay, Manabí y Pichincha durante abril y mayo, presentando lo mejor de la cocina tradicional ecuatoriana con un enfoque en ingredientes autóctonos y técnicas ancestrales.',
            date: '2024-03-04',
            category: 'EVENTOS',
            readTime: '3 min',
            content: 'El Festival "Sabores del Ecuador" celebrará su décima edición con un formato itinerante que por primera vez recorrerá tres provincias en dos meses. El evento comenzará en Cuenca del 12 al 14 de abril, continuará en Manta del 26 al 28 de abril, y finalizará en Quito del 10 al 12 de mayo.\n\nEsta edición contará con la participación de más de 80 chefs nacionales y 15 internacionales invitados, quienes ofrecerán demostraciones culinarias, catas y talleres. El tema central será "Raíces y Evolución", destacando la importancia de los ingredientes nativos como amaranto, mashua, mortiño y variedades de ajíes ecuatorianos.\n\nLa chef Patricia Guzmán, directora del festival, explica: "Queremos celebrar nuestra biodiversidad culinaria y mostrar cómo la cocina tradicional puede dialogar con técnicas contemporáneas sin perder su esencia".\n\nLas entradas para cada sede están disponibles en la plataforma TicketShow con precios desde $15 para un día hasta $35 para el pase completo de tres días. Se espera una asistencia de más de 25,000 personas en total.'
        },
        {
            id: '3',
            title: 'Embajadores de VisitaEcuador revelan rutas secretas de la Amazonía',
            summary: 'Tres destacados aventureros comparten experiencias transformadoras en destinos poco explorados del oriente ecuatoriano, destacando el turismo sostenible y el contacto directo con comunidades indígenas como experiencias imperdibles.',
            date: '2024-02-27',
            category: 'TESTIMONIOS',
            readTime: '5 min',
            content: 'Los embajadores de VisitaEcuador, Andrés Córdova, Lucía Vega y Santiago Torres, presentaron ayer sus experiencias en la Amazonía ecuatoriana durante el evento "Ecuador Profundo" en el Centro de Convenciones Metropolitano.\n\nLos tres aventureros documentaron durante dos meses rutas poco conocidas en Sucumbíos, Orellana y Pastaza, trabajando directamente con guías locales y comunidades indígenas. "Lo que descubrimos va mucho más allá del turismo convencional", explicó Córdova. "Son experiencias que conectan al visitante con saberes ancestrales y una biodiversidad asombrosa".\n\nEntre los hallazgos destacan la "Ruta de las Cascadas Sagradas" en territorio A\'i Cofán, el circuito de observación nocturna de fauna en la Reserva Limoncocha, y las expediciones en canoa por los tributarios menos explorados del río Napo. Vega, bióloga de profesión, comentó que documentaron más de 300 especies de aves, algunas raramente vistas por turistas convencionales.\n\nLas rutas serán incluidas próximamente en la plataforma digital de VisitaEcuador, con códigos QR que permitirán a los viajeros acceder a guías completas, mapas interactivos y contactos directos con guías locales certificados.'
        },
        {
            id: '4',
            title: 'Galápagos implementa nuevo programa de conservación marina',
            summary: 'Iniciativa pionera busca equilibrar el turismo sostenible con la protección de ecosistemas frágiles. Visitantes podrán participar en actividades de ciencia ciudadana durante sus recorridos por el archipiélago.',
            date: '2024-02-20',
            category: 'CONSERVACIÓN',
            readTime: '6 min',
            content: 'El Parque Nacional Galápagos lanzó oficialmente el programa "Mares Vivos", una iniciativa que involucra directamente a turistas en labores de conservación marina a través de ciencia ciudadana. El programa se implementará en todas las embarcaciones turísticas que operan en el archipiélago a partir del 15 de marzo.\n\nLos visitantes podrán participar en actividades como monitoreo de especies marinas, registro de avistamientos de fauna con una aplicación especial, y colaboración en la recolección de microplásticos durante sus actividades de snorkel y buceo. Toda la información recopilada será analizada por científicos del Parque Nacional y universidades asociadas.\n\n"Transformamos al turista de un simple observador a un colaborador activo en la conservación", explicó Daniela Mera, directora del programa. "La experiencia de viaje se enriquece con conocimiento científico real y la satisfacción de contribuir a la preservación de este ecosistema único".\n\nLas operadoras turísticas han recibido capacitación durante los últimos tres meses y cada embarcación contará con un kit de ciencia ciudadana. Se estima que el programa generará datos equivalentes a 15,000 horas de investigación científica anualmente, según proyecciones del Parque Nacional.'
        },
        {
            id: '5',
            title: 'Ruta del Cacao: Nueva experiencia turística en la Costa ecuatoriana',
            summary: 'Descubre el fascinante proceso de producción del mejor cacao fino de aroma del mundo, desde la plantación hasta la fabricación artesanal de chocolate premium en haciendas históricas.',
            date: '2024-02-15',
            category: 'EXPERIENCIAS',
            important: true,
            readTime: '4 min',
            content: 'La "Ruta del Cacao Ecuatoriano" fue presentada oficialmente como el nuevo producto turístico estrella para la región Costa. El circuito, que abarca haciendas históricas en las provincias de Guayas, Los Ríos y El Oro, ofrece una inmersión completa en el mundo del cacao fino de aroma, producto emblemático del Ecuador.\n\nLa ruta incluye visitas a cinco haciendas centenarias donde los visitantes pueden participar en todas las etapas del proceso: desde la siembra y cosecha hasta la fermentación, secado y elaboración artesanal de chocolate. La experiencia está diseñada para desarrollarse en 3 a 5 días, con opciones de alojamiento en las propias haciendas restauradas que mantienen su arquitectura tradicional de la época cacaotera.\n\n"Ecuador produce el mejor cacao fino de aroma del mundo, pero pocos conocen realmente la historia y el proceso detrás de este producto que transformó nuestra economía a inicios del siglo XX", explicó Miguel Andrade, coordinador de la iniciativa. "Esta ruta busca poner en valor ese patrimonio agrícola y cultural".\n\nLa experiencia incluye también talleres de elaboración de chocolate con maestros chocolateros, maridajes con productos ecuatorianos, y encuentros con familias productoras que han cultivado cacao por generaciones. Los paquetes turísticos ya están disponibles a través de operadoras certificadas y en el portal VisitaEcuador.com.'
        }
    ];

    const categories = Array.from(new Set(newsItems.map(item => item.category)));

    useEffect(() => {

        if (categories.length > 0 && activeCategory === '') {
            setActiveCategory(categories[0]);
        }

        const timer = setTimeout(() => {
            setAnimatedItems(newsItems.map(item => item.id));
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options as any);
    };


    const filteredNews = newsItems.filter(item => item.category === activeCategory);

    const handleShareClick = (id: string) => {
        setShareItemId(id);
        setShowShareModal(true);
    };

    const handleReadMore = (id: string) => {
        if (expandedArticle === id) {
            setExpandedArticle(null);
        } else {
            setExpandedArticle(id);
        }
    };

    const getArticleById = (id: string) => {
        return newsItems.find(item => item.id === id);
    };

    const shareArticle = (platform: string) => {
        if (!shareItemId) return;

        const article = getArticleById(shareItemId);
        if (!article) return;

        const shareText = `${article.title} - VisitaEcuador`;
        const shareUrl = `https://visitaecuador.com/noticias/${shareItemId}`;

        let shareLink = '';

        switch(platform) {
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'linkedin':
                shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
                break;
            case 'whatsapp':
                shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
                break;
            default:
                navigator.clipboard.writeText(shareUrl).then(() => {
                    alert('Enlace copiado al portapapeles');
                });
                setShowShareModal(false);
                return;
        }

        window.open(shareLink, '_blank', 'width=600,height=400');
        setShowShareModal(false);
    };

    return (
        <div className={styles.newsContainer}>
            <div className={styles.newsHeader}>
                <div className={styles.redBar}></div>
                <h2 className={styles.sectionTitle}>
                    <NotificationOutlined style={{ color: '#e30613', fontSize: '24px', marginRight: 10 }} />
                    ÚLTIMAS NOTICIAS
                </h2>
            </div>

            <CategoryFilters
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <div className={styles.newsGrid}>
                {filteredNews.map((item) => (
                    <article
                        key={item.id}
                        className={styles.newsItem}
                        style={{
                            transform: animatedItems.includes(item.id) ? 'translateY(0)' : 'translateY(20px)',
                            opacity: animatedItems.includes(item.id) ? 1 : 0,
                            transition: 'all 0.5s ease',
                            marginBottom: '30px',
                            padding: '16px',
                            borderLeft: item.important ? '4px solid #e30613' : 'none',
                            borderRadius: '4px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            background: 'linear-gradient(to right, #fff 0%, #f9f9f9 100%)'
                        }}
                    >
                        <div className={styles.newsContent}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{
                                    background: item.category === 'TENDENCIAS' ? '#ff4d4f' :
                                        item.category === 'EVENTOS' ? '#1890ff' :
                                            item.category === 'TESTIMONIOS' ? '#52c41a' :
                                                item.category === 'CONSERVACIÓN' ? '#13c2c2' : '#722ed1',
                                    color: 'white',
                                    padding: '4px 10px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                }}>
                                    {item.category}
                                </span>
                                {item.important && (
                                    <span style={{
                                        background: 'rgba(227, 6, 19, 0.1)',
                                        color: '#e30613',
                                        padding: '4px 10px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        ★ DESTACADO
                                    </span>
                                )}
                            </div>

                            <h3 className={styles.newsTitle} style={{
                                fontSize: item.important ? '22px' : '20px',
                                borderBottom: '1px solid #f0f0f0',
                                paddingBottom: '10px',
                                marginBottom: '12px'
                            }}>
                                {item.title}
                            </h3>

                            <p className={styles.summary} style={{
                                fontSize: '15px',
                                lineHeight: '1.6',
                                color: '#555',
                                textAlign: 'justify'
                            }}>
                                {item.summary}
                            </p>

                            {expandedArticle === item.id && (
                                <div
                                    style={{
                                        marginTop: '20px',
                                        padding: '15px',
                                        borderRadius: '4px',
                                        background: '#f9f9f9',
                                        borderLeft: '4px solid #e30613',
                                        fontSize: '15px',
                                        lineHeight: '1.6',
                                        color: '#333',
                                        textAlign: 'justify',
                                        whiteSpace: 'pre-line',
                                        animation: 'fadeIn 0.5s ease'
                                    }}
                                >
                                    {item.content}
                                </div>
                            )}

                            <div className={styles.metadata} style={{
                                marginTop: '16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span className={styles.date} style={{
                                    color: '#777',
                                    fontSize: '14px',
                                    fontStyle: 'italic'
                                }}>
                                    {formatDate(item.date)}
                                </span>
                                <span className={styles.timeToRead} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: '#777',
                                    fontSize: '13px'
                                }}>
                                    <ClockCircleOutlined /> {item.readTime}
                                </span>
                            </div>

                            <div className={styles.newsFooter} style={{
                                marginTop: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: '16px',
                                borderTop: '1px dashed #e0e0e0'
                            }}>
                                <button
                                    className={styles.shareButton}
                                    onClick={() => handleShareClick(item.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: 'transparent',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        padding: '6px 12px',
                                        color: '#666',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        position: 'relative'
                                    }}
                                >
                                    <ShareAltOutlined /> Compartir
                                </button>
                                <button
                                    className={styles.readMoreButton}
                                    onClick={() => handleReadMore(item.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        background: expandedArticle === item.id ? '#e30613' : 'transparent',
                                        border: expandedArticle === item.id ? 'none' : '1px solid #e30613',
                                        borderRadius: '4px',
                                        padding: '6px 12px',
                                        color: expandedArticle === item.id ? 'white' : '#e30613',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {expandedArticle === item.id ? (
                                        <>Colapsar <CloseOutlined /></>
                                    ) : (
                                        <>Seguir leyendo <RightOutlined /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {showShareModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        width: '300px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '15px'
                        }}>
                            <h3 style={{ margin: 0, fontSize: '18px' }}>Compartir artículo</h3>
                            <button
                                onClick={() => setShowShareModal(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                <CloseOutlined />
                            </button>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginBottom: '15px'
                        }}>
                            <button
                                onClick={() => shareArticle('facebook')}
                                style={{
                                    background: '#1877F2',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px'
                                }}
                            >
                                <FacebookOutlined />
                            </button>

                            <button
                                onClick={() => shareArticle('twitter')}
                                style={{
                                    background: '#1DA1F2',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px'
                                }}
                            >
                                <TwitterOutlined />
                            </button>

                            <button
                                onClick={() => shareArticle('linkedin')}
                                style={{
                                    background: '#0A66C2',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px'
                                }}
                            >
                                <LinkedinOutlined />
                            </button>

                            <button
                                onClick={() => shareArticle('whatsapp')}
                                style={{
                                    background: '#25D366',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    fontSize: '20px'
                                }}
                            >
                                <WhatsAppOutlined />
                            </button>
                        </div>

                        <button
                            onClick={() => shareArticle('copy')}
                            style={{
                                background: '#f0f0f0',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                width: '100%',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Copiar enlace
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsSection;
