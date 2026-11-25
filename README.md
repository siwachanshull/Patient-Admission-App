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

The React app uses the Spring Boot REST API at `/api/patients`. The backend stores patient records in PostgreSQL. Create the `patient_db` database and set the `DB_PASSWORD` environment variable before starting the backend; patient records persist across restarts.