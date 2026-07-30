import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

// Diálogo genérico de confirmación para acciones destructivas
export default function ConfirmDialog({ abierto, titulo, mensaje, onConfirmar, onCerrar }) {
    return (
        <Dialog open={abierto} onClose={onCerrar}>
            <DialogTitle>{titulo}</DialogTitle>
            <DialogContent>
                <Typography>{mensaje}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCerrar}>Cancelar</Button>
                <Button variant="contained" color="error" onClick={onConfirmar}>Eliminar</Button>
            </DialogActions>
        </Dialog>
    );
}
