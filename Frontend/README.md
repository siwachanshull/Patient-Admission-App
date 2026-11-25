# Patient Admission Frontend

Responsive React interface for managing patient records through the Spring Boot API. The Vite development server proxies API requests to `http://localhost:8080`.

## Run locally

```sh
npm install
npm run dev
```

Start the backend first in another terminal from `../Backend` with `mvn spring-boot:run`. Create a production build with `npm run build`.

For a Render static site, set `VITE_API_BASE_URL` to the backend service URL, run `npm install && npm run build`, and publish `dist`. Leave the variable unset locally to use Vite's `/api` proxy.

## Included workflows

- Add and edit patient admission details
- Enter names, ages, and admission dates with the appropriate input types; select gender, ward/room, department, doctor, and admission status from lists
- Search patients by name and filter by ward, department, or doctor
- View active admissions and discharged patients
- Mark an admitted patient as discharged or delete a record
- View counts that update as records change
