import './BotonIcono.css';

/**
 * Botón redondo que solo muestra un ícono.
 *
 * etiqueta: texto para lectores de pantalla (obligatorio: el ícono no se lee)
 * tono:     'neutro' | 'primario' | 'peligro'
 * tamano:   'chico' | 'medio'
 */
export default function BotonIcono({
    etiqueta,
    tono = 'neutro',
    tamano = 'medio',
    children,
    ...resto
}) {
    const clases = ['boton-icono', `boton-icono--${tono}`, `boton-icono--${tamano}`].join(' ');

    return (
        <button type="button" className={clases} aria-label={etiqueta} title={etiqueta} {...resto}>
            {children}
        </button>
    );
}
