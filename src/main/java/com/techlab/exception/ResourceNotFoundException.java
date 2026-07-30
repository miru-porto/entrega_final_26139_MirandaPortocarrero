package com.techlab.exception;

// Se lanza cuando se busca un recurso (producto, pedido, etc.) que no existe → HTTP 404
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String recurso, Long id) {
        super(recurso + " con id " + id + " no encontrado");
    }

    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }
}
