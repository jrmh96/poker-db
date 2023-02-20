package com.pokerdb.pokerdb_backend.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.sql.Date; // Date without a time

@Entity
public class Hand {

    @Id
    @GeneratedValue
    private Long id;
    private String cards;

    private String position;

    private Float result;

    private String notes;

    private String link; // Link to a playback of the hand

    private String history; // A textual history of the hand

    private String stakes;

    private Date date;

    public String toString() {
        return " cards: " + cards + " position: " + position + "\n";
    }
    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCards() {
        return cards;
    }

    public void setCards(String cards) {
        this.cards = cards;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Float getResult() {
        return result;
    }

    public void setResult(Float result) {
        this.result = result;
    }

    public String getStakes() {
        return stakes;
    }

    public void setStakes(String stakes) {
        this.stakes = stakes;
    }


    public Date getDate() {
        return date;
    }

    // You need to do some error handling here
    public void setDate(String input) {
        System.out.println(input);
        this.date = Date.valueOf(input);
    }
}
