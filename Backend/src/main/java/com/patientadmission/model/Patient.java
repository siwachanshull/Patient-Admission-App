package com.patientadmission.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @Column(name = "patient_id", nullable = false, unique = true, length = 39)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false, length = 10)
    private String gender;

    @Column(nullable = false, length = 100)
    private String ward;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(nullable = false, length = 100)
    private String doctor;

    @Column(nullable = false)
    private LocalDate admitted;

    @Column(nullable = false, length = 20)
    private String status;

    public Patient() {
    }

    public Patient(
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
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.ward = ward;
        this.department = department;
        this.doctor = doctor;
        this.admitted = admitted;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getWard() {
        return ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public LocalDate getAdmitted() {
        return admitted;
    }

    public void setAdmitted(LocalDate admitted) {
        this.admitted = admitted;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
