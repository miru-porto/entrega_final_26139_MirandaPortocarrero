import { useEffect, useRef } from 'react';
import './Modal.css';

/**
 * Ventana modal construida sobre el <dialog> nativo del navegador.
 *
 * Usar <dialog> con showModal() nos da gratis: el fondo oscurecido, el foco
 * atrapado adentro, el cierre con Escape y quedar por encima de todo.
 *
 * abierto:  controla la apertura desde el estado del componente padre
 * titulo:   encabezado de la ventana
 * acciones: nodos del pie (los botones)
 * ancho:    'chico' | 'medio'
 */
export default function Modal({ abierto, titulo, acciones, ancho = 'medio', onCerrar, children }) {
    const dialogo = useRef(null);

    useEffect(() => {
        const elemento = dialogo.current;
        if (!elemento) return;

        // showModal() y close() rompen si el diálogo ya está en ese estado
        if (abierto && !elemento.open) elemento.showModal();
        if (!abierto && elemento.open) elemento.close();
    }, [abierto]);

    // El click solo llega al <dialog> cuando cae fuera del contenido, o sea en el fondo
    const clickEnFondo = (evento) => {
        if (evento.target === dialogo.current) onCerrar();
    };

    return (
        <dialog
            ref={dialogo}
            className={`modal modal--${ancho}`}
            onClose={onCerrar}
            onClick={clickEnFondo}
        >
            <h2 className="modal__titulo">{titulo}</h2>
            <div className="modal__cuerpo">{children}</div>
            {acciones && <div className="modal__acciones">{acciones}</div>}
        </dialog>
    );
}
