package com.techlab.service;

import com.techlab.dto.CrearPedidoRequest;
import com.techlab.dto.PedidoResponse;
import com.techlab.model.EstadoPedido;
import java.util.List;

public interface PedidoService {
    List<PedidoResponse> listarPedidos(Long usuarioId);
    PedidoResponse obtenerPedidoPorId(Long id);
    List<PedidoResponse> listarPedidosPorUsuario(Long usuarioId);
    PedidoResponse crearPedido(CrearPedidoRequest request);
    PedidoResponse cambiarEstado(Long id, EstadoPedido nuevoEstado);
}
