import styles from "../styles/cancion.module.css";

const Cancion = () => {
    return (
        <iframe
            className={styles.iframe}
            src="https://www.youtube.com/embed/IcwSeZRhPKc"
            title="Descarga la App Club Visita"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}

export default Cancion;
