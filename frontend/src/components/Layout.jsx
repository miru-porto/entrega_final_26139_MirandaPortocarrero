import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    AppBar, Badge, Box, Container, Drawer, FormControl, IconButton, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Toolbar, Typography,
} from '@mui/material';
import {
    History, Menu, ReceiptText, ShieldUser, ShoppingCart, Store, Tags, User,
} from 'lucide-react';

import { useCarrito } from '../context/CarritoContext.jsx';
import { useUsuario } from '../context/UsuarioContext.jsx';
import { listarUsuarios } from '../api/usuarios.js';

// Menú principal (calca las secciones de la consigna)
const SECCIONES = [
    { ruta: '/productos', etiqueta: 'Productos', icono: <Store /> },
    { ruta: '/categorias', etiqueta: 'Categorías', icono: <Tags /> },
    { ruta: '/carrito', etiqueta: 'Carrito de Compras', icono: <ShoppingCart /> },
    { ruta: '/realizar-pedido', etiqueta: 'Realizar Pedido', icono: <ReceiptText /> },
    { ruta: '/historial', etiqueta: 'Historial de Pedidos', icono: <History /> },
    { ruta: '/admin', etiqueta: 'Administración', icono: <ShieldUser /> },
];

export default function Layout() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const { cantidadTotal } = useCarrito();
    const { usuario, setUsuario } = useUsuario();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Carga los usuarios para el selector de "usuario actual"
    useEffect(() => {
        listarUsuarios().then(setUsuarios).catch(() => setUsuarios([]));
    }, []);

    const cambiarUsuario = (evento) => {
        const elegido = usuarios.find((u) => u.id === evento.target.value);
        setUsuario(elegido ?? null);
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={() => setMenuAbierto(true)} sx={{ mr: 1 }}>
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 700 }}
                        onClick={() => navigate('/productos')}
                    >
                        TechLab
                    </Typography>

                    {/* Selector de usuario actual (sin login, alcance del curso) */}
                    <User style={{ marginRight: 8 }} />
                    <FormControl variant="standard" sx={{ minWidth: 150, mr: 2 }}>
                        <Select
                            value={usuario?.id ?? ''}
                            onChange={cambiarUsuario}
                            displayEmpty
                            disableUnderline
                            sx={{ color: 'inherit', '& .MuiSelect-icon': { color: 'inherit' } }}
                        >
                            <MenuItem value="">
                                <em>Elegir usuario…</em>
                            </MenuItem>
                            {usuarios.map((u) => (
                                <MenuItem key={u.id} value={u.id}>{u.nombre}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <IconButton color="inherit" onClick={() => navigate('/carrito')}>
                        <Badge badgeContent={cantidadTotal} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer open={menuAbierto} onClose={() => setMenuAbierto(false)}>
                <Box sx={{ width: 270 }} onClick={() => setMenuAbierto(false)}>
                    <Typography variant="h6" sx={{ p: 2, fontWeight: 700, color: 'primary.main' }}>
                        Sistema de Gestión
                    </Typography>
                    <List>
                        {SECCIONES.map(({ ruta, etiqueta, icono }) => (
                            <ListItem key={ruta} disablePadding>
                                <ListItemButton selected={pathname === ruta} onClick={() => navigate(ruta)}>
                                    <ListItemIcon>{icono}</ListItemIcon>
                                    <ListItemText primary={etiqueta} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
}
