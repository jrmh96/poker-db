package com.pokerdb.pokerdb_backend.controller;

import com.pokerdb.pokerdb_backend.exception.HandNotFoundException;
import com.pokerdb.pokerdb_backend.exception.TagNotFoundException;
import com.pokerdb.pokerdb_backend.model.Hand;
import com.pokerdb.pokerdb_backend.model.Tag;
import com.pokerdb.pokerdb_backend.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class TagController {
    @Autowired
    private TagRepository tagRepository;

    // Create single tag
    @PostMapping("/tags/addtag")
    Tag postNewTag(@RequestBody Tag newTag) {
        // Request body converts http request json into java objects
        return tagRepository.save(newTag);
    }

    // Get all tags
    @GetMapping("/tags/getalltags")
    List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    // Update single tag
    @PutMapping("/tags/updateTag/{id}")
    Tag updateTag(@RequestBody Tag newTag, @PathVariable Long id) throws TagNotFoundException {
        return tagRepository.findById(id)
                .map(tag -> {
                        tag.setName(newTag.getName());
                        return tagRepository.save(tag);
                    }).orElseThrow(() -> new TagNotFoundException(id));
    }

    // Delete tag by id
    @DeleteMapping("/tags/tag/{id}")
    String deleteTag(@PathVariable Long id) throws TagNotFoundException {
        if (!tagRepository.existsById(id)) {
            throw new TagNotFoundException(id);
        }

        tagRepository.deleteById(id);
        return "Deleted tag with id " + id;
    }
}
