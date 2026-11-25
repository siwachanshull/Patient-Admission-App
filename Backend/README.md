# Patient Admission API

Spring Boot REST API using MVC controllers, a service layer, and a repository interface. The current repository stores records in memory and loads sample patients at startup; changes are lost when the backend restarts. Replace `InMemoryPatientRepository` with a database-backed implementation when adding a database.

## Run locally

Requires Java 17 and Maven.

```sh
mvn spring-boot:run
```

The API listens on `http://localhost:8080`. The Vite frontend proxies `/api` requests to it.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/patients` | List patients; optional `name`, `ward`, `department`, `doctor`, and `status` filters |
| `GET` | `/api/patients/{id}` | Get one patient |
| `POST` | `/api/patients` | Add a patient |
| `PUT` | `/api/patients/{id}` | Update a patient |
| `PATCH` | `/api/patients/{id}/discharge` | Mark a patient as discharged |
| `DELETE` | `/api/patients/{id}` | Delete a patient |

Patient JSON fields are `name`, `age`, `gender`, `ward`, `department`, `doctor`, `admitted` (`YYYY-MM-DD`), and `status` (`Admitted` or `Discharged`). Responses include the generated `id`.
