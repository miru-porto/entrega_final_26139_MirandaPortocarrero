package com.techlab.repository;

import com.techlab.model.Pedido;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Override
    @EntityGraph(attributePaths = {"usuario", "lineas", "lineas.producto", "lineas.producto.categoria"})
    List<Pedido> findAll();
    
    @EntityGraph(attributePaths = {"usuario", "lineas", "lineas.producto", "lineas.producto.categoria"})
    List<Pedido> findByUsuarioIdOrderByFechaDesc(Long usuarioId);
}
