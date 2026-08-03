import './Etiqueta.css';

/**
 * Píldora de texto corto: la categoría de un producto, el estado de un pedido.
 *
 * tono: 'neutro' | 'primario' | 'exito' | 'error' | 'info' | 'alerta'
 */
export default function Etiqueta({ tono = 'neutro', children }) {
    return <span className={`etiqueta etiqueta--${tono}`}>{children}</span>;
}
