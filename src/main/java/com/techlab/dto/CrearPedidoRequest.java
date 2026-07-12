package com.techlab.dto;

import com.techlab.model.Pedido;
import com.techlab.model.Usuario;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

// Cuerpo del POST /api/pedidos: usuario + lista de productos con cantidades
public class CrearPedidoRequest {

    @NotNull(message = "El id del usuario es obligatorio")
    private Long usuarioId;

    @NotEmpty(message = "El pedido debe tener al menos una línea")
    @Valid
    private List<LineaPedidoRequest> lineas;

    public CrearPedidoRequest() {}

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
    public List<LineaPedidoRequest> getLineas() { return lineas; }
    public void setLineas(List<LineaPedidoRequest> lineas) { this.lineas = lineas; }
}
