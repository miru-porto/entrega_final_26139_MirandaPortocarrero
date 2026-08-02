import { useNavigate } from 'react-router-dom';
import {
    Button, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import { ReceiptText, ShoppingCart, Trash2 } from 'lucide-react';

import { useCarrito } from '../context/CarritoContext.jsx';
import { formatearPrecio } from '../utils/formato.js';

export default function CarritoPage() {
    const { items, total, setCantidad, quitar, vaciar } = useCarrito();
    const navigate = useNavigate();

    if (items.length === 0) {
        return (
            <Stack spacing={2} sx={{ mt: 8, alignItems: 'center' }}>
                <ShoppingCart size={64} strokeWidth={1.25} style={{ color: 'var(--color-texto-desactivado)' }} />
                <Typography variant="h6" color="text.secondary">El carrito está vacío</Typography>
                <Button variant="contained" onClick={() => navigate('/productos')}>
                    Ir a productos
                </Button>
            </Stack>
        );
    }

    return (
        <>
            <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
                Carrito de Compras
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell align="center">Cantidad</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(({ producto, cantidad }) => (
                            <TableRow key={producto.id}>
                                <TableCell>{producto.nombre}</TableCell>
                                <TableCell align="right">{formatearPrecio(producto.precio)}</TableCell>
                                <TableCell align="center">
                                    <TextField
                                        type="number"
                                        size="small"
                                        value={cantidad}
                                        onChange={(evento) => setCantidad(producto.id, Number(evento.target.value))}
                                        slotProps={{ htmlInput: { min: 1, style: { width: 60, textAlign: 'center' } } }}
                                    />
                                </TableCell>
                                <TableCell align="right">{formatearPrecio(producto.precio * cantidad)}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="error" size="small" onClick={() => quitar(producto.id)}>
                                        <Trash2 size={20} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={3}>
                                <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography color="primary" sx={{ fontWeight: 700 }}>{formatearPrecio(total)}</Typography>
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: 'flex-end' }}>
                <Button color="error" onClick={vaciar}>Vaciar carrito</Button>
                <Button
                    variant="contained"
                    startIcon={<ReceiptText size={20} />}
                    onClick={() => navigate('/realizar-pedido')}
                >
                    Realizar pedido
                </Button>
            </Stack>
        </>
    );
}
