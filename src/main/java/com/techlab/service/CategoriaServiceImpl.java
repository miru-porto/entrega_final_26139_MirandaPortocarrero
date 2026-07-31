package com.techlab.service;

import com.techlab.dto.CategoriaRequest;
import com.techlab.dto.CategoriaResponse;
import com.techlab.exception.ResourceNotFoundException;
import com.techlab.model.Categoria;
import com.techlab.repository.CategoriaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public CategoriaServiceImpl(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoriaResponse> listarCategorias() {
        return categoriaRepository.findAll().stream().map(CategoriaResponse::desde).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CategoriaResponse obtenerCategoriaPorId(Long id) {
        return CategoriaResponse.desde(buscarCategoria(id));
    }

    @Override
    @Transactional
    public CategoriaResponse crearCategoria(CategoriaRequest request) {
        Categoria categoria = new Categoria();
        aplicar(request, categoria);
        return CategoriaResponse.desde(categoriaRepository.save(categoria));
    }

    // Carga la categoria existente y le vuelca los campos del request: el id no es
    // algo que el cliente pueda mandar en el cuerpo, viene por la URL.
    @Override
    @Transactional
    public CategoriaResponse actualizarCategoria(Long id, CategoriaRequest request) {
        Categoria categoria = buscarCategoria(id);
        aplicar(request, categoria);
        return CategoriaResponse.desde(categoriaRepository.save(categoria));
    }

    @Override
    @Transactional
    public void eliminarCategoria(Long id) {
        buscarCategoria(id);
        categoriaRepository.deleteById(id);
    }

    private void aplicar(CategoriaRequest request, Categoria categoria) {
        categoria.setNombre(request.getNombre());
        categoria.setDescripcion(request.getDescripcion());
    }

    // Carga la entidad para uso interno del servicio; hacia afuera se expone CategoriaResponse
    private Categoria buscarCategoria(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoría", id));
    }
}
