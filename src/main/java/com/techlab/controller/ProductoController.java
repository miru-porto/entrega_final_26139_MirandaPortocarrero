package com.techlab.controller;

import com.techlab.dto.ActualizarStockRequest;
import com.techlab.dto.ProductoRequest;
import com.techlab.dto.ProductoResponse;
import com.techlab.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // GET /api/productos       -> lista todos
    // GET /api/productos?nombre=mouse -> búsqueda por nombre parcial
    @GetMapping
    public List<ProductoResponse> listar(@RequestParam(required = false) String nombre) {
        return productoService.listarProductos(nombre);
    }

    // Productos con stock bajo (para alertas en administración)
    @GetMapping("/stock-bajo")
    public List<ProductoResponse> stockBajo(@RequestParam(defaultValue = "5") Integer umbral) {
        return productoService.listarStockBajo(umbral);
    }

    @GetMapping("/{id}")
    public ProductoResponse obtenerPorId(@PathVariable Long id) {
        return productoService.obtenerProductoPorId(id);
    }

    @PostMapping
    public ResponseEntity<ProductoResponse> crear(@Valid @RequestBody ProductoRequest request) {
        ProductoResponse creado = productoService.crearProducto(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ProductoResponse actualizar(@PathVariable Long id, @Valid @RequestBody ProductoRequest request) {
        return productoService.actualizarProducto(id, request);
    }

    // Actualización rápida de stock: body { "stock": 25 }
    @PatchMapping("/{id}/stock")
    public ProductoResponse actualizarStock(@PathVariable Long id,
                                            @Valid @RequestBody ActualizarStockRequest request) {
        return productoService.actualizarStock(id, request.getStock());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}
