package com.pokerdb.pokerdb_backend.exception;

public class HandNotFoundException extends Exception{
    public HandNotFoundException(Long id) {
        super("Hand with id " + id + " not found");
    }
}
