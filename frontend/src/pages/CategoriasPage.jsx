import { useCallback, useEffect, useState } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Stack,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ConfirmDialog from '../components/ConfirmDialog.jsx';
import { useNotificar } from '../context/NotificacionContext.jsx';
import { actualizarCategoria, crearCategoria, eliminarCategoria, listarCategorias } from '../api/categorias.js';

const FORM_VACIO = { nombre: '', descripcion: '' };

export default function CategoriasPage() {
    const [categorias, setCategorias] = useState([]);
    const [formAbierto, setFormAbierto] = useState(false);
    const [categoriaEnEdicion, setCategoriaEnEdicion] = useState(null);
    const [form, setForm] = useState(FORM_VACIO);
    const [erroresForm, setErroresForm] = useState(null);
    const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

    const notificar = useNotificar();

    const cargar = useCallback(() => {
        listarCategorias()
            .then(setCategorias)
            .catch((error) => notificar(error.mensaje, 'error'));
    }, [notificar]);

    useEffect(cargar, [cargar]);

    const abrirForm = (categoria = null) => {
        setCategoriaEnEdicion(categoria);
        setForm(categoria ? { nombre: categoria.nombre, descripcion: categoria.descripcion ?? '' } : FORM_VACIO);
        setErroresForm(null);
        setFormAbierto(true);
    };

    const guardar = () => {
        const promesa = categoriaEnEdicion
            ? actualizarCategoria(categoriaEnEdicion.id, form)
            : crearCategoria(form);

        promesa
            .then(() => {
                notificar(categoriaEnEdicion ? 'Categoría actualizada' : 'Categoría creada');
                setFormAbierto(false);
                cargar();
            })
            .catch((error) => {
                setErroresForm(error.errores);
                notificar(error.mensaje, 'error');
            });
    };

    const eliminar = () => {
        eliminarCategoria(categoriaAEliminar.id)
            .then(() => {
                notificar('Categoría eliminada');
                cargar();
            })
            .catch((error) => notificar(error.mensaje, 'error'))
            .finally(() => setCategoriaAEliminar(null));
    };

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
                <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                    Categorías
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => abrirForm()}>
                    Agregar categoría
                </Button>
            </Stack>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categorias.map((categoria) => (
                            <TableRow key={categoria.id}>
                                <TableCell>{categoria.id}</TableCell>
                                <TableCell>{categoria.nombre}</TableCell>
                                <TableCell>{categoria.descripcion}</TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" onClick={() => abrirForm(categoria)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => setCategoriaAEliminar(categoria)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={formAbierto} onClose={() => setFormAbierto(false)} fullWidth maxWidth="xs">
                <DialogTitle>{categoriaEnEdicion ? 'Editar categoría' : 'Agregar categoría'}</DialogTitle>
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
                            label="Descripción"
                            value={form.descripcion}
                            onChange={(evento) => setForm({ ...form, descripcion: evento.target.value })}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFormAbierto(false)}>Cancelar</Button>
                    <Button variant="contained" onClick={guardar}>Guardar</Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                abierto={categoriaAEliminar !== null}
                titulo="Eliminar categoría"
                mensaje={`¿Seguro que querés eliminar "${categoriaAEliminar?.nombre}"? Si tiene productos asociados no se podrá.`}
                onConfirmar={eliminar}
                onCerrar={() => setCategoriaAEliminar(null)}
            />
        </>
    );
}
