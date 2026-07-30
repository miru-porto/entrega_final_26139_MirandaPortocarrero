import { useCallback, useEffect, useState } from 'react';
import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import ProductoCard from '../components/ProductoCard.jsx';
import ProductoFormDialog from '../components/ProductoFormDialog.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { useCarrito } from '../context/CarritoContext.jsx';
import { useNotificar } from '../context/NotificacionContext.jsx';
import { actualizarProducto, crearProducto, eliminarProducto, listarProductos } from '../api/productos.js';
import { listarCategorias } from '../api/categorias.js';

export default function ProductosPage() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [formAbierto, setFormAbierto] = useState(false);
    const [productoEnEdicion, setProductoEnEdicion] = useState(null);
    const [erroresForm, setErroresForm] = useState(null);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    const { agregar } = useCarrito();
    const notificar = useNotificar();

    const cargarProductos = useCallback((nombre) => {
        listarProductos(nombre)
            .then(setProductos)
            .catch((error) => notificar(error.mensaje, 'error'));
    }, [notificar]);

    useEffect(() => {
        cargarProductos();
        listarCategorias().then(setCategorias).catch(() => setCategorias([]));
    }, [cargarProductos]);

    // Búsqueda por nombre contra la API, con debounce para no pedir en cada tecla
    useEffect(() => {
        const timer = setTimeout(() => cargarProductos(busqueda), 350);
        return () => clearTimeout(timer);
    }, [busqueda, cargarProductos]);

    const abrirAlta = () => {
        setProductoEnEdicion(null);
        setErroresForm(null);
        setFormAbierto(true);
    };

    const abrirEdicion = (producto) => {
        setProductoEnEdicion(producto);
        setErroresForm(null);
        setFormAbierto(true);
    };

    const guardar = (datos) => {
        const promesa = productoEnEdicion
            ? actualizarProducto(productoEnEdicion.id, datos)
            : crearProducto(datos);

        promesa
            .then(() => {
                notificar(productoEnEdicion ? 'Producto actualizado' : 'Producto creado');
                setFormAbierto(false);
                cargarProductos(busqueda);
            })
            .catch((error) => {
                setErroresForm(error.errores);
                notificar(error.mensaje, 'error');
            });
    };

    const eliminar = () => {
        eliminarProducto(productoAEliminar.id)
            .then(() => {
                notificar('Producto eliminado');
                cargarProductos(busqueda);
            })
            .catch((error) => notificar(error.mensaje, 'error'))
            .finally(() => setProductoAEliminar(null));
    };

    const agregarAlCarrito = (producto) => {
        agregar(producto, 1);
        notificar(`"${producto.nombre}" agregado al carrito`);
    };

    return (
        <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                    Productos
                </Typography>
                <TextField
                    size="small"
                    placeholder="Buscar por nombre…"
                    value={busqueda}
                    onChange={(evento) => setBusqueda(evento.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start"><SearchIcon /></InputAdornment>
                            ),
                        },
                    }}
                />
                <Button variant="contained" startIcon={<AddIcon />} onClick={abrirAlta}>
                    Agregar producto
                </Button>
            </Stack>

            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
                }}
            >
                {productos.map((producto) => (
                    <ProductoCard
                        key={producto.id}
                        producto={producto}
                        onAgregarAlCarrito={agregarAlCarrito}
                        onEditar={abrirEdicion}
                        onEliminar={setProductoAEliminar}
                    />
                ))}
            </Box>

            {productos.length === 0 && (
                <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
                    No se encontraron productos.
                </Typography>
            )}

            <ProductoFormDialog
                abierto={formAbierto}
                producto={productoEnEdicion}
                categorias={categorias}
                errores={erroresForm}
                onGuardar={guardar}
                onCerrar={() => setFormAbierto(false)}
            />

            <ConfirmDialog
                abierto={productoAEliminar !== null}
                titulo="Eliminar producto"
                mensaje={`¿Seguro que querés eliminar "${productoAEliminar?.nombre}"?`}
                onConfirmar={eliminar}
                onCerrar={() => setProductoAEliminar(null)}
            />
        </>
    );
}
