package com.techlab.service;

import com.techlab.model.Producto;
import java.util.List;

public interface ProductoService {
    List<Producto> listarProductos(String nombre);
    Producto obtenerProductoPorId(Long id);
    Producto guardarProducto(Producto producto);
    Producto actualizarProducto(Long id, Producto producto);
    Producto actualizarStock(Long id, Integer stock);
    void eliminarProducto(Long id);
    List<Producto> listarStockBajo(Integer umbral);
}
