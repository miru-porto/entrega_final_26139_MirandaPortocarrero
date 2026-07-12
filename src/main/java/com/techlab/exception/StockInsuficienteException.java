package com.techlab.exception;

// Se lanza al intentar pedir más unidades de las disponibles → HTTP 400
public class StockInsuficienteException extends RuntimeException {

    public StockInsuficienteException(String nombreProducto, int solicitado, int disponible) {
        super("Stock insuficiente para '" + nombreProducto + "': solicitado " + solicitado
                + ", disponible " + disponible);
    }
}
