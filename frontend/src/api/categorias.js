import client from './client.js';

export const listarCategorias = () => client.get('/categorias');

export const crearCategoria = (categoria) => client.post('/categorias', categoria);

export const actualizarCategoria = (id, categoria) => client.put(`/categorias/${id}`, categoria);

export const eliminarCategoria = (id) => client.delete(`/categorias/${id}`);
