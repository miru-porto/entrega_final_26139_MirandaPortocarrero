import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import ProductosPage from './pages/ProductosPage.jsx';
import CategoriasPage from './pages/CategoriasPage.jsx';
import CarritoPage from './pages/CarritoPage.jsx';
import RealizarPedidoPage from './pages/RealizarPedidoPage.jsx';
import HistorialPedidosPage from './pages/HistorialPedidosPage.jsx';
import AdminPage from './pages/AdminPage.jsx';

import { NotificacionProvider } from './context/NotificacionContext.jsx';
import { CarritoProvider } from './context/CarritoContext.jsx';
import { UsuarioProvider } from './context/UsuarioContext.jsx';

export default function App() {
    return (
        <NotificacionProvider>
            <UsuarioProvider>
                <CarritoProvider>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Navigate to="/productos" replace />} />
                            <Route path="/productos" element={<ProductosPage />} />
                            <Route path="/categorias" element={<CategoriasPage />} />
                            <Route path="/carrito" element={<CarritoPage />} />
                            <Route path="/realizar-pedido" element={<RealizarPedidoPage />} />
                            <Route path="/historial" element={<HistorialPedidosPage />} />
                            <Route path="/admin" element={<AdminPage />} />
                        </Route>
                    </Routes>
                </CarritoProvider>
            </UsuarioProvider>
        </NotificacionProvider>
    );
}
