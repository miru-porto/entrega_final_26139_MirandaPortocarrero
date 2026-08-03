import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import './Aviso.css';

/**
 * Caja de mensaje: errores del backend, advertencias, confirmaciones.
 *
 * tono: 'error' | 'alerta' | 'info' | 'exito'
 *
 * role="alert" hace que los lectores de pantalla lo anuncien apenas aparece.
 */
const ICONOS = {
    error: CircleAlert,
    alerta: TriangleAlert,
    info: Info,
    exito: CircleCheck,
};

export default function Aviso({ tono = 'info', children }) {
    const Icono = ICONOS[tono] ?? Info;

    return (
        <div className={`aviso aviso--${tono}`} role="alert">
            <Icono size={20} className="aviso__icono" />
            <div>{children}</div>
        </div>
    );
}
