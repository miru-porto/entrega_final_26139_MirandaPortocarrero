package com.techlab.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

// Cuerpo del POST y del PUT /api/productos.
// No expone 'id': en el alta lo genera la base, en la edicion viene por la URL.
@Data
public class ProductoRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    @Positive(message = "El precio debe ser mayor que cero")
    private Double precio;

    // URL de la imagen del producto
    private String imagen;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    // Solo el id de la categoria, no el objeto entero: el cliente referencia, no crea.
    // Es opcional, un producto puede no tener categoria.
    private Long categoriaId;

    // Constructor vacio explicito: lo necesita Jackson para deserializar el JSON
    public ProductoRequest() {}
}
