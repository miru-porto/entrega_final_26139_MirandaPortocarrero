import { createContext, useContext, useEffect, useReducer } from 'react';

// Carrito de compras global, persistido en localStorage
const CarritoContext = createContext(null);

const CLAVE_STORAGE = 'techlab-carrito';

// items: [{ producto, cantidad }]
function reducer(items, accion) {
    switch (accion.tipo) {
        case 'agregar': {
            const existente = items.find((item) => item.producto.id === accion.producto.id);
            if (existente) {
                return items.map((item) =>
                    item.producto.id === accion.producto.id
                        ? { ...item, cantidad: item.cantidad + accion.cantidad }
                        : item,
                );
            }
            return [...items, { producto: accion.producto, cantidad: accion.cantidad }];
        }
        case 'setCantidad':
            return items.map((item) =>
                item.producto.id === accion.productoId
                    ? { ...item, cantidad: Math.max(1, accion.cantidad) }
                    : item,
            );
        case 'quitar':
            return items.filter((item) => item.producto.id !== accion.productoId);
        case 'vaciar':
            return [];
        default:
            return items;
    }
}

function cargarInicial() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_STORAGE)) ?? [];
    } catch {
        return [];
    }
}

export function CarritoProvider({ children }) {
    const [items, dispatch] = useReducer(reducer, null, cargarInicial);

    // Sincroniza cada cambio del carrito a localStorage
    useEffect(() => {
        localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items));
    }, [items]);

    const valor = {
        items,
        cantidadTotal: items.reduce((suma, item) => suma + item.cantidad, 0),
        total: items.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0),
        agregar: (producto, cantidad = 1) => dispatch({ tipo: 'agregar', producto, cantidad }),
        setCantidad: (productoId, cantidad) => dispatch({ tipo: 'setCantidad', productoId, cantidad }),
        quitar: (productoId) => dispatch({ tipo: 'quitar', productoId }),
        vaciar: () => dispatch({ tipo: 'vaciar' }),
    };

    return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
    const contexto = useContext(CarritoContext);
    if (!contexto) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
    return contexto;
}
