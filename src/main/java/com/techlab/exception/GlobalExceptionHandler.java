package com.techlab.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

// Captura las excepciones de toda la API y devuelve respuestas JSON claras
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // Arma la estructura común de toda respuesta de error
    private Map<String, Object> cuerpoBase(HttpStatus status, String mensaje) {
        Map<String, Object> cuerpo = new LinkedHashMap<>();
        cuerpo.put("timestamp", LocalDateTime.now());
        cuerpo.put("status", status.value());
        cuerpo.put("error", status.getReasonPhrase());
        cuerpo.put("mensaje", mensaje);
        return cuerpo;
    }

    // Error 404: el recurso buscado no existe
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> manejarNoEncontrado(ResourceNotFoundException ex) {
        Map<String, Object> cuerpo = cuerpoBase(HttpStatus.NOT_FOUND, ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(cuerpo);
    }

    // Error 400: reglas de negocio de pedidos (stock insuficiente, transición de estado inválida)
    @ExceptionHandler({StockInsuficienteException.class, EstadoInvalidoException.class})
    public ResponseEntity<Map<String, Object>> manejarReglaDeNegocio(RuntimeException ex) {
        Map<String, Object> cuerpo = cuerpoBase(HttpStatus.BAD_REQUEST, ex.getMessage());
        return ResponseEntity.badRequest().body(cuerpo);
    }

    // Error 409: la operación viola una restricción de la base de datos
    // (ej: borrar una categoría que tiene productos, email de usuario duplicado)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, Object>> manejarIntegridad(DataIntegrityViolationException ex) {
        Map<String, Object> cuerpo = cuerpoBase(HttpStatus.CONFLICT,
                "No se puede completar la operación: el registro está en uso o viola una restricción única");
        return ResponseEntity.status(HttpStatus.CONFLICT).body(cuerpo);
    }

    // Error 400: falló la validación de @Valid (nombre vacío, precio negativo, etc.)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> manejarValidacion(MethodArgumentNotValidException ex) {
        Map<String, String> errores = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error -> errores.put(error.getField(), error.getDefaultMessage()));

        Map<String, Object> cuerpo = cuerpoBase(HttpStatus.BAD_REQUEST, "Datos inválidos");
        cuerpo.put("errores", errores);
        return ResponseEntity.badRequest().body(cuerpo);
    }

    // Error 400: el JSON enviado está malformado o no se puede leer
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> manejarJsonInvalido(HttpMessageNotReadableException ex) {
        Map<String, Object> cuerpo = cuerpoBase(HttpStatus.BAD_REQUEST,
                "El cuerpo de la solicitud no es un JSON válido");
        return ResponseEntity.badRequest().body(cuerpo);
    }

    // Error 404: la ruta no existe (ej: /api/producto en singular, o la raíz /).
    // Sin este handler la excepción cae en el catch-all de abajo y se responde 500,
    // que significa "el servidor falló" en vez de "eso no está acá".
    @ExceptionHandler({NoResourceFoundException.class, NoHandlerFoundException.class})
    public ResponseEntity<Map<String, Object>> manejarRutaNoEncontrada(Exception ex) {
        Map<String, Object> cuerpo = cuerpoBase(HttpStatus.NOT_FOUND, "La ruta solicitada no existe");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(cuerpo);
    }

    // Error 400: el tipo de un parámetro no coincide (ej: /api/productos/abc en vez de un número)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, Object>> manejarTipoInvalido(MethodArgumentTypeMismatchException ex) {
        Map<String, Object> cuerpo = cuerpoBase(HttpStatus.BAD_REQUEST,
                "El parámetro '" + ex.getName() + "' tiene un formato inválido");
        return ResponseEntity.badRequest().body(cuerpo);
    }

    // Error 500: cualquier otro error no contemplado (ej: falla de la base de datos)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> manejarErrorGeneral(Exception ex) {
        log.error("Error no controlado procesando la peticion", ex);

        Map<String, Object> cuerpo = cuerpoBase(HttpStatus.INTERNAL_SERVER_ERROR,
                "Ocurrió un error interno en el servidor");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(cuerpo);
    }
}
