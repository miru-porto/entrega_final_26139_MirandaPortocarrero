import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert, Button, Divider, List, ListItem, ListItemText, Paper, Stack, Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useCarrito } from '../context/CarritoContext.jsx';
import { useUsuario } from '../context/UsuarioContext.jsx';
import { useNotificar } from '../context/NotificacionContext.jsx';
import { crearPedido } from '../api/pedidos.js';
import { formatearPrecio } from '../utils/formato.js';

export default function RealizarPedidoPage() {
    const { items, total, vaciar } = useCarrito();
    const { usuario } = useUsuario();
    const notificar = useNotificar();
    const navigate = useNavigate();
    const [errorPedido, setErrorPedido] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const confirmar = () => {
        setErrorPedido(null);
        setEnviando(true);

        const lineas = items.map(({ producto, cantidad }) => ({
            productoId: producto.id,
            cantidad,
        }));

        crearPedido(usuario.id, lineas)
            .then((pedido) => {
                // Éxito: el backend ya descontó el stock; se vacía el carrito
                vaciar();
                notificar(`Pedido #${pedido.id} creado por ${formatearPrecio(pedido.total)}`);
                navigate('/historial');
            })
            .catch((error) => {
                // Error (ej: stock insuficiente): el carrito NO se vacía
                setErrorPedido(error.mensaje);
            })
            .finally(() => setEnviando(false));
    };

    if (items.length === 0) {
        return (
            <Stack spacing={2} sx={{ mt: 8, alignItems: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay productos en el carrito para hacer un pedido.
                </Typography>
                <Button variant="contained" onClick={() => navigate('/productos')}>
                    Ir a productos
                </Button>
            </Stack>
        );
    }

    return (
        <>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Realizar Pedido
            </Typography>

            <Paper sx={{ p: 3, maxWidth: 560, mx: 'auto' }}>
                <Typography variant="h6" sx={{ mb: 1 }}>Resumen</Typography>
                <List dense>
                    {items.map(({ producto, cantidad }) => (
                        <ListItem key={producto.id} disableGutters>
                            <ListItemText
                                primary={`${producto.nombre} × ${cantidad}`}
                                secondary={formatearPrecio(producto.precio * cantidad)}
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ my: 1 }} />
                <Stack direction="row" sx={{ mb: 2, justifyContent: 'space-between' }}>
                    <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                    <Typography color="primary" sx={{ fontWeight: 700 }}>{formatearPrecio(total)}</Typography>
                </Stack>

                {usuario ? (
                    <Typography sx={{ mb: 2 }}>
                        Pedido a nombre de: <strong>{usuario.nombre}</strong>
                    </Typography>
                ) : (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                        Elegí un usuario en la barra superior para poder confirmar el pedido.
                    </Alert>
                )}

                {errorPedido && (
                    <Alert severity="error" sx={{ mb: 2 }}>{errorPedido}</Alert>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    startIcon={<CheckCircleIcon />}
                    disabled={!usuario || enviando}
                    onClick={confirmar}
                >
                    {enviando ? 'Enviando…' : 'Confirmar pedido'}
                </Button>
            </Paper>
        </>
    );
}
