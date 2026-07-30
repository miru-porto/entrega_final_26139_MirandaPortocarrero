import { createContext, useContext, useEffect, useState } from 'react';

// Usuario "actual" de la sesión (sin login: se elige desde el selector del AppBar)
const UsuarioContext = createContext(null);

const CLAVE_STORAGE = 'techlab-usuario';

function cargarInicial() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_STORAGE)) ?? null;
    } catch {
        return null;
    }
}

export function UsuarioProvider({ children }) {
    const [usuario, setUsuario] = useState(cargarInicial);

    useEffect(() => {
        if (usuario) {
            localStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuario));
        } else {
            localStorage.removeItem(CLAVE_STORAGE);
        }
    }, [usuario]);

    return (
        <UsuarioContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </UsuarioContext.Provider>
    );
}

export function useUsuario() {
    const contexto = useContext(UsuarioContext);
    if (!contexto) throw new Error('useUsuario debe usarse dentro de UsuarioProvider');
    return contexto;
}
