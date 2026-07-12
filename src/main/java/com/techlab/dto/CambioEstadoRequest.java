package com.techlab.dto;

import com.techlab.model.EstadoPedido;
import jakarta.validation.constraints.NotNull;

// Cuerpo del PUT /api/pedidos/{id}/estado: { "estado": "CONFIRMADO" }
public class CambioEstadoRequest {

    @NotNull(message = "El estado es obligatorio")
    private EstadoPedido estado;

    public CambioEstadoRequest() {}

    public EstadoPedido getEstado() { return estado; }
    public void setEstado(EstadoPedido estado) { this.estado = estado; }
}
