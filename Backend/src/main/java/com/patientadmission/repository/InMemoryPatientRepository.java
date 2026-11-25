package com.patientadmission.repository;

import com.patientadmission.model.Patient;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class InMemoryPatientRepository implements PatientRepository {
    private final Map<String, Patient> patients = new LinkedHashMap<>();

    public InMemoryPatientRepository() {
        seedDemoPatients();
    }

    @Override
    public synchronized List<Patient> findAll() {
        return patients.values().stream()
                .sorted(Comparator.comparing(Patient::id).reversed())
                .toList();
    }

    @Override
    public synchronized Optional<Patient> findById(String id) {
        return Optional.ofNullable(patients.get(id));
    }

    @Override
    public synchronized Patient save(Patient patient) {
        patients.put(patient.id(), patient);
        return patient;
    }

    @Override
    public synchronized void deleteById(String id) {
        patients.remove(id);
    }

    private void seedDemoPatients() {
        LocalDate today = LocalDate.now();
        addDemoPatient("PT-2048", "Olivia Rhye", 34, "Female", "North Wing · 204", "Cardiology", "Dr. Leslie Alexander", today, "Admitted");
        addDemoPatient("PT-2047", "Phoenix Baker", 28, "Male", "East Wing · 108", "Neurology", "Dr. Courtney Henry", today.minusDays(1), "Admitted");
        addDemoPatient("PT-2046", "Lana Steiner", 42, "Female", "South Wing · 312", "Orthopedics", "Dr. Cameron Williamson", today.minusDays(2), "Admitted");
        addDemoPatient("PT-2045", "Demi Wilkinson", 31, "Female", "North Wing · 206", "Cardiology", "Dr. Leslie Alexander", today.minusDays(3), "Admitted");
        addDemoPatient("PT-2044", "Candice Wu", 56, "Female", "West Wing · 410", "Oncology", "Dr. Darlene Robertson", today.minusDays(4), "Discharged");
        addDemoPatient("PT-2043", "Natali Craig", 39, "Male", "East Wing · 112", "Neurology", "Dr. Courtney Henry", today.minusDays(5), "Admitted");
        addDemoPatient("PT-2042", "Drew Cano", 47, "Male", "South Wing · 318", "Orthopedics", "Dr. Cameron Williamson", today.minusDays(6), "Discharged");
        addDemoPatient("PT-2041", "Andi Lane", 25, "Female", "West Wing · 408", "Oncology", "Dr. Darlene Robertson", today.minusDays(7), "Admitted");
    }

    private void addDemoPatient(
            String id,
            String name,
            int age,
            String gender,
            String ward,
            String department,
            String doctor,
            LocalDate admitted,
            String status
    ) {
        patients.put(id, new Patient(id, name, age, gender, ward, department, doctor, admitted, status));
    }
}
