package com.example.anleggsregister.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Facility {

    // Fields
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @ElementCollection
    private List<String> fishSpecies = new ArrayList<>(); // avoid null by providing an empty list

    @ElementCollection
    private List<String> organisations = new ArrayList<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    private LocationType location;

    @NotNull
    @PastOrPresent
    private LocalDate createdDate;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getFishSpecies() {
        return fishSpecies;
    }

    public void setFishSpecies(List<String> fishSpecies) {
        this.fishSpecies = fishSpecies;
    }

    public List<String> getOrganisations() {
        return organisations;
    }

    public void setOrganisations(List<String> organisations) {
        this.organisations = organisations;
    }

    public LocationType getLocation() {
        return location;
    }

    public void setLocation(LocationType location) {
        this.location = location;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }
}
