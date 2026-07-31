package com.techlab.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// Cuerpo del POST y del PUT /api/categorias.
// No expone 'id': en el alta lo genera la base, en la edicion viene por la URL.
@Data
public class CategoriaRequest {

    @NotBlank(message = "El nombre de la categoría es obligatorio")
    private String nombre;

    private String descripcion;

    // Constructor vacio explicito: lo necesita Jackson para deserializar el JSON
    public CategoriaRequest() {}
}
