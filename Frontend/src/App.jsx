import React, { useEffect, useMemo, useState } from "react";
import Icon from "./components/Icon.jsx";
import PatientList from "./components/PatientList.jsx";
import PatientModal from "./components/PatientModal.jsx";
import Sidebar from "./components/Sidebar.jsx";
import {
  createPatient as createPatientRequest,
  deletePatient as deletePatientRequest,
  dischargePatient as dischargePatientRequest,
  getPatients,
  updatePatient as updatePatientRequest,
} from "./api/patients.js";

const viewTitles = {
  overview: "Patient overview",
  patients: "All patients",
  admitted: "Current admissions",
  discharged: "Discharged patients",
};

function StatCard({ label, value, note }) {
  return (
    <article className="stat-card">
      <div className="stat-content"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
    </article>
  );
}

function App() {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [activeView, setActiveView] = useState("patients");
  const [search, setSearch] = useState("");
  const [wardFilter, setWardFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("");
  const [modalPatient, setModalPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    getPatients()
      .then((records) => {
        if (isCurrent) {
          setPatients(records);
          setApiError("");
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setApiError(error.message);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [loadAttempt]);

  const admittedCount = patients.filter((patient) => patient.status === "Admitted").length;
  const dischargedCount = patients.filter((patient) => patient.status === "Discharged").length;
  const wards = [...new Set(patients.map((patient) => patient.ward.split(" · ")[0]))].sort();
  const departments = [...new Set(patients.map((patient) => patient.department))].sort();
  const doctors = [...new Set(patients.map((patient) => patient.doctor))].sort();
  const visiblePatients = useMemo(() => patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchesWard = !wardFilter || patient.ward.startsWith(wardFilter);
    const matchesDepartment = !departmentFilter || patient.department === departmentFilter;
    const matchesDoctor = !doctorFilter || patient.doctor === doctorFilter;
    const matchesView = activeView === "admitted" ? patient.status === "Admitted"
      : activeView === "discharged" ? patient.status === "Discharged" : true;
    return matchesSearch && matchesWard && matchesDepartment && matchesDoctor && matchesView;
  }), [patients, search, wardFilter, departmentFilter, doctorFilter, activeView]);

  function notify(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function openAddModal() {
    setModalPatient(null);
    setModalOpen(true);
  }

  async function savePatient(values) {
    setApiError("");
    try {
      if (modalPatient) {
        const updatedPatient = await updatePatientRequest(modalPatient.id, values);
        setPatients((current) => current.map((patient) => patient.id === updatedPatient.id ? updatedPatient : patient));
        notify("Patient details updated");
      } else {
        const createdPatient = await createPatientRequest(values);
        setPatients((current) => [createdPatient, ...current]);
        notify("Patient added successfully");
      }
      setModalOpen(false);
    } catch (error) {
      setApiError(error.message);
    }
  }

  async function deletePatient(patient) {
    if (window.confirm(`Delete ${patient.name}'s patient record? This cannot be undone.`)) {
      setApiError("");
      try {
        await deletePatientRequest(patient.id);
        setPatients((current) => current.filter((entry) => entry.id !== patient.id));
        notify("Patient record deleted");
      } catch (error) {
        setApiError(error.message);
      }
    }
  }

  async function dischargePatient(patient) {
    setApiError("");
    try {
      const dischargedPatient = await dischargePatientRequest(patient.id);
      setPatients((current) => current.map((entry) => entry.id === dischargedPatient.id ? dischargedPatient : entry));
      notify(`${patient.name} marked as discharged`);
    } catch (error) {
      setApiError(error.message);
    }
  }

  const hasFilters = search || wardFilter || departmentFilter || doctorFilter;

  function clearFilters() {
    setSearch("");
    setWardFilter("");
    setDepartmentFilter("");
    setDoctorFilter("");
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onAdd={openAddModal}
        admittedCount={admittedCount}
      />
      <main className="main-content">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Icon name="menu" /></button>
          <div className="breadcrumb"><span>Workspace</span><Icon name="chevron" size={14} /><strong>Patients</strong></div>
          <div className="topbar-actions">
            <span className="today-label">{new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date())}</span>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">PATIENT MANAGEMENT</div>
              <h1>{viewTitles[activeView]}</h1>
              <p>Manage patient records, admissions, and care assignments.</p>
            </div>
            <button className="button button-primary add-patient-button" onClick={openAddModal}><Icon name="plus" size={18} /> Add patient</button>
          </div>

          {apiError && (
            <div className="api-error" role="alert">
              <span>{apiError}</span>
              {isLoading || patients.length > 0 ? null : (
                <button className="button button-secondary" onClick={() => setLoadAttempt((attempt) => attempt + 1)}>Retry</button>
              )}
            </div>
          )}

          <section className="stats-grid" aria-label="Patient statistics">
            <StatCard label="Total patients" value={patients.length} note="Across all departments" />
            <StatCard label="Currently admitted" value={admittedCount} note="Patients in care" />
            <StatCard label="Discharged" value={dischargedCount} note="This reporting period" />
            <StatCard label="Departments" value={departments.length} note="Providing patient care" />
          </section>

          <section className="patient-panel" aria-label="Patient records">
            <div className="panel-heading">
              <div>
                <h2>Patient directory</h2>
                <p>View and manage your patient records</p>
              </div>
            </div>

            <div className="filter-toolbar">
              <label className="search-field">
                <Icon name="search" size={18} />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by patient name..." aria-label="Search patients by name" />
                {search && <button className="search-clear" onClick={() => setSearch("")} aria-label="Clear search"><Icon name="close" size={15} /></button>}
              </label>
              <div className="filter-selects">
                <label className="select-wrap"><span className="sr-only">Filter by ward</span><select value={wardFilter} onChange={(event) => setWardFilter(event.target.value)}><option value="">All wards</option>{wards.map((ward) => <option key={ward}>{ward}</option>)}</select></label>
                <label className="select-wrap"><span className="sr-only">Filter by department</span><select value={departmentFilter} onChange={(event) => setDepartmentFilter(event.target.value)}><option value="">All departments</option>{departments.map((department) => <option key={department}>{department}</option>)}</select></label>
                <label className="select-wrap"><span className="sr-only">Filter by doctor</span><select value={doctorFilter} onChange={(event) => setDoctorFilter(event.target.value)}><option value="">All doctors</option>{doctors.map((doctor) => <option key={doctor}>{doctor}</option>)}</select></label>
              </div>
            </div>

            <div className="results-bar">
              <span><Icon name="filter" size={15} /> Showing <strong>{visiblePatients.length}</strong> of {patients.length} patients</span>
              {hasFilters && <button className="clear-filters" onClick={clearFilters}>Clear filters <Icon name="close" size={14} /></button>}
            </div>
            {isLoading ? (
              <div className="loading-state" role="status">Loading patients...</div>
            ) : (
              <PatientList
                patients={visiblePatients}
                onEdit={(patient) => { setModalPatient(patient); setModalOpen(true); }}
                onDelete={deletePatient}
                onDischarge={dischargePatient}
              />
            )}
            <div className="panel-footer"><span>Showing {visiblePatients.length} patient{visiblePatients.length === 1 ? "" : "s"}</span></div>
          </section>

          <footer className="page-footer"><span>© {new Date().getFullYear()} Patient Admission</span></footer>
        </div>
      </main>

      {modalOpen && <PatientModal patient={modalPatient} onSave={savePatient} onClose={() => setModalOpen(false)} />}
      {toast && <div className="toast" role="status"><span><Icon name="check" size={16} /></span>{toast}</div>}
    </div>
  );
}

export default App;
