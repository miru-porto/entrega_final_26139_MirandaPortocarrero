import client from './client.js';

export const listarPedidos = (usuarioId) =>
    client.get('/pedidos', { params: usuarioId ? { usuarioId } : {} });

export const crearPedido = (usuarioId, lineas) =>
    client.post('/pedidos', { usuarioId, lineas });

export const cambiarEstadoPedido = (id, estado) =>
    client.put(`/pedidos/${id}/estado`, { estado });
