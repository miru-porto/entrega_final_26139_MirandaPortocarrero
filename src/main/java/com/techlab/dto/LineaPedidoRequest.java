package com.techlab.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Una línea del pedido que envía el frontend: qué producto y cuántas unidades
@Data
public class LineaPedidoRequest {

    @NotNull(message = "El id del producto es obligatorio")
    private Long productoId;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;

    // Constructor vacio explicito: lo necesita Jackson para deserializar el JSON
    public LineaPedidoRequest() {}
}
