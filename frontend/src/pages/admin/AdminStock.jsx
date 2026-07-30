import { useCallback, useEffect, useState } from 'react';
import {
    Alert, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

import { useNotificar } from '../../context/NotificacionContext.jsx';
import { actualizarStock, listarProductos, listarStockBajo } from '../../api/productos.js';

const UMBRAL_STOCK_BAJO = 5;

export default function AdminStock() {
    const [productos, setProductos] = useState([]);
    const [stockBajo, setStockBajo] = useState([]);
    // Valores en edición: { [productoId]: valor del input }
    const [edicion, setEdicion] = useState({});

    const notificar = useNotificar();

    const cargar = useCallback(() => {
        listarProductos()
            .then(setProductos)
            .catch((error) => notificar(error.mensaje, 'error'));
        listarStockBajo(UMBRAL_STOCK_BAJO)
            .then(setStockBajo)
            .catch(() => setStockBajo([]));
    }, [notificar]);

    useEffect(cargar, [cargar]);

    const guardarStock = (producto) => {
        const nuevoStock = Number(edicion[producto.id]);
        actualizarStock(producto.id, nuevoStock)
            .then(() => {
                notificar(`Stock de "${producto.nombre}" actualizado a ${nuevoStock}`);
                setEdicion(({ [producto.id]: descartado, ...resto }) => resto);
                cargar();
            })
            .catch((error) => notificar(error.mensaje, 'error'));
    };

    return (
        <>
            {stockBajo.length > 0 && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    Stock bajo (≤ {UMBRAL_STOCK_BAJO} unidades):{' '}
                    {stockBajo.map((producto) => `${producto.nombre} (${producto.stock})`).join(', ')}
                </Alert>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Stock actual</TableCell>
                            <TableCell align="center">Nuevo stock</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.map((producto) => (
                            <TableRow key={producto.id}>
                                <TableCell>{producto.id}</TableCell>
                                <TableCell>{producto.nombre}</TableCell>
                                <TableCell align="right">{producto.stock}</TableCell>
                                <TableCell align="center">
                                    <TextField
                                        type="number"
                                        size="small"
                                        placeholder={String(producto.stock)}
                                        value={edicion[producto.id] ?? ''}
                                        onChange={(evento) =>
                                            setEdicion({ ...edicion, [producto.id]: evento.target.value })
                                        }
                                        slotProps={{ htmlInput: { min: 0, style: { width: 70 } } }}
                                    />
                                    <IconButton
                                        color="primary"
                                        disabled={edicion[producto.id] === undefined || edicion[producto.id] === ''}
                                        onClick={() => guardarStock(producto)}
                                    >
                                        <CheckIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
