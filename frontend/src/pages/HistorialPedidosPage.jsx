import { useEffect, useState } from 'react';
import {
    Accordion, AccordionDetails, AccordionSummary, Alert, Stack, Table, TableBody,
    TableCell, TableHead, TableRow, Typography,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';

import EstadoChip from '../components/EstadoChip.jsx';
import { useUsuario } from '../context/UsuarioContext.jsx';
import { useNotificar } from '../context/NotificacionContext.jsx';
import { listarPedidosDeUsuario } from '../api/usuarios.js';
import { formatearFecha, formatearPrecio } from '../utils/formato.js';

export default function HistorialPedidosPage() {
    const [pedidos, setPedidos] = useState([]);
    const { usuario } = useUsuario();
    const notificar = useNotificar();

    useEffect(() => {
        if (!usuario) return;
        listarPedidosDeUsuario(usuario.id)
            .then(setPedidos)
            .catch((error) => notificar(error.mensaje, 'error'));
    }, [usuario, notificar]);

    if (!usuario) {
        return (
            <Alert severity="warning">
                Elegí un usuario en la barra superior para ver su historial de pedidos.
            </Alert>
        );
    }

    return (
        <>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Historial de Pedidos
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
                Pedidos de <strong>{usuario.nombre}</strong>
            </Typography>

            {pedidos.length === 0 && (
                <Typography color="text.secondary">Este usuario todavía no hizo pedidos.</Typography>
            )}

            {pedidos.map((pedido) => (
                <Accordion key={pedido.id}>
                    <AccordionSummary expandIcon={<ChevronDown />}>
                        <Stack
                            direction="row" spacing={2}
                            sx={{ flexGrow: 1, mr: 2, alignItems: 'center', justifyContent: 'space-between' }}
                        >
                            <Typography sx={{ fontWeight: 600 }}>Pedido #{pedido.id}</Typography>
                            <Typography color="text.secondary">{formatearFecha(pedido.fecha)}</Typography>
                            <EstadoChip estado={pedido.estado} />
                            <Typography color="primary" sx={{ fontWeight: 600 }}>
                                {formatearPrecio(pedido.total)}
                            </Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell align="center">Cantidad</TableCell>
                                    <TableCell align="right">Precio unitario</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pedido.lineas.map((linea) => (
                                    <TableRow key={linea.id}>
                                        <TableCell>{linea.producto.nombre}</TableCell>
                                        <TableCell align="center">{linea.cantidad}</TableCell>
                                        <TableCell align="right">{formatearPrecio(linea.precioUnitario)}</TableCell>
                                        <TableCell align="right">{formatearPrecio(linea.subtotal)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
}
