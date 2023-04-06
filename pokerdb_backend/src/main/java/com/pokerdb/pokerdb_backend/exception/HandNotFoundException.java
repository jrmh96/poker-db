package com.pokerdb.pokerdb_backend.exception;

public class HandNotFoundException extends EntityNotFoundException{
    public HandNotFoundException(Long id) {
        super("Hand", id);
    }
}
