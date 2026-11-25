package com.patientadmission.controller;

import com.patientadmission.dto.PatientRequest;
import com.patientadmission.model.Patient;
import com.patientadmission.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class PatientController {
    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public List<Patient> findPatients(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String ward,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String doctor,
            @RequestParam(required = false) String status
    ) {
        return patientService.findPatients(name, ward, department, doctor, status);
    }

    @GetMapping("/{id}")
    public Patient findPatient(@PathVariable String id) {
        return patientService.findPatient(id);
    }

    @PostMapping
    public ResponseEntity<Patient> createPatient(@Valid @RequestBody PatientRequest request) {
        Patient created = patientService.createPatient(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable String id, @Valid @RequestBody PatientRequest request) {
        return patientService.updatePatient(id, request);
    }

    @PatchMapping("/{id}/discharge")
    public Patient dischargePatient(@PathVariable String id) {
        return patientService.dischargePatient(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable String id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }
}
