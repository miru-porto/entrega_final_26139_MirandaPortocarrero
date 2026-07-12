package com.techlab.exception;

import com.techlab.model.Pedido;
import com.techlab.model.Producto;
// Se lanza cuando se busca un recurso (producto, pedido, etc.) que no existe → HTTP 404
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String recurso, Long id) {
        super(recurso + " con id " + id + " no encontrado");
    }

    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }
}
