package com.patientadmission.service;

import com.patientadmission.dto.PatientRequest;
import com.patientadmission.exception.PatientNotFoundException;
import com.patientadmission.model.Patient;
import com.patientadmission.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
public class PatientService {
    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> findPatients(String name, String ward, String department, String doctor, String status) {
        return patientRepository.findAll().stream()
                .filter(patient -> containsIgnoreCase(patient.getName(), name))
                .filter(patient -> isBlank(ward) || patient.getWard().startsWith(ward.trim()))
                .filter(patient -> equalsIgnoreCase(patient.getDepartment(), department))
                .filter(patient -> equalsIgnoreCase(patient.getDoctor(), doctor))
                .filter(patient -> equalsIgnoreCase(patient.getStatus(), status))
                .toList();
    }

    public Patient findPatient(String id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(id));
    }

    public Patient createPatient(PatientRequest request) {
        String id = "PT-" + UUID.randomUUID();
        return patientRepository.save(toPatient(id, request));
    }

    public Patient updatePatient(String id, PatientRequest request) {
        findPatient(id);
        return patientRepository.save(toPatient(id, request));
    }

    public Patient dischargePatient(String id) {
        Patient patient = findPatient(id);
        Patient discharged = new Patient(
                patient.getId(),
                patient.getName(),
                patient.getAge(),
                patient.getGender(),
                patient.getWard(),
                patient.getDepartment(),
                patient.getDoctor(),
                patient.getAdmitted(),
                "Discharged"
        );
        return patientRepository.save(discharged);
    }

    public void deletePatient(String id) {
        findPatient(id);
        patientRepository.deleteById(id);
    }

    private Patient toPatient(String id, PatientRequest request) {
        return new Patient(
                id,
                request.name().trim(),
                request.age(),
                request.gender(),
                request.ward(),
                request.department(),
                request.doctor(),
                request.admitted(),
                request.status()
        );
    }

    private boolean containsIgnoreCase(String value, String filter) {
        return isBlank(filter) || value.toLowerCase(Locale.ROOT).contains(filter.trim().toLowerCase(Locale.ROOT));
    }

    private boolean equalsIgnoreCase(String value, String filter) {
        return isBlank(filter) || value.equalsIgnoreCase(filter.trim());
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
