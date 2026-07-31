package com.techlab.service;

import com.techlab.dto.UsuarioRequest;
import com.techlab.dto.UsuarioResponse;
import java.util.List;

public interface UsuarioService {
    List<UsuarioResponse> listarUsuarios();
    UsuarioResponse obtenerUsuarioPorId(Long id);
    UsuarioResponse crearUsuario(UsuarioRequest request);
    UsuarioResponse actualizarUsuario(Long id, UsuarioRequest request);
    void eliminarUsuario(Long id);
}
