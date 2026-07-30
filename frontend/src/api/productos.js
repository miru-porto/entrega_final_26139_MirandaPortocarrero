import client from './client.js';

export const listarProductos = (nombre) =>
    client.get('/productos', { params: nombre ? { nombre } : {} });

export const obtenerProducto = (id) => client.get(`/productos/${id}`);

export const crearProducto = (producto) => client.post('/productos', producto);

export const actualizarProducto = (id, producto) => client.put(`/productos/${id}`, producto);

export const actualizarStock = (id, stock) => client.patch(`/productos/${id}/stock`, { stock });

export const eliminarProducto = (id) => client.delete(`/productos/${id}`);

export const listarStockBajo = (umbral = 5) =>
    client.get('/productos/stock-bajo', { params: { umbral } });
