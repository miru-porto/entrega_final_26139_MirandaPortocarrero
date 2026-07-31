package com.techlab.dto;

import com.techlab.model.Categoria;

// Vista de solo lectura de Categoria: lo que devuelve la API, desacoplado de la entidad
public record CategoriaResponse(Long id, String nombre, String descripcion) {

    public static CategoriaResponse from(Categoria categoria) {
        // La categoria de un producto es opcional
        if (categoria == null) {
            return null;
        }
        return new CategoriaResponse(
                categoria.getId(),
                categoria.getNombre(),
                categoria.getDescripcion());
    }
}
