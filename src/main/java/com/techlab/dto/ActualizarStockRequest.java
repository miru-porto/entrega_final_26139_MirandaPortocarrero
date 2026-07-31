package com.techlab.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Cuerpo del PATCH /api/productos/{id}/stock: { "stock": 25 }
@Data
public class ActualizarStockRequest {

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    private Integer stock;

    // Constructor vacio explicito: lo necesita Jackson para deserializar el JSON
    public ActualizarStockRequest() {}
}
