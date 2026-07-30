import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';

import AdminUsuarios from './admin/AdminUsuarios.jsx';
import AdminStock from './admin/AdminStock.jsx';
import AdminPedidos from './admin/AdminPedidos.jsx';

// Panel de administración: usuarios, stock y estados de pedidos
export default function AdminPage() {
    const [tab, setTab] = useState(0);

    return (
        <>
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                Administración
            </Typography>

            <Tabs value={tab} onChange={(evento, valor) => setTab(valor)} sx={{ mb: 3 }}>
                <Tab label="Usuarios" />
                <Tab label="Stock" />
                <Tab label="Pedidos" />
            </Tabs>

            <Box hidden={tab !== 0}>{tab === 0 && <AdminUsuarios />}</Box>
            <Box hidden={tab !== 1}>{tab === 1 && <AdminStock />}</Box>
            <Box hidden={tab !== 2}>{tab === 2 && <AdminPedidos />}</Box>
        </>
    );
}
