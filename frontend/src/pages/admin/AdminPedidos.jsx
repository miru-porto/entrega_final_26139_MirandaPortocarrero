import { useCallback, useEffect, useState } from 'react';
import {
    MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Typography,
} from '@mui/material';

import EstadoChip from '../../components/EstadoChip.jsx';
import { useNotificar } from '../../context/NotificacionContext.jsx';
import { cambiarEstadoPedido, listarPedidos } from '../../api/pedidos.js';
import { formatearFecha, formatearPrecio } from '../../utils/formato.js';

const ESTADOS = ['PENDIENTE', 'CONFIRMADO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'];

export default function AdminPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const notificar = useNotificar();

    const cargar = useCallback(() => {
        listarPedidos()
            .then(setPedidos)
            .catch((error) => notificar(error.mensaje, 'error'));
    }, [notificar]);

    useEffect(cargar, [cargar]);

    const cambiarEstado = (pedido, estado) => {
        cambiarEstadoPedido(pedido.id, estado)
            .then(() => {
                notificar(`Pedido #${pedido.id} pasó a ${estado}`);
                cargar();
            })
            // El backend rechaza transiciones inválidas (ej: ENTREGADO -> PENDIENTE)
            .catch((error) => notificar(error.mensaje, 'error'));
    };

    if (pedidos.length === 0) {
        return <Typography color="text.secondary">Todavía no hay pedidos.</Typography>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>N°</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Usuario</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="center">Estado</TableCell>
                        <TableCell align="center">Cambiar a</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pedidos.map((pedido) => (
                        <TableRow key={pedido.id}>
                            <TableCell>#{pedido.id}</TableCell>
                            <TableCell>{formatearFecha(pedido.fecha)}</TableCell>
                            <TableCell>{pedido.usuario.nombre}</TableCell>
                            <TableCell align="right">{formatearPrecio(pedido.total)}</TableCell>
                            <TableCell align="center"><EstadoChip estado={pedido.estado} /></TableCell>
                            <TableCell align="center">
                                <Select
                                    size="small"
                                    value=""
                                    displayEmpty
                                    onChange={(evento) => cambiarEstado(pedido, evento.target.value)}
                                >
                                    <MenuItem value="" disabled><em>Elegir…</em></MenuItem>
                                    {ESTADOS.filter((estado) => estado !== pedido.estado).map((estado) => (
                                        <MenuItem key={estado} value={estado}>{estado}</MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
