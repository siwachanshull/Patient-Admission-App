package com.patientadmission.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record PatientRequest(
        @NotBlank @Size(max = 100) String name,
        @NotNull @Min(0) @Max(125) Integer age,
        @NotBlank @Pattern(regexp = "Female|Male|Other") String gender,
        @NotBlank @Size(max = 100) String ward,
        @NotBlank @Size(max = 100) String department,
        @NotBlank @Size(max = 100) String doctor,
        @NotNull LocalDate admitted,
        @NotBlank @Pattern(regexp = "Admitted|Discharged") String status
) {
}
