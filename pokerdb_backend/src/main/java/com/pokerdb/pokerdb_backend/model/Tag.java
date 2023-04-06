package com.pokerdb.pokerdb_backend.model;

import jakarta.persistence.*;

import javax.annotation.processing.Generated;

@Entity
@Table(name = "tags")
public class Tag {
    @Id
    @GeneratedValue
    private Long tag_id;

    @Column(name = "name")
    private String name;

    public Long getId() {
        return tag_id;
    }

    public void setId(Long id) {
        this.tag_id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }
}
