# Anleggsregister

En enkel fullstack-applikasjon for å registrere og administrere oppdrettsanlegg.

Prosjektet er laget i forbindelse med en kodeoppgave. Løsningen er bevisst holdt enkel, med fokus på CRUD-funksjonalitet, integrasjon mellom frontend og backend, og tydelige tekniske valg.

## Funksjonalitet

Applikasjonen støtter:

- visning av registrerte anlegg
- opprettelse av anlegg
- redigering av anlegg
- sletting av anlegg
- enkel validering av input

Et anlegg inneholder:

- navn
- fiskearter
- oppdrettsorganisasjoner
- plassering: sjø eller land
- opprettelsesdato

Opprettelsesdato kan ikke være i fremtiden.

## Teknologistack

Backend:

- Java 17
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Jakarta Validation
- H2 in-memory database
- Maven

Frontend:

- React
- TypeScript
- Vite

## Kjør lokalt

Start backend først, deretter frontend.

### Backend

Backend krever Java 17.

Fra prosjektroten:

```bash
cd backend
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
./mvnw spring-boot:run
```

Backend kjører på:

```text
http://localhost:8080
```

API-et for anlegg er tilgjengelig på:

```text
http://localhost:8080/api/facilities
```

### Frontend

Åpne en ny terminal fra prosjektroten:

```bash
cd frontend
npm install
npm run dev
```

Frontend kjører på:

```text
http://localhost:5173
```

## API

```text
GET    /api/facilities
POST   /api/facilities
PUT    /api/facilities/{id}
DELETE /api/facilities/{id}
```

`POST` brukes for å opprette et nytt anlegg. Backend genererer `id` og returnerer det opprettede anlegget.

`PUT` brukes for å oppdatere et eksisterende anlegg.

`DELETE` returnerer `204 No Content` ved vellykket sletting.

## Database

Applikasjonen bruker H2 som in-memory database:

```properties
spring.datasource.url=jdbc:h2:mem:anleggsregister
spring.jpa.hibernate.ddl-auto=create-drop
```

Det betyr at data lagres så lenge backend-prosessen kjører. Når backend restartes, slettes dataene.

H2-console kan åpnes her:

```text
http://localhost:8080/h2-console
```

Bruk:

```text
JDBC URL: jdbc:h2:mem:anleggsregister
User Name: sa
Password:
```

Passordet er tomt.

## Validering

Validering skjer i backend med Jakarta Validation.

Eksempler:

- `@NotBlank` på navn
- `@NotNull` på plassering og opprettelsesdato
- `@PastOrPresent` på opprettelsesdato

Controlleren bruker `@Valid`, slik at ugyldig input avvises før data lagres.

## Tester

Backend-testene kan kjøres med:

```bash
cd backend
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
./mvnw test
```

Prosjektet har enkle API-tester med MockMvc. Disse tester oppførselen frontend er avhengig av, blant annet statuskoder, JSON-responser og validering.

## Tekniske valg og refleksjon

Backend er strukturert enkelt:

```text
Controller -> Service -> Repository -> JPA/Hibernate -> H2
```

Controlleren håndterer HTTP-kall, service-laget inneholder applikasjonslogikken, og repository-laget bruker Spring Data JPA for databaseoperasjoner.

Frontend er holdt enkel med React state og komponenter. Det er ikke brukt Redux, routing eller ekstra abstraksjoner, fordi applikasjonen foreløpig er liten og har få skjermbilder.

I frontend brukes TypeScript-typene `Facility` og `FacilityRequest` for API-kontrakten. `Facility` representerer data som kommer tilbake fra backend, inkludert `id`. `FacilityRequest` brukes når frontend sender data ved opprettelse eller oppdatering, og inneholder derfor ikke `id`.

Fiskearter og oppdrettsorganisasjoner er modellert som `@ElementCollection` i stedet for egne entities. Det er et pragmatisk valg for en liten oppgave, men i en produksjonsløsning kunne dette blitt egne tabeller eller masterdata.

H2 in-memory database er brukt for enkel lokal kjøring. I produksjon ville jeg brukt en persistent database som PostgreSQL, med migreringer via Flyway eller Liquibase.

### Hva jeg prioriterte bort grunnet tid / mulige neste steg

Backend:
- server-side paginering og sortering, spesielt for  under oppgaven "Hent en liste over alle anlegg - utvidelse"
- en enkel server-side filtering, for eksempel på "location" feltet, som kunne blitt sendt som et query-parameter, for eksempel `/api/facilities?location=SEA`
- mer strukturert feilhåndtering med et stabilt JSON-format for valideringsfeil og andre API-feil

Frontend:
- samle state i `CreateEditFacilityForm`. I dag har formen flere separate states. En naturlig forbedring ville vært å samle feltene i ett `formData`-objekt, siden de sammen utgjør request-payloaden til backend
- samle create/edit/closed-visning i én `formMode`-state i `FacilityRegistry`. Det ville gjort UI-tilstanden tydeligere og hindret ugyldige kombinasjoner, for eksempel at create- og edit-formen er aktive samtidig
- flytte mer styling ut av komponentene og inn i CSS-klasser

### Andre ting jeg ville vurdert i produksjon

- autentisering og autorisasjon (brukeren må logge inn med brukernavn/passord, Azure AD osv.)
- persistent database, for eksempel PostgreSQL
- databasemigreringer med Flyway eller Liquibase
- mer logging i backend
- mer omfattende testdekning
- paginering hvis datamengden blir stor
- DTO-er i API-et i stedet for å eksponere JPA entities direkte (f.eks. implementere dataobjekter "FacilityRequest" og "FacilityResponse")
