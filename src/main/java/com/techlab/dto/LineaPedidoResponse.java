package com.techlab.dto;

import com.techlab.model.LineaPedido;

// Vista de solo lectura de una linea del pedido.
// No expone la vuelta al pedido: el ciclo Pedido -> Linea -> Pedido se corta por
// construccion, sin necesidad de @JsonIgnore en la entidad.
public record LineaPedidoResponse(
        Long id,
        ProductoResponse producto,
        Integer cantidad,
        Double precioUnitario,
        Double subtotal) {

    public static LineaPedidoResponse from(LineaPedido linea) {
        return new LineaPedidoResponse(
                linea.getId(),
                ProductoResponse.from(linea.getProducto()),
                linea.getCantidad(),
                linea.getPrecioUnitario(),
                linea.getSubtotal());
    }
}
