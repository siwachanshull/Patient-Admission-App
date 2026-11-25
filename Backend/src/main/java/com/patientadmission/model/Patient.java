package com.patientadmission.model;

import java.time.LocalDate;

public record Patient(
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
}
