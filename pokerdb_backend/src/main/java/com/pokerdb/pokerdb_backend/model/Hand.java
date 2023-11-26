package com.pokerdb.pokerdb_backend.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;

import java.sql.Date; // Date without a time
import java.util.List;

// Jeremy Hu 02/2023
@Entity
@Table(name = "hand")
public class Hand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;
    private String cards;
    private String position;

    private Float result;

    private String notes;

    private String link; // Link to a playback of the hand

    private String history; // A textual history of the hand

    private String stakes;

    private Date date;

    // private List<Tag> tags;

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

    // You should do some error handling here
    // From Docs: Input must be a
    // String object representing a date in the format "yyyy-[m]m-[d]d".
    // The leading zero for mm and dd may also be omitted.
    public void setDate(String input) {
        this.date = Date.valueOf(input);
    }

    /*
    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }
    */

}
