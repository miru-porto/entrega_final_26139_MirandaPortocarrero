package com.techlab.dto;

import com.techlab.model.Usuario;

// Vista de solo lectura de Usuario: lo que devuelve la API, desacoplado de la entidad
public record UsuarioResponse(Long id, String nombre, String email, String direccion) {

    public static UsuarioResponse desde(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getDireccion());
    }
}
