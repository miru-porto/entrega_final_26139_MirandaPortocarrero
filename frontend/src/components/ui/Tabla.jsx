import './Tabla.css';

/**
 * Tabla de datos. Los children son el <thead> y el <tbody> tal cual.
 *
 * Para alinear una celda, ponerle la clase "derecha" o "centro":
 *   <td className="derecha">{precio}</td>
 *
 * densa: filas más bajas, para tablas anidadas
 * plana: sin fondo blanco ni sombra, cuando ya está adentro de otra caja
 */
export default function Tabla({ densa = false, plana = false, children }) {
    const clasesCaja = plana ? 'tabla-caja tabla-caja--plana' : 'tabla-caja';
    const clasesTabla = densa ? 'tabla tabla--densa' : 'tabla';

    return (
        <div className={clasesCaja}>
            <table className={clasesTabla}>{children}</table>
        </div>
    );
}
