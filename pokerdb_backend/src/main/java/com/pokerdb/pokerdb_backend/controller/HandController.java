package com.pokerdb.pokerdb_backend.controller;

import com.pokerdb.pokerdb_backend.exception.HandNotFoundException;
import com.pokerdb.pokerdb_backend.model.Hand;
import com.pokerdb.pokerdb_backend.repository.HandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

// Jeremy Hu 02/2023
@RestController
@CrossOrigin("http://localhost:3000")
public class HandController {
    @Autowired
    private HandRepository handRepository;

    @PostMapping("/addhand") // create single
    Hand postNewHand(@RequestBody Hand newHand) {
        // Request body converts http requests into java objects
        return handRepository.save(newHand);
    }

    // read all
    @GetMapping("/gethands")
    List<Hand> getAllHands() {
        return handRepository.findAll();
    }

    // Read Single
    @GetMapping("/hand/{id}")
    Hand getHandById(@PathVariable Long id) throws HandNotFoundException {
        return handRepository.findById(id)
                .orElseThrow(() -> new HandNotFoundException(id));
    }

    // Update single
    @PutMapping("/hand/{id}")
    Hand updateHand(@RequestBody Hand newHand, @PathVariable Long id) throws HandNotFoundException {
        return handRepository.findById(id)
                .map(hand -> {
                    hand.setCards(newHand.getCards());
                    hand.setPosition(newHand.getPosition());
                    hand.setResult(newHand.getResult());
                    hand.setNotes(newHand.getNotes());
                    hand.setLink(newHand.getLink());
                    hand.setHistory(newHand.getHistory());
                    hand.setStakes(newHand.getStakes());
                    hand.setDate(newHand.getDate().toString());
                    return handRepository.save(hand);
                }).orElseThrow(() -> new HandNotFoundException(id));
    }

    // Destroy
    @DeleteMapping("/hand/{id}")
    String deleteHand(@PathVariable Long id) throws HandNotFoundException {
        if(!handRepository.existsById(id)) {
            throw new HandNotFoundException(id);
        }
        handRepository.deleteById(id);
        return "Hand with id " + id + " has been deleted";
    }
}
