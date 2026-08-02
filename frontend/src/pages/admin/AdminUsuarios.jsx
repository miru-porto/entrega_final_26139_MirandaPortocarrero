import { useCallback, useEffect, useState } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
} from '@mui/material';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import { useNotificar } from '../../context/NotificacionContext.jsx';
import { actualizarUsuario, crearUsuario, eliminarUsuario, listarUsuarios } from '../../api/usuarios.js';

const FORM_VACIO = { nombre: '', email: '', direccion: '' };

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [formAbierto, setFormAbierto] = useState(false);
    const [usuarioEnEdicion, setUsuarioEnEdicion] = useState(null);
    const [form, setForm] = useState(FORM_VACIO);
    const [erroresForm, setErroresForm] = useState(null);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

    const notificar = useNotificar();

    const cargar = useCallback(() => {
        listarUsuarios()
            .then(setUsuarios)
            .catch((error) => notificar(error.mensaje, 'error'));
    }, [notificar]);

    useEffect(cargar, [cargar]);

    const abrirForm = (usuario = null) => {
        setUsuarioEnEdicion(usuario);
        setForm(usuario
            ? { nombre: usuario.nombre, email: usuario.email, direccion: usuario.direccion ?? '' }
            : FORM_VACIO);
        setErroresForm(null);
        setFormAbierto(true);
    };

    const guardar = () => {
        const promesa = usuarioEnEdicion
            ? actualizarUsuario(usuarioEnEdicion.id, form)
            : crearUsuario(form);

        promesa
            .then(() => {
                notificar(usuarioEnEdicion ? 'Usuario actualizado' : 'Usuario creado');
                setFormAbierto(false);
                cargar();
            })
            .catch((error) => {
                setErroresForm(error.errores);
                notificar(error.mensaje, 'error');
            });
    };

    const eliminar = () => {
        eliminarUsuario(usuarioAEliminar.id)
            .then(() => {
                notificar('Usuario eliminado');
                cargar();
            })
            .catch((error) => notificar(error.mensaje, 'error'))
            .finally(() => setUsuarioAEliminar(null));
    };

    return (
        <>
            <Stack direction="row" sx={{ mb: 2, justifyContent: 'flex-end' }}>
                <Button variant="contained" startIcon={<Plus size={20} />} onClick={() => abrirForm()}>
                    Agregar usuario
                </Button>
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.map((usuario) => (
                            <TableRow key={usuario.id}>
                                <TableCell>{usuario.id}</TableCell>
                                <TableCell>{usuario.nombre}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>{usuario.direccion}</TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" onClick={() => abrirForm(usuario)}>
                                        <Pencil size={20} />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => setUsuarioAEliminar(usuario)}>
                                        <Trash2 size={20} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={formAbierto} onClose={() => setFormAbierto(false)} fullWidth maxWidth="xs">
                <DialogTitle>{usuarioEnEdicion ? 'Editar usuario' : 'Agregar usuario'}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Nombre"
                            value={form.nombre}
                            onChange={(evento) => setForm({ ...form, nombre: evento.target.value })}
                            error={Boolean(erroresForm?.nombre)}
                            helperText={erroresForm?.nombre}
                            required
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={form.email}
                            onChange={(evento) => setForm({ ...form, email: evento.target.value })}
                            error={Boolean(erroresForm?.email)}
                            helperText={erroresForm?.email}
                            required
                        />
                        <TextField
                            label="Dirección"
                            value={form.direccion}
                            onChange={(evento) => setForm({ ...form, direccion: evento.target.value })}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFormAbierto(false)}>Cancelar</Button>
                    <Button variant="contained" onClick={guardar}>Guardar</Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                abierto={usuarioAEliminar !== null}
                titulo="Eliminar usuario"
                mensaje={`¿Seguro que querés eliminar a "${usuarioAEliminar?.nombre}"? Si tiene pedidos asociados no se podrá.`}
                onConfirmar={eliminar}
                onCerrar={() => setUsuarioAEliminar(null)}
            />
        </>
    );
}
