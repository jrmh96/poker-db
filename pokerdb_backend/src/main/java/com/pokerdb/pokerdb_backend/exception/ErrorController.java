package com.pokerdb.pokerdb_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

// import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ErrorController {
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleException(HttpMessageNotReadableException exception) {
        return new ResponseEntity("You gave an incorrect value for ....", HttpStatus.BAD_REQUEST);
    }
}
