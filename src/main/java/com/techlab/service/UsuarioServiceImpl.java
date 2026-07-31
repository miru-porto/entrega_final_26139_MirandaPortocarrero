package com.techlab.service;

import com.techlab.dto.UsuarioRequest;
import com.techlab.dto.UsuarioResponse;
import com.techlab.exception.ResourceNotFoundException;
import com.techlab.model.Usuario;
import com.techlab.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponse> listarUsuarios() {
        return usuarioRepository.findAll().stream().map(UsuarioResponse::from).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse obtenerUsuarioPorId(Long id) {
        return UsuarioResponse.from(buscarUsuario(id));
    }

    @Override
    @Transactional
    public UsuarioResponse crearUsuario(UsuarioRequest request) {
        Usuario usuario = new Usuario();
        aplicar(request, usuario);
        return UsuarioResponse.from(usuarioRepository.save(usuario));
    }

    // Carga el usuario existente y le vuelca los campos del request: el id no es
    // algo que el cliente pueda mandar en el cuerpo, viene por la URL.
    @Override
    @Transactional
    public UsuarioResponse actualizarUsuario(Long id, UsuarioRequest request) {
        Usuario usuario = buscarUsuario(id);
        aplicar(request, usuario);
        return UsuarioResponse.from(usuarioRepository.save(usuario));
    }

    @Override
    @Transactional
    public void eliminarUsuario(Long id) {
        buscarUsuario(id);
        usuarioRepository.deleteById(id);
    }

    private void aplicar(UsuarioRequest request, Usuario usuario) {
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setDireccion(request.getDireccion());
    }

    // Carga la entidad para uso interno del servicio; hacia afuera se expone UsuarioResponse
    private Usuario buscarUsuario(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", id));
    }
}
