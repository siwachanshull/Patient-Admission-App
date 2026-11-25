import React from "react";
import Icon from "./Icon.jsx";

const items = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "patients", label: "All patients", icon: "users" },
  { id: "admitted", label: "Admissions", icon: "bed" },
  { id: "discharged", label: "Discharged", icon: "check" },
];

export default function Sidebar({ activeView, onNavigate, open, onClose, onAdd, admittedCount }) {
  return (
    <>
      {open && <button className="sidebar-backdrop" onClick={onClose} aria-label="Close navigation" />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><span>+</span></div>
          <span>Patient Admission</span>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>

        <div className="workspace-label">MENU</div>
        <nav className="side-nav" aria-label="Main navigation">
          {items.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeView === item.id ? "nav-item-active" : ""}`}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
            >
              <Icon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.id === "admitted" && <span className="nav-count">{admittedCount}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="profile">
          <div className="avatar avatar-user">JD</div>
          <div className="profile-copy"><strong>Dr. Jordan Davis</strong><span>Administrator</span></div>
        </div>
        <button className="sidebar-add" onClick={onAdd}><Icon name="plus" size={18} /> Add new patient</button>
      </aside>
    </>
  );
}
