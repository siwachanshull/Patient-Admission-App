import React, { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import { patientFormOptions } from "../data/patients.js";

const emptyPatient = {
  name: "",
  age: "",
  gender: "",
  ward: "",
  department: "",
  doctor: "",
  admitted: new Date().toISOString().slice(0, 10),
  status: "Admitted",
};

export default function PatientModal({ patient, onSave, onClose }) {
  const [form, setForm] = useState(patient ? { ...patient } : emptyPatient);

  useEffect(() => {
    setForm(patient ? { ...patient } : { ...emptyPatient, admitted: new Date().toISOString().slice(0, 10) });
  }, [patient]);

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    onSave({ ...form, age: Number(form.age) });
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="patient-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-heading">
          <div>
            <span className="eyebrow">{patient ? "PATIENT RECORD" : "NEW ADMISSION"}</span>
            <h2 id="modal-title">{patient ? "Edit patient" : "Add a patient"}</h2>
            <p>{patient ? "Update the patient's admission details." : "Enter patient details to create a new record."}</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button>
        </div>
        <form onSubmit={submit}>
          <div className="form-grid">
            <label className="form-field form-field-wide">
              <span>Full name <b>*</b></span>
              <input autoFocus required type="text" name="name" value={form.name} onChange={update} placeholder="e.g. Alex Morgan" />
            </label>
            <label className="form-field">
              <span>Age <b>*</b></span>
              <input required min="0" max="125" type="number" name="age" value={form.age} onChange={update} placeholder="Age" />
            </label>
            <label className="form-field">
              <span>Gender <b>*</b></span>
              <select required name="gender" value={form.gender} onChange={update}>
                <option value="">Select gender</option>
                {patientFormOptions.genders.map((gender) => <option key={gender}>{gender}</option>)}
              </select>
            </label>
            <label className="form-field">
              <span>Ward & room <b>*</b></span>
              <select required name="ward" value={form.ward} onChange={update}>
                <option value="">Select ward & room</option>
                {patientFormOptions.wards.map((ward) => <option key={ward}>{ward}</option>)}
              </select>
            </label>
            <label className="form-field">
              <span>Department <b>*</b></span>
              <select required name="department" value={form.department} onChange={update}>
                <option value="">Select department</option>
                {patientFormOptions.departments.map((department) => <option key={department}>{department}</option>)}
              </select>
            </label>
            <label className="form-field form-field-wide">
              <span>Attending doctor <b>*</b></span>
              <select required name="doctor" value={form.doctor} onChange={update}>
                <option value="">Select doctor</option>
                {patientFormOptions.doctors.map((doctor) => <option key={doctor}>{doctor}</option>)}
              </select>
            </label>
            <label className="form-field form-field-wide">
              <span>Admission date <b>*</b></span>
              <input required type="date" name="admitted" value={form.admitted} onChange={update} />
            </label>
            <label className="form-field form-field-wide">
              <span>Status <b>*</b></span>
              <select required name="status" value={form.status} onChange={update}>
                <option value="">Select status</option>
                {patientFormOptions.statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="button button-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary"><Icon name="plus" size={17} />{patient ? "Save changes" : "Add patient"}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
