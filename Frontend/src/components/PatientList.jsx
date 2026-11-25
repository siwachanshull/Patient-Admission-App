import React from "react";
import Icon from "./Icon.jsx";

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function PatientList({ patients, onEdit, onDelete, onDischarge }) {
  if (!patients.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon"><Icon name="users" size={24} /></div>
        <h3>No patients found</h3>
        <p>Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table className="patient-table">
        <thead>
          <tr>
            <th>Patient</th><th>Ward / room</th><th>Department</th><th>Attending doctor</th><th>Admitted</th><th>Status</th><th><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={patient.id}>
              <td data-label="Patient">
                <div className="patient-cell">
                  <div className={`avatar avatar-${index % 5}`}>{initials(patient.name)}</div>
                  <div className="patient-name"><strong>{patient.name}</strong><span>{patient.id} · {patient.age} yrs, {patient.gender}</span></div>
                </div>
              </td>
              <td data-label="Ward / room"><span className="ward-cell"><span className="ward-dot" />{patient.ward}</span></td>
              <td data-label="Department"><span className="department-cell">{patient.department}</span></td>
              <td data-label="Attending doctor"><span className="doctor-cell">{patient.doctor}</span></td>
              <td data-label="Admitted"><span className="date-cell">{formatDate(patient.admitted)}</span></td>
              <td data-label="Status"><span className={`status-pill ${patient.status === "Admitted" ? "status-admitted" : "status-discharged"}`}><span />{patient.status}</span></td>
              <td data-label="Actions">
                <div className="row-actions">
                  {patient.status === "Admitted" && (
                    <button className="row-action discharge-action" onClick={() => onDischarge(patient)} aria-label={`Discharge ${patient.name}`} title="Mark as discharged"><Icon name="check" size={17} /></button>
                  )}
                  <button className="row-action" onClick={() => onEdit(patient)} aria-label={`Edit ${patient.name}`} title="Edit patient"><Icon name="pencil" size={16} /></button>
                  <button className="row-action row-action-delete" onClick={() => onDelete(patient)} aria-label={`Delete ${patient.name}`} title="Delete patient"><Icon name="trash" size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
