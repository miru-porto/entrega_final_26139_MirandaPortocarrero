package com.techlab.exception;

import com.techlab.model.Pedido;
// Se lanza ante una transición de estado de pedido no permitida → HTTP 400
public class EstadoInvalidoException extends RuntimeException {

    public EstadoInvalidoException(String mensaje) {
        super(mensaje);
    }
}
