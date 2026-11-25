# Patient Admission App

A web application for managing patient admissions. The React frontend communicates with a Spring Boot REST API, and patient records are stored in PostgreSQL.

## Live application

- Frontend: [https://patient-admission-app-tecq.netlify.app](https://patient-admission-app-tecq.netlify.app)
- Backend: [https://patient-admission-backend-311s.onrender.com](https://patient-admission-backend-311s.onrender.com)
- Patient API: [https://patient-admission-backend-311s.onrender.com/api/patients](https://patient-admission-backend-311s.onrender.com/api/patients)

## Tech stack

### Frontend

- React 18
- JavaScript (ES modules)
- Vite 6
- CSS
- Netlify static hosting

### Backend

- Java 17
- Spring Boot 3.5.8
- Spring Web MVC REST API
- Spring Data JPA and Hibernate
- Jakarta Bean Validation
- Maven
- PostgreSQL
- Render hosting

## Features

- Create, view, update, discharge, and delete patient records
- Search and filter records by name, ward, department, doctor, and admission status
- View active and discharged admissions
- See patient totals update as records change

## Run locally

### Prerequisites

- Java 17
- Maven
- Node.js 18 or later and npm
- PostgreSQL

### 1. Set up PostgreSQL

Create a PostgreSQL database named `patient_db`. In PowerShell, set the connection variables for the terminal where you will run the backend:

```powershell
$env:DB_URL = "jdbc:postgresql://localhost:5432/patient_db"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "<your-postgres-password>"
```

Replace the placeholder with your local PostgreSQL password. Do not commit real passwords or other secrets to GitHub.

### 2. Start the backend

From the repository root, open a terminal and run:

```powershell
cd Backend
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`. Hibernate creates or updates the patient table at startup.

### 3. Start the frontend

Open a second terminal from the repository root and run:

```powershell
cd Frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`. During local development, Vite proxies `/api` requests to the backend on port 8080, so `VITE_API_BASE_URL` is not required.

## API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/patients` | List patients; supports optional name, ward, department, doctor, and status filters |
| `GET` | `/api/patients/{id}` | Get one patient |
| `POST` | `/api/patients` | Create a patient |
| `PUT` | `/api/patients/{id}` | Update a patient |
| `PATCH` | `/api/patients/{id}/discharge` | Mark a patient as discharged |
| `DELETE` | `/api/patients/{id}` | Delete a patient |

## Deployment

The root [`netlify.toml`](./netlify.toml) configures the frontend build: Netlify uses `Frontend` as the base directory, runs `npm install && npm run build`, publishes `dist`, and sets `VITE_API_BASE_URL` to the Render backend URL.

The backend requires `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` in its hosting environment. Set `FRONTEND_ORIGIN` to `https://patient-admission-app-tecq.netlify.app` so browsers allow the deployed frontend to call the API. The hosting platform provides `PORT`.



Screen Shot- https://github.com/user-attachments/assets/a031663f-1ce6-43ac-a6cb-3bac48dc7a91
