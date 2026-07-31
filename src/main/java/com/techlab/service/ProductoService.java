package com.techlab.service;

import com.techlab.dto.ProductoRequest;
import com.techlab.dto.ProductoResponse;
import java.util.List;

public interface ProductoService {
    List<ProductoResponse> listarProductos(String nombre);
    ProductoResponse obtenerProductoPorId(Long id);
    ProductoResponse crearProducto(ProductoRequest request);
    ProductoResponse actualizarProducto(Long id, ProductoRequest request);
    ProductoResponse actualizarStock(Long id, Integer stock);
    void eliminarProducto(Long id);
    List<ProductoResponse> listarStockBajo(Integer umbral);
}
