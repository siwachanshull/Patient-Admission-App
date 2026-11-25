const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Cannot connect to the patient API. Check the backend service and try again.");
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message || `Patient API request failed (${response.status}).`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getPatients() {
  return request("/api/patients");
}

export function createPatient(patient) {
  return request("/api/patients", {
    method: "POST",
    body: JSON.stringify(patient),
  });
}

export function updatePatient(id, patient) {
  return request(`/api/patients/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(patient),
  });
}

export function dischargePatient(id) {
  return request(`/api/patients/${encodeURIComponent(id)}/discharge`, {
    method: "PATCH",
  });
}

export function deletePatient(id) {
  return request(`/api/patients/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
