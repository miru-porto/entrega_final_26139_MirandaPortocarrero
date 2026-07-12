package com.techlab.controller;

import com.techlab.model.Producto;
import com.techlab.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public List<Producto> listar(@RequestParam(required = false) String nombre) {
        return productoService.listarProductos(nombre);
    }

    // Productos con stock bajo (para alertas en administración)
    @GetMapping("/stock-bajo")
    public List<Producto> stockBajo(@RequestParam(defaultValue = "5") Integer umbral) {
        return productoService.listarStockBajo(umbral);
    }

    @GetMapping("/{id}")
    public Producto obtenerPorId(@PathVariable Long id) {
        return productoService.obtenerProductoPorId(id);
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@Valid @RequestBody Producto producto) {
        Producto creado = productoService.guardarProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Long id, @Valid @RequestBody Producto producto) {
        return productoService.actualizarProducto(id, producto);
    }

    // Actualización rápida de stock: body { "stock": 25 }
    @PatchMapping("/{id}/stock")
    public Producto actualizarStock(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        return productoService.actualizarStock(id, body.get("stock"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminarProducto(id);
        return ResponseEntity.noContent().build();
    }
}
