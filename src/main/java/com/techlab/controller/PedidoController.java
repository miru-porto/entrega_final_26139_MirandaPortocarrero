package com.techlab.controller;

import com.techlab.dto.CambioEstadoRequest;
import com.techlab.dto.CrearPedidoRequest;
import com.techlab.dto.PedidoResponse;
import com.techlab.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    // GET /api/pedidos               -> todos los pedidos (administración)
    // GET /api/pedidos?usuarioId=5   -> pedidos de un usuario
    @GetMapping
    public List<PedidoResponse> listar(@RequestParam(required = false) Long usuarioId) {
        return pedidoService.listarPedidos(usuarioId);
    }

    @GetMapping("/{id}")
    public PedidoResponse obtenerPorId(@PathVariable Long id) {
        return pedidoService.obtenerPedidoPorId(id);
    }

    // Crea el pedido: valida stock, lo descuenta y calcula el total (400 si no hay stock)
    @PostMapping
    public ResponseEntity<PedidoResponse> crear(@Valid @RequestBody CrearPedidoRequest request) {
        PedidoResponse creado = pedidoService.crearPedido(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    // Cambia el estado respetando las transiciones válidas; cancelar repone stock
    @PutMapping("/{id}/estado")
    public PedidoResponse cambiarEstado(@PathVariable Long id, @Valid @RequestBody CambioEstadoRequest request) {
        return pedidoService.cambiarEstado(id, request.getEstado());
    }
}
