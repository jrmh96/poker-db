package com.pokerdb.pokerdb_backend.repository;

import com.pokerdb.pokerdb_backend.model.Hand;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HandRepository extends JpaRepository<Hand, Long> {
}
