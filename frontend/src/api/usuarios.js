import client from './client.js';

export const listarUsuarios = () => client.get('/usuarios');

export const crearUsuario = (usuario) => client.post('/usuarios', usuario);

export const actualizarUsuario = (id, usuario) => client.put(`/usuarios/${id}`, usuario);

export const eliminarUsuario = (id) => client.delete(`/usuarios/${id}`);

export const listarPedidosDeUsuario = (id) => client.get(`/usuarios/${id}/pedidos`);
