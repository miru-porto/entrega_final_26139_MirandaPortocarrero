package com.techlab.repository;

import com.techlab.model.Pedido;
import com.techlab.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    // Historial de pedidos de un usuario, del más reciente al más antiguo
    List<Pedido> findByUsuarioIdOrderByFechaDesc(Long usuarioId);
}
