package com.patientadmission.repository;

import com.patientadmission.model.Patient;

import java.util.List;
import java.util.Optional;

public interface PatientRepository {
    List<Patient> findAll();

    Optional<Patient> findById(String id);

    Patient save(Patient patient);

    void deleteById(String id);
}
