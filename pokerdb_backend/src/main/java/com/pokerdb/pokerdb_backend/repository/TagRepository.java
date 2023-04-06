package com.pokerdb.pokerdb_backend.repository;

import com.pokerdb.pokerdb_backend.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

}
