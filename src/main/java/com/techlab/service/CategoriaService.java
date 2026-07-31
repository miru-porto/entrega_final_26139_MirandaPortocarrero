package com.techlab.service;

import com.techlab.dto.CategoriaRequest;
import com.techlab.dto.CategoriaResponse;
import java.util.List;

public interface CategoriaService {
    List<CategoriaResponse> listarCategorias();
    CategoriaResponse obtenerCategoriaPorId(Long id);
    CategoriaResponse crearCategoria(CategoriaRequest request);
    CategoriaResponse actualizarCategoria(Long id, CategoriaRequest request);
    void eliminarCategoria(Long id);
}
