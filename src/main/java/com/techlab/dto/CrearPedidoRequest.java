package com.techlab.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

// Cuerpo del POST /api/pedidos: usuario + lista de productos con cantidades
@Data
public class CrearPedidoRequest {

    @NotNull(message = "El id del usuario es obligatorio")
    private Long usuarioId;

    @NotEmpty(message = "El pedido debe tener al menos una línea")
    @Valid
    private List<LineaPedidoRequest> lineas;

    // Constructor vacio explicito: lo necesita Jackson para deserializar el JSON
    public CrearPedidoRequest() {}
}
