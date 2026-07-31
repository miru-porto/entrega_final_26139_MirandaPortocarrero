package com.techlab.repository;

import com.techlab.model.Producto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // categoria es LAZY: se trae con JOIN para que armar el ProductoResponse
    // no dispare una query por producto (N+1).
    @Override
    @EntityGraph(attributePaths = "categoria")
    List<Producto> findAll();

    @Override
    @EntityGraph(attributePaths = "categoria")
    Optional<Producto> findById(Long id);

    // Búsqueda por nombre parcial, sin distinguir mayúsculas (LIKE '%texto%')
    @EntityGraph(attributePaths = "categoria")
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    // Productos con stock igual o menor al umbral (alerta de stock bajo)
    @EntityGraph(attributePaths = "categoria")
    List<Producto> findByStockLessThanEqual(Integer umbral);
}
