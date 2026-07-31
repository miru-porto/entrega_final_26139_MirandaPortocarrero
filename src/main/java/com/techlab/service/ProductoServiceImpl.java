package com.techlab.service;

import com.techlab.dto.ProductoRequest;
import com.techlab.dto.ProductoResponse;
import com.techlab.exception.ResourceNotFoundException;
import com.techlab.model.Categoria;
import com.techlab.model.Producto;
import com.techlab.repository.CategoriaRepository;
import com.techlab.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository,
                               CategoriaRepository categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResponse> listarProductos(String nombre) {
        // Si llega ?nombre= se filtra; si no, se listan todos
        List<Producto> productos = (nombre != null && !nombre.isBlank())
                ? productoRepository.findByNombreContainingIgnoreCase(nombre)
                : productoRepository.findAll();
        return productos.stream().map(ProductoResponse::from).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductoResponse obtenerProductoPorId(Long id) {
        return ProductoResponse.from(buscarProducto(id));
    }

    @Override
    @Transactional
    public ProductoResponse crearProducto(ProductoRequest request) {
        Producto producto = new Producto();
        aplicar(request, producto);
        return ProductoResponse.from(productoRepository.save(producto));
    }

    // Carga el producto existente y le vuelca los campos del request, en vez de
    // guardar un objeto armado desde el JSON: asi el id y cualquier campo que el
    // cliente no deberia tocar quedan fuera de su alcance.
    @Override
    @Transactional
    public ProductoResponse actualizarProducto(Long id, ProductoRequest request) {
        Producto producto = buscarProducto(id);
        aplicar(request, producto);
        return ProductoResponse.from(productoRepository.save(producto));
    }

    @Override
    @Transactional
    public ProductoResponse actualizarStock(Long id, Integer stock) {
        // El controlador ya valida con @Valid; el servicio no da por sentado quien lo llama
        if (stock == null || stock < 0) {
            throw new IllegalArgumentException("El stock no puede ser negativo");
        }
        Producto producto = buscarProducto(id);
        producto.setStock(stock);
        return ProductoResponse.from(productoRepository.save(producto));
    }

    @Override
    @Transactional
    public void eliminarProducto(Long id) {
        buscarProducto(id);
        productoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductoResponse> listarStockBajo(Integer umbral) {
        return productoRepository.findByStockLessThanEqual(umbral)
                .stream().map(ProductoResponse::from).toList();
    }

    private void aplicar(ProductoRequest request, Producto producto) {
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setImagen(request.getImagen());
        producto.setStock(request.getStock());
        producto.setCategoria(buscarCategoria(request.getCategoriaId()));
    }

    // La categoria es opcional; si viene un id, tiene que existir (404 si no)
    private Categoria buscarCategoria(Long categoriaId) {
        if (categoriaId == null) {
            return null;
        }
        return categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría", categoriaId));
    }

    // Carga la entidad para uso interno del servicio; hacia afuera se expone ProductoResponse
    private Producto buscarProducto(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", id));
    }
}
