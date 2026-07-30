import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    AppBar, Badge, Box, Container, Drawer, FormControl, IconButton, List, ListItem,
    ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Toolbar, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

import { useCarrito } from '../context/CarritoContext.jsx';
import { useUsuario } from '../context/UsuarioContext.jsx';
import { listarUsuarios } from '../api/usuarios.js';

// Menú principal (calca las secciones de la consigna)
const SECCIONES = [
    { ruta: '/productos', etiqueta: 'Productos', icono: <StorefrontIcon /> },
    { ruta: '/categorias', etiqueta: 'Categorías', icono: <CategoryIcon /> },
    { ruta: '/carrito', etiqueta: 'Carrito de Compras', icono: <ShoppingCartIcon /> },
    { ruta: '/realizar-pedido', etiqueta: 'Realizar Pedido', icono: <ReceiptLongIcon /> },
    { ruta: '/historial', etiqueta: 'Historial de Pedidos', icono: <HistoryIcon /> },
    { ruta: '/admin', etiqueta: 'Administración', icono: <AdminPanelSettingsIcon /> },
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
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 700 }}
                        onClick={() => navigate('/productos')}
                    >
                        TechLab
                    </Typography>

                    {/* Selector de usuario actual (sin login, alcance del curso) */}
                    <PersonIcon sx={{ mr: 1 }} />
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
                            <ShoppingCartIcon />
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
