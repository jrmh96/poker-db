package com.pokerdb.pokerdb_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tagmap")
public class TagMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // ID of each individual tag mapping {hand_id : tag_id}

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hand_id")
    private Hand hand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
