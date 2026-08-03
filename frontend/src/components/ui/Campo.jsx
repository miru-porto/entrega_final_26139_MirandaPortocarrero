import { useId } from 'react';
import './Campo.css';

/**
 * Campo de texto con su etiqueta y, si corresponde, el mensaje de error.
 *
 * etiqueta:   texto del <label>. Si no se pasa, no se dibuja (usar aria-label)
 * error:      mensaje de error del backend; pinta el borde de rojo
 * ayuda:      texto de apoyo cuando no hay error
 * multilinea: usa <textarea> en vez de <input>
 * adorno:     nodo que se dibuja adentro del campo, a la izquierda (ej: la lupa)
 *
 * El resto de las props (value, onChange, name, type, required…) van al input.
 */
export default function Campo({
    etiqueta,
    error,
    ayuda,
    multilinea = false,
    filas = 3,
    adorno,
    ...resto
}) {
    const id = useId();
    const idAyuda = `${id}-ayuda`;
    const mensaje = error ?? ayuda;

    const Elemento = multilinea ? 'textarea' : 'input';

    return (
        <div className={error ? 'campo campo--con-error' : 'campo'}>
            {etiqueta && <label className="campo__etiqueta" htmlFor={id}>{etiqueta}</label>}
            <div className="campo__caja">
                {adorno && <span className="campo__adorno">{adorno}</span>}
                <Elemento
                    id={id}
                    className="campo__control"
                    rows={multilinea ? filas : undefined}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={mensaje ? idAyuda : undefined}
                    {...resto}
                />
            </div>
            {mensaje && (
                <span className="campo__mensaje" id={idAyuda}>{mensaje}</span>
            )}
        </div>
    );
}
