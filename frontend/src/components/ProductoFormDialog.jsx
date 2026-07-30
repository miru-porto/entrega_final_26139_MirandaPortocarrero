import { useEffect, useState } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, TextField,
} from '@mui/material';

const FORM_VACIO = { nombre: '', descripcion: '', precio: '', imagen: '', stock: '', categoriaId: '' };

// Formulario de alta/edición de producto. `errores` viene del backend (mapa campo -> mensaje)
export default function ProductoFormDialog({ abierto, producto, categorias, errores, onGuardar, onCerrar }) {
    const [form, setForm] = useState(FORM_VACIO);

    // Al abrir, precarga los datos si es edición
    useEffect(() => {
        if (!abierto) return;
        setForm(producto
            ? {
                nombre: producto.nombre,
                descripcion: producto.descripcion ?? '',
                precio: producto.precio,
                imagen: producto.imagen ?? '',
                stock: producto.stock,
                categoriaId: producto.categoria?.id ?? '',
            }
            : FORM_VACIO);
    }, [abierto, producto]);

    const cambiar = (evento) =>
        setForm({ ...form, [evento.target.name]: evento.target.value });

    const guardar = () => {
        onGuardar({
            nombre: form.nombre,
            descripcion: form.descripcion,
            precio: form.precio === '' ? null : Number(form.precio),
            imagen: form.imagen,
            stock: form.stock === '' ? null : Number(form.stock),
            categoria: form.categoriaId ? { id: form.categoriaId } : null,
        });
    };

    return (
        <Dialog open={abierto} onClose={onCerrar} fullWidth maxWidth="sm">
            <DialogTitle>{producto ? 'Editar producto' : 'Agregar producto'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        name="nombre" label="Nombre" value={form.nombre} onChange={cambiar}
                        error={Boolean(errores?.nombre)} helperText={errores?.nombre} required
                    />
                    <TextField
                        name="descripcion" label="Descripción" value={form.descripcion} onChange={cambiar}
                        multiline rows={2}
                    />
                    <Stack direction="row" spacing={2}>
                        <TextField
                            name="precio" label="Precio" type="number" value={form.precio} onChange={cambiar}
                            error={Boolean(errores?.precio)} helperText={errores?.precio} required fullWidth
                        />
                        <TextField
                            name="stock" label="Stock" type="number" value={form.stock} onChange={cambiar}
                            error={Boolean(errores?.stock)} helperText={errores?.stock} required fullWidth
                        />
                    </Stack>
                    <TextField
                        name="categoriaId" label="Categoría" select value={form.categoriaId} onChange={cambiar}
                    >
                        <MenuItem value="">Sin categoría</MenuItem>
                        {categorias.map((categoria) => (
                            <MenuItem key={categoria.id} value={categoria.id}>{categoria.nombre}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name="imagen" label="URL de imagen" value={form.imagen} onChange={cambiar}
                        placeholder="https://…"
                    />
                    {form.imagen && (
                        <img
                            src={form.imagen} alt="Vista previa"
                            style={{ maxHeight: 120, objectFit: 'contain', borderRadius: 8 }}
                        />
                    )}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCerrar}>Cancelar</Button>
                <Button variant="contained" onClick={guardar}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
