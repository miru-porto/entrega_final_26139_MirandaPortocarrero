package com.techlab.service;

import com.techlab.exception.ResourceNotFoundException;
import com.techlab.model.Producto;
import com.techlab.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public List<Producto> listarProductos(String nombre) {
        // Si llega ?nombre= se filtra; si no, se listan todos
        if (nombre != null && !nombre.isBlank()) {
            return productoRepository.findByNombreContainingIgnoreCase(nombre);
        }
        return productoRepository.findAll();
    }

    @Override
    public Producto obtenerProductoPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", id));
    }

    @Override
    public Producto guardarProducto(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Producto actualizarProducto(Long id, Producto producto) {
        obtenerProductoPorId(id);
        producto.setId(id);
        return productoRepository.save(producto);
    }

    @Override
    public Producto actualizarStock(Long id, Integer stock) {
        if (stock == null || stock < 0) {
            throw new IllegalArgumentException("El stock no puede ser negativo");
        }
        Producto producto = obtenerProductoPorId(id);
        producto.setStock(stock);
        return productoRepository.save(producto);
    }

    @Override
    public void eliminarProducto(Long id) {
        obtenerProductoPorId(id);
        productoRepository.deleteById(id);
    }

    @Override
    public List<Producto> listarStockBajo(Integer umbral) {
        return productoRepository.findByStockLessThanEqual(umbral);
    }
}
