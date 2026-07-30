import { createContext, useCallback, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

// Notificaciones globales (snackbar): cualquier componente llama notificar(mensaje, severidad)
const NotificacionContext = createContext(null);

export function NotificacionProvider({ children }) {
    const [notificacion, setNotificacion] = useState(null);

    const notificar = useCallback((mensaje, severidad = 'success') => {
        setNotificacion({ mensaje, severidad });
    }, []);

    const cerrar = () => setNotificacion(null);

    return (
        <NotificacionContext.Provider value={notificar}>
            {children}
            <Snackbar
                open={notificacion !== null}
                autoHideDuration={4000}
                onClose={cerrar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                {notificacion && (
                    <Alert onClose={cerrar} severity={notificacion.severidad} variant="filled">
                        {notificacion.mensaje}
                    </Alert>
                )}
            </Snackbar>
        </NotificacionContext.Provider>
    );
}

export function useNotificar() {
    const contexto = useContext(NotificacionContext);
    if (!contexto) throw new Error('useNotificar debe usarse dentro de NotificacionProvider');
    return contexto;
}
