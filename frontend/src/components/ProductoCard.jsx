import {
    Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Stack, Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { formatearPrecio } from '../utils/formato.js';

const IMAGEN_FALLBACK = 'https://placehold.co/400x300?text=Sin+imagen';

// Tarjeta de producto de la grilla del catálogo
export default function ProductoCard({ producto, onAgregarAlCarrito, onEditar, onEliminar }) {
    const sinStock = producto.stock === 0;

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="150"
                image={producto.imagen || IMAGEN_FALLBACK}
                alt={producto.nombre}
                onError={(e) => { e.target.src = IMAGEN_FALLBACK; }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between', alignItems: 'start' }}>
                    <Typography variant="h6" component="h2" sx={{ fontSize: '1.05rem' }}>
                        {producto.nombre}
                    </Typography>
                    {producto.categoria && <Chip label={producto.categoria.nombre} size="small" />}
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                    {producto.descripcion}
                </Typography>
                <Typography variant="h6" color="primary">
                    {formatearPrecio(producto.precio)}
                </Typography>
                <Typography variant="caption" color={sinStock ? 'error' : 'text.secondary'}>
                    {sinStock ? 'Sin stock' : `Stock: ${producto.stock}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<AddShoppingCartIcon />}
                    disabled={sinStock}
                    onClick={() => onAgregarAlCarrito(producto)}
                >
                    Agregar
                </Button>
                <IconButton size="small" onClick={() => onEditar(producto)} aria-label="editar">
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => onEliminar(producto)} aria-label="eliminar">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </CardActions>
        </Card>
    );
}
