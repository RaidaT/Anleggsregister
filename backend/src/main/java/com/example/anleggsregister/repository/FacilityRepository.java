package com.example.anleggsregister.repository;

import com.example.anleggsregister.model.Facility;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
    // Spring Data makes the CRUD-operations for us
}
