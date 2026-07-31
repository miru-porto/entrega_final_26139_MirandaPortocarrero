package com.techlab.dto;

import com.techlab.model.Producto;

// Vista de solo lectura de Producto: lo que devuelve la API, desacoplado de la entidad
public record ProductoResponse(
        Long id,
        String nombre,
        String descripcion,
        Double precio,
        String imagen,
        Integer stock,
        CategoriaResponse categoria) {

    public static ProductoResponse from(Producto producto) {
        return new ProductoResponse(
                producto.getId(),
                producto.getNombre(),
                producto.getDescripcion(),
                producto.getPrecio(),
                producto.getImagen(),
                producto.getStock(),
                CategoriaResponse.from(producto.getCategoria()));
    }
}
