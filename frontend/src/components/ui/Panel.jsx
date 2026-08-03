import './Panel.css';

/**
 * Caja blanca con sombra: la superficie sobre la que se apoya el contenido.
 * Acepta className para ajustes puntuales desde quien lo usa.
 */
export default function Panel({ className = '', children, ...resto }) {
    return (
        <section className={`panel ${className}`.trim()} {...resto}>
            {children}
        </section>
    );
}
