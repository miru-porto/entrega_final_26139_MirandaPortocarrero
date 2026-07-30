package com.techlab.dto;

import com.techlab.model.EstadoPedido;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Cuerpo del PUT /api/pedidos/{id}/estado: { "estado": "CONFIRMADO" }
@Data
public class CambioEstadoRequest {

    @NotNull(message = "El estado es obligatorio")
    private EstadoPedido estado;

    // Constructor vacio explicito: lo necesita Jackson para deserializar el JSON
    public CambioEstadoRequest() {}
}
