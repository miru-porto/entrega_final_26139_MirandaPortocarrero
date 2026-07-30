// Helpers de formato compartidos por toda la app

export const formatearPrecio = (valor) =>
    (valor ?? 0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

export const formatearFecha = (fechaIso) =>
    new Date(fechaIso).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });
