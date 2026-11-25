# Patient Admission API

Spring Boot REST API using MVC controllers, a service layer, and a Spring Data JPA repository. Patient records are stored in PostgreSQL and remain available after the backend restarts.

## Run locally

Requires Java 17, Maven, and PostgreSQL. Create a database named `patient_db`, then set the `DB_PASSWORD` environment variable to the password for the configured `postgres` user. Set `DB_URL` to use a different JDBC URL.

```sh
mvn spring-boot:run
```

The API listens on `http://localhost:8080`. The Vite frontend proxies `/api` requests to it.

Hibernate updates the `patients` table schema at startup. The database must be running and reachable at `localhost:5432`.

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
