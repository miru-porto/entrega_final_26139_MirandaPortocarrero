import { Chip } from '@mui/material';

const COLORES = {
    PENDIENTE: 'warning',
    CONFIRMADO: 'info',
    ENVIADO: 'primary',
    ENTREGADO: 'success',
    CANCELADO: 'error',
};

// Muestra el estado de un pedido con su color correspondiente
export default function EstadoChip({ estado }) {
    return <Chip label={estado} color={COLORES[estado] ?? 'default'} size="small" />;
}
