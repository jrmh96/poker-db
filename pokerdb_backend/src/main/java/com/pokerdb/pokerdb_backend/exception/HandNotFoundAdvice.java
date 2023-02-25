package com.pokerdb.pokerdb_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class HandNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(HandNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> exceptionHandler(HandNotFoundException e) {
        Map<String, String> errorMap = new HashMap<>();

        errorMap.put("errorMessage", e.getMessage());
        return errorMap;
    }
}
