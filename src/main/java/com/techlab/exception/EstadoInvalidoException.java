package com.techlab.exception;

// Se lanza ante una transición de estado de pedido no permitida → HTTP 400
public class EstadoInvalidoException extends RuntimeException {

    public EstadoInvalidoException(String mensaje) {
        super(mensaje);
    }
}
