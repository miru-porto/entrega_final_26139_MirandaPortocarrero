import { useId } from 'react';
import './Selector.css';

/**
 * Lista desplegable. Los children son las <option>.
 *
 * etiqueta: texto del <label>. Si no se pasa, no se dibuja (usar aria-label)
 * error:    mensaje de error; pinta el borde de rojo
 *
 * El resto de las props (value, onChange, name, disabled…) van al <select>.
 */
export default function Selector({ etiqueta, error, children, ...resto }) {
    const id = useId();
    const idError = `${id}-error`;

    return (
        <div className={error ? 'selector selector--con-error' : 'selector'}>
            {etiqueta && <label className="selector__etiqueta" htmlFor={id}>{etiqueta}</label>}
            <select
                id={id}
                className="selector__control"
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? idError : undefined}
                {...resto}
            >
                {children}
            </select>
            {error && <span className="selector__mensaje" id={idError}>{error}</span>}
        </div>
    );
}
