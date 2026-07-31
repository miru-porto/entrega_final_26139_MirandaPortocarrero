package com.techlab.service;

import com.techlab.dto.CrearPedidoRequest;
import com.techlab.dto.LineaPedidoRequest;
import com.techlab.dto.PedidoResponse;
import com.techlab.exception.EstadoInvalidoException;
import com.techlab.exception.ResourceNotFoundException;
import com.techlab.exception.StockInsuficienteException;
import com.techlab.model.EstadoPedido;
import com.techlab.model.LineaPedido;
import com.techlab.model.Pedido;
import com.techlab.model.Producto;
import com.techlab.model.Usuario;
import com.techlab.repository.PedidoRepository;
import com.techlab.repository.ProductoRepository;
import com.techlab.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class PedidoServiceImpl implements PedidoService {

    // Transiciones de estado permitidas
    private static final Map<EstadoPedido, Set<EstadoPedido>> TRANSICIONES = Map.of(
            EstadoPedido.PENDIENTE, Set.of(EstadoPedido.CONFIRMADO, EstadoPedido.CANCELADO),
            EstadoPedido.CONFIRMADO, Set.of(EstadoPedido.ENVIADO, EstadoPedido.CANCELADO),
            EstadoPedido.ENVIADO, Set.of(EstadoPedido.ENTREGADO),
            EstadoPedido.ENTREGADO, Set.of(),
            EstadoPedido.CANCELADO, Set.of()
    );

    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public PedidoServiceImpl(PedidoRepository pedidoRepository,
                             ProductoRepository productoRepository,
                             UsuarioRepository usuarioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.productoRepository = productoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<PedidoResponse> listarPedidos(Long usuarioId) {
        if (usuarioId != null) {
            return listarPedidosPorUsuario(usuarioId);
        }
        return pedidoRepository.findAll().stream().map(PedidoResponse::from).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public PedidoResponse obtenerPedidoPorId(Long id) {
        return PedidoResponse.from(buscarPedido(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PedidoResponse> listarPedidosPorUsuario(Long usuarioId) {
        return pedidoRepository.findByUsuarioIdOrderByFechaDesc(usuarioId)
                .stream().map(PedidoResponse::from).toList();
    }

    // Carga la entidad para uso interno del servicio; hacia afuera se expone PedidoResponse
    private Pedido buscarPedido(Long id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pedido", id));
    }

    // Transaccional: si una línea no tiene stock, se revierte todo (no queda stock descontado a medias)
    @Override
    @Transactional
    public PedidoResponse crearPedido(CrearPedidoRequest request) {
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", request.getUsuarioId()));

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado(EstadoPedido.PENDIENTE);

        for (LineaPedidoRequest lineaReq : request.getLineas()) {
            Producto producto = productoRepository.findById(lineaReq.getProductoId())
                    .orElseThrow(() -> new ResourceNotFoundException("Producto", lineaReq.getProductoId()));

            if (producto.getStock() < lineaReq.getCantidad()) {
                throw new StockInsuficienteException(
                        producto.getNombre(), lineaReq.getCantidad(), producto.getStock());
            }

            // Descuenta el stock y guarda el precio actual como snapshot de la línea
            producto.setStock(producto.getStock() - lineaReq.getCantidad());
            productoRepository.save(producto);

            pedido.agregarLinea(new LineaPedido(producto, lineaReq.getCantidad(), producto.getPrecio()));
        }

        pedido.setTotal(pedido.calcularTotal());
        return PedidoResponse.from(pedidoRepository.save(pedido));
    }

    @Override
    @Transactional
    public PedidoResponse cambiarEstado(Long id, EstadoPedido nuevoEstado) {
        Pedido pedido = buscarPedido(id);
        EstadoPedido actual = pedido.getEstado();

        if (!TRANSICIONES.get(actual).contains(nuevoEstado)) {
            throw new EstadoInvalidoException(
                    "No se puede pasar un pedido de " + actual + " a " + nuevoEstado);
        }

        // Al cancelar se repone el stock que se había descontado al crear el pedido
        if (nuevoEstado == EstadoPedido.CANCELADO) {
            for (LineaPedido linea : pedido.getLineas()) {
                Producto producto = linea.getProducto();
                producto.setStock(producto.getStock() + linea.getCantidad());
                productoRepository.save(producto);
            }
        }

        pedido.setEstado(nuevoEstado);
        return PedidoResponse.from(pedidoRepository.save(pedido));
    }
}
