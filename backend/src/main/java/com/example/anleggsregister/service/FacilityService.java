package com.example.anleggsregister.service;

import com.example.anleggsregister.model.Facility;
import com.example.anleggsregister.repository.FacilityRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FacilityService {

    private final FacilityRepository repository;

    public FacilityService(FacilityRepository repository) {
        this.repository = repository;
    }

    public List<Facility> getAll() {
        return repository.findAll();
    }

    public Facility create(Facility facility) {
        return repository.save(facility);
    }

    public Facility update(Long id, Facility facility) {
        Facility existing = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Facility not found!"));

        existing.setName(facility.getName());
        existing.setFishSpecies(facility.getFishSpecies());
        existing.setOrganisations(facility.getOrganisations());
        existing.setLocation(facility.getLocation());
        existing.setCreatedDate(facility.getCreatedDate());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}