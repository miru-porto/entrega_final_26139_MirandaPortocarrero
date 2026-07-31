package com.techlab.repository;

import com.techlab.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    // Todas las relaciones del pedido son LAZY. Sin traerlas de entrada, armar el
    // PedidoResponse dispara una query por pedido y por linea (N+1).
    //
    // Se usa JOIN FETCH y no @EntityGraph porque el grafo tiene tres niveles
    // (pedido -> lineas -> producto -> categoria) y Hibernate 6 resuelve los dos
    // primeros pero deja categoria afuera, tanto con attributePaths como con
    // @NamedEntityGraph. JOIN FETCH no tiene ese limite.
    String PEDIDO_COMPLETO = """
            select p from Pedido p
            join fetch p.usuario u
            left join fetch p.lineas l
            left join fetch l.producto pr
            left join fetch pr.categoria
            """;

    @Override
    @Query(PEDIDO_COMPLETO)
    List<Pedido> findAll();

    @Override
    @Query(PEDIDO_COMPLETO + " where p.id = :id")
    Optional<Pedido> findById(@Param("id") Long id);

    @Query(PEDIDO_COMPLETO + " where u.id = :usuarioId order by p.fecha desc")
    List<Pedido> findByUsuarioIdOrderByFechaDesc(@Param("usuarioId") Long usuarioId);
}
