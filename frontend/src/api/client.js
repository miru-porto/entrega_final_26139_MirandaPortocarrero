import axios from 'axios';

// Cliente HTTP único para toda la app
const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
});

// Normaliza las respuestas y los errores:
// - en éxito devuelve directamente los datos (sin el envoltorio de axios)
// - en error devuelve { status, mensaje, errores } con el formato del GlobalExceptionHandler del backend
client.interceptors.response.use(
    (respuesta) => respuesta.data,
    (error) => {
        const datos = error.response?.data;
        return Promise.reject({
            status: error.response?.status ?? 0,
            mensaje: datos?.mensaje ?? 'No se pudo conectar con el servidor',
            errores: datos?.errores ?? null,
        });
    },
);

export default client;
