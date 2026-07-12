package com.techlab.dto;

import com.techlab.model.Pedido;
import com.techlab.model.Producto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

// Una línea del pedido que envía el frontend: qué producto y cuántas unidades
public class LineaPedidoRequest {

    @NotNull(message = "El id del producto es obligatorio")
    private Long productoId;

    @NotNull(message = "La cantidad es obligatoria")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    private Integer cantidad;

    public LineaPedidoRequest() {}

    public Long getProductoId() { return productoId; }
    public void setProductoId(Long productoId) { this.productoId = productoId; }
    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }
}
