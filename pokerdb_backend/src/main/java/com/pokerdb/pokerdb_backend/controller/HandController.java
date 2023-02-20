package com.pokerdb.pokerdb_backend.controller;

import com.pokerdb.pokerdb_backend.model.Hand;
import com.pokerdb.pokerdb_backend.repository.HandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Jeremy Hu 02/2023
@RestController
@CrossOrigin("http://localhost:3000")
public class HandController {
    @Autowired
    private HandRepository handRepository;

    @PostMapping("/addhand") // create
    Hand postNewHand(@RequestBody Hand newHand) {
        // Request body converts http requests into java objects
        return handRepository.save(newHand);
    }

    @GetMapping("/gethands") // read
    List<Hand> getAllHands() {
        return handRepository.findAll();
    }

    // update

    // Destroy

}
