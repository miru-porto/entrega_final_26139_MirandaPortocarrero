package com.techlab.repository;

import com.techlab.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    // Búsqueda por nombre parcial, sin distinguir mayúsculas (LIKE '%texto%')
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    // Productos con stock igual o menor al umbral (alerta de stock bajo)
    List<Producto> findByStockLessThanEqual(Integer umbral);
}
