import './Boton.css';

/**
 * Botón de la aplicación.
 *
 * variante: 'solido' (relleno, el de las acciones principales) o 'texto' (sin fondo)
 * tono:     'primario' o 'peligro' (para las acciones destructivas)
 * tamano:   'chico' | 'medio' | 'grande'
 * icono:    nodo que se dibuja antes del texto
 * bloque:   ocupa todo el ancho disponible
 */
export default function Boton({
    variante = 'solido',
    tono = 'primario',
    tamano = 'medio',
    icono,
    bloque = false,
    children,
    ...resto
}) {
    const clases = [
        'boton',
        `boton--${variante}`,
        `boton--${tono}`,
        `boton--${tamano}`,
        bloque ? 'boton--bloque' : '',
    ].filter(Boolean).join(' ');

    return (
        <button type="button" className={clases} {...resto}>
            {icono}
            {children}
        </button>
    );
}
