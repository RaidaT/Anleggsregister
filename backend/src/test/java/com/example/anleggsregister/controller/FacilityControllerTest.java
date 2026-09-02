package com.example.anleggsregister.controller;

import com.example.anleggsregister.repository.FacilityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc; // 4.1.1
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class FacilityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FacilityRepository facilityRepository;

    @BeforeEach
    void setUp() {
        facilityRepository.deleteAll(); // deletes all test data before the next test
    }

    @Test
    void getFacilitiesReturnsEmptyList() throws Exception {
        mockMvc.perform(get("/api/facilities"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void createFacilityReturnsCreatedFacilityWithId() throws Exception {
        String requestBody = """
                {
                    "name": "Bergen",
                    "fishSpecies": ["Laks"],
                    "organisations": ["Leroy"],
                    "location": "SEA",
                    "createdDate": "2026-09-01"
                }
                """;

        mockMvc.perform(post("/api/facilities")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.name").value("Bergen"))
                .andExpect(jsonPath("$.fishSpecies[0]").value("Laks"))
                .andExpect(jsonPath("$.organisations[0]").value("Leroy"))
                .andExpect(jsonPath("$.location").value("SEA"))
                .andExpect(jsonPath("$.createdDate").value("2026-09-01"));
    }

    @Test
    void createFacilityWithFutureCreatedDateReturnsBadRequest() throws Exception {
        String requestBody = """
                {
                    "name": "Future facility",
                    "fishSpecies": ["Laks"],
                    "organisations": ["Leroy"],
                    "location": "SEA",
                    "createdDate": "2999-01-01"
                }
                """;

        mockMvc.perform(post("/api/facilities")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deleteFacilityReturnsNoContent() throws Exception {
        String requestBody = """
                {
                    "name": "Bergen",
                    "fishSpecies": ["Laks"],
                    "organisations": ["Leroy"],
                    "location": "SEA",
                    "createdDate": "2026-09-01"
                }
                """;

        String response = mockMvc.perform(post("/api/facilities")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andReturn()
                .getResponse()
                .getContentAsString();

        String id = response.replaceAll(".*\"id\":(\\d+).*", "$1");

        mockMvc.perform(delete("/api/facilities/" + id))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/facilities"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void updateFacilityReturnsUpdatedFacility() throws Exception {
        String createRequestBody = """
            {
                "name": "Bergen",
                "fishSpecies": ["Laks"],
                "organisations": ["Leroy"],
                "location": "SEA",
                "createdDate": "2026-09-01"
            }
            """;

        String response = mockMvc.perform(post("/api/facilities")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createRequestBody))
                .andReturn()
                .getResponse()
                .getContentAsString();

        String id = response.replaceAll(".*\"id\":(\\d+).*", "$1");

        String updateRequestBody = """
            {
                "name": "Updated Bergen",
                "fishSpecies": ["Torsk"],
                "organisations": ["Mowi"],
                "location": "LAND",
                "createdDate": "2026-08-01"
            }
            """;

        mockMvc.perform(put("/api/facilities/" + id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateRequestBody))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(Integer.parseInt(id)))
                .andExpect(jsonPath("$.name").value("Updated Bergen"))
                .andExpect(jsonPath("$.fishSpecies[0]").value("Torsk"))
                .andExpect(jsonPath("$.organisations[0]").value("Mowi"))
                .andExpect(jsonPath("$.location").value("LAND"))
                .andExpect(jsonPath("$.createdDate").value("2026-08-01"));
    }
}