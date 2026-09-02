package com.example.anleggsregister.controller;

import com.example.anleggsregister.model.Facility;
import com.example.anleggsregister.service.FacilityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/facilities")
public class FacilityController {

    private final FacilityService service;

    public FacilityController(FacilityService service) {
        this.service = service;
    }

    @GetMapping
    public List<Facility> getAll() {
        return service.getAll();
    }

    @PostMapping
    public ResponseEntity<Facility> create(@Valid @RequestBody Facility facility) {
        Facility created = service.create(facility);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Facility> update(@PathVariable Long id, @Valid @RequestBody Facility facility) {
        Facility updated = service.update(id, facility);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}