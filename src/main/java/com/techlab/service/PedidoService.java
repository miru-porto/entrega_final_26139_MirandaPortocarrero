package com.techlab.service;

import com.techlab.dto.CrearPedidoRequest;
import com.techlab.model.EstadoPedido;
import com.techlab.model.Pedido;
import java.util.List;

public interface PedidoService {
    List<Pedido> listarPedidos(Long usuarioId);
    Pedido obtenerPedidoPorId(Long id);
    List<Pedido> listarPedidosPorUsuario(Long usuarioId);
    Pedido crearPedido(CrearPedidoRequest request);
    Pedido cambiarEstado(Long id, EstadoPedido nuevoEstado);
}
