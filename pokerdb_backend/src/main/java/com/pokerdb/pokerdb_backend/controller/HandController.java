package com.pokerdb.pokerdb_backend.controller;

import com.pokerdb.pokerdb_backend.exception.EntityNotFoundException;
import com.pokerdb.pokerdb_backend.exception.HandNotFoundException;
import com.pokerdb.pokerdb_backend.model.Hand;
import com.pokerdb.pokerdb_backend.model.Tag;
import com.pokerdb.pokerdb_backend.repository.HandRepository;
import com.pokerdb.pokerdb_backend.repository.TagMapRepository;
import com.pokerdb.pokerdb_backend.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

// Jeremy Hu 02/2023
@RestController
@CrossOrigin("http://localhost:3000")
public class HandController {
    @Autowired
    private HandRepository handRepository;

    @Autowired
    private TagMapRepository tagMapRepository;

    @PostMapping("/addhand") // create single hand
    Hand postNewHand(@RequestBody Hand newHand) {
        // Request body converts http request json into java objects
        return handRepository.save(newHand);
    }

    // read all hands
    @GetMapping("/getallhands")
    List<Hand> getAllHands() {
        return handRepository.findAll();
    }

    // get most recent hands using pagination
    @GetMapping("/gethands")
    Page<Hand> getHands(@RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size,
                        @RequestParam(defaultValue = "date") String sortBy) {
        Sort sort = Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page,size,sort);
        return handRepository.findAll(pageable);
    }

    // Read single hand
    @GetMapping("/hand/{id}")
    Hand getHandById(@PathVariable Long id) throws HandNotFoundException {
        Hand toReturn = handRepository.findById(id)
                .orElseThrow(() -> new HandNotFoundException(id));

        // List<Tag> tags = tagRepository.findByHandId(toReturn.getId());
        // toReturn.setTags(tags);

        return toReturn;
    }

    // Update single hand
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

    // Destroy hand
    @DeleteMapping("/hand/{id}")
    String deleteHand(@PathVariable Long id) throws HandNotFoundException {
        if(!handRepository.existsById(id)) {
            throw new HandNotFoundException(id);
        }
        handRepository.deleteById(id);
        return "Hand with id " + id + " has been deleted";
    }

}
