# Patient Admission App

## Run locally

Start the backend in one terminal:

```sh
cd Backend
mvn spring-boot:run
```

Start the frontend in another terminal:

```sh
cd Frontend
npm install
npm run dev
```

The React app uses the Spring Boot REST API at `/api/patients`. The current backend uses an in-memory repository seeded with sample records; data is lost when the backend restarts. Replace the repository implementation with a database-backed repository when a database is added.