package com.techlab.dto;

import com.techlab.model.EstadoPedido;
import com.techlab.model.Pedido;

import java.time.LocalDateTime;
import java.util.List;

// Vista de solo lectura de Pedido con todo su arbol (usuario + lineas + productos).
// Se arma dentro del servicio, con la transaccion abierta y el grafo ya cargado
// por el @EntityGraph del repositorio.
public record PedidoResponse(
        Long id,
        UsuarioResponse usuario,
        LocalDateTime fecha,
        EstadoPedido estado,
        Double total,
        List<LineaPedidoResponse> lineas) {

    public static PedidoResponse from(Pedido pedido) {
        return new PedidoResponse(
                pedido.getId(),
                UsuarioResponse.from(pedido.getUsuario()),
                pedido.getFecha(),
                pedido.getEstado(),
                pedido.getTotal(),
                pedido.getLineas().stream().map(LineaPedidoResponse::from).toList());
    }
}
