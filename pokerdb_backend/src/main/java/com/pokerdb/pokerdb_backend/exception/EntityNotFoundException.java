package com.pokerdb.pokerdb_backend.exception;

public abstract class EntityNotFoundException extends Exception{
    // private String entityType;

    public EntityNotFoundException(String entityType, Long id) {
        super(entityType + " with id " + id + " not found");
    }
}
