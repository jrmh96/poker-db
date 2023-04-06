package com.pokerdb.pokerdb_backend.exception;

public class TagNotFoundException extends EntityNotFoundException {
    public TagNotFoundException(Long id) {
        super("Tag", id);
    }
}
