package com.patientadmission.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.patientadmission.dto.PatientRequest;
import com.patientadmission.model.Patient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = "spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/patient_db}")
@AutoConfigureMockMvc
@Transactional
class PatientControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void supportsPatientCrudFilteringAndDischarge() throws Exception {
        PatientRequest createRequest = request("API Test Patient", "Admitted");
        MvcResult createResult = mockMvc.perform(post("/api/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andReturn();
        Patient created = objectMapper.readValue(createResult.getResponse().getContentAsString(), Patient.class);

        PatientRequest updateRequest = request("Updated API Test Patient", "Admitted");
        mockMvc.perform(put("/api/patients/{id}", created.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated API Test Patient"));

        mockMvc.perform(patch("/api/patients/{id}/discharge", created.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("Discharged"));

        mockMvc.perform(get("/api/patients")
                        .param("name", "Updated API Test")
                        .param("ward", "North Wing")
                        .param("department", "Cardiology")
                        .param("doctor", "Dr. Leslie Alexander")
                        .param("status", "Discharged"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(created.getId()));

        mockMvc.perform(delete("/api/patients/{id}", created.getId()))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/api/patients/{id}", created.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void rejectsInvalidPatientFields() throws Exception {
        PatientRequest invalidRequest = new PatientRequest(
                "",
                150,
                "Unknown",
                "North Wing · 204",
                "Cardiology",
                "Dr. Leslie Alexander",
                null,
                "Pending"
        );

        mockMvc.perform(post("/api/patients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.name").exists())
                .andExpect(jsonPath("$.errors.age").exists())
                .andExpect(jsonPath("$.errors.gender").exists())
                .andExpect(jsonPath("$.errors.admitted").exists())
                .andExpect(jsonPath("$.errors.status").exists());
    }

    private PatientRequest request(String name, String status) {
        return new PatientRequest(
                name,
                36,
                "Female",
                "North Wing · 204",
                "Cardiology",
                "Dr. Leslie Alexander",
                java.time.LocalDate.of(2026, 11, 25),
                status
        );
    }
}
