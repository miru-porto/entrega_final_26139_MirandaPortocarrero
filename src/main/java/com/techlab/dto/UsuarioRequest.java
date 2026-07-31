package com.techlab.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// Cuerpo del POST y del PUT /api/usuarios.
// No expone 'id': en el alta lo genera la base, en la edicion viene por la URL.
@Data
public class UsuarioRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email no tiene un formato válido")
    private String email;

    private String direccion;

    // Constructor vacio explicito: lo necesita Jackson para deserializar el JSON
    public UsuarioRequest() {}
}
