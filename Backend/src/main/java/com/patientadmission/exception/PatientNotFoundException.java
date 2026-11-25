package com.patientadmission.exception;

public class PatientNotFoundException extends RuntimeException {
    public PatientNotFoundException(String id) {
        super("Patient not found: " + id);
    }
}
