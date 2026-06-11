# BAUANLEITUNG — AMS Job Crawler (Lern-Roadmap)

Das hier ist die **Karte**, nicht die Lösung. Reihenfolge + Warum. Kein Code —
den schreibst du. Jede Phase nennt den **a11yforge-Zwilling** (dein Worked Example
zum Studieren, nicht Kopieren) und das passende **Buch-Kapitel**.

> **Das große Ziel:** Ein Crawler, der AMS-Job-Inserate scrapt und speichert —
> gebaut in **derselben Architektur** wie deine a11yforge-Scanner-Vertikale.
> Wenn du das hier aus null kannst, kannst du deinen Scanner. Das ist der Bau-Beweis.

---

## Das Prinzip der Reihenfolge: von innen nach außen

Wir bauen **erst das Rückgrat** (Daten + Spring-Schichten), **dann die Brücke**
(Java↔Node-Scraper). Genau wie dein Buch: Part II (Spine) vor Part III (Scanner).
Grund: Du kannst Jobs erst speichern/anzeigen, *bevor* du sie scrapst — so hast du
nach jeder Phase etwas Lauffähiges (sichtbarer Win), und der schwierige
Brücken-Teil sitzt am Ende auf festem Boden.

---

## Phase 0 — Gerüst & erster Boot  *(Session 1, klein, Win am Ende)*
**Ziel:** Ein leeres Spring-Boot-Projekt, das startet.
- Spring-Projekt scaffolden (welche Dependencies? — du entscheidest, ich frage
  „warum die?"). Start minimal: web + test. Rest holen wir, wenn wir ihn brauchen.
- `./mvnw spring-boot:run` → „Tomcat started on 8081". **Das ist dein erster Win.**
- a11yforge-Zwilling: `backend/pom.xml` · **Buch Ch 2–3**

## Phase 1 — Das Rückgrat: ein Job, manuell  *(mehrere Sessions)*
**Ziel:** Per HTTP einen Job anlegen und auflisten — ganz ohne Scraper.
Reihenfolge (begründe sie SELBST, bevor wir starten):
1. **Entity** `JobPosting` (Felder: title, company, location, url, …)
   — Zwilling: `Scan.java` / `Violation.java` · **Buch Ch 5**
2. **Repository** (+ erste derived query, z.B. `findByCompany…`)
   — Zwilling: `ScanRepository.java` · **Buch Ch 6**
3. **DTO** (rein/raus, record) — Zwilling: `ScanResponseDTO.java` · **Buch Ch 4**
4. **Service** (Geschäftslogik, Constructor-Injection)
   — Zwilling: `ScanService.java` · **Buch Ch 7**
5. **Controller** (POST anlegen, GET auflisten)
   — Zwilling: `ScanController.java` · **Buch Ch 4**

## Phase 2 — Echte Persistenz  *(Postgres + Flyway + Docker)*
**Ziel:** Jobs überleben den Neustart.
- Docker-Compose für Postgres, `application-local.properties`, Flyway-Migration V1.
- a11yforge-Zwilling: `docker/docker-compose.yml`, `db/migration/` · **Buch Ch 3, 5**
- (Hier helfe ich bei Boilerplate-Vokabel schnell — Docker/Properties sind Vokabel.)

## Phase 3 — DIE BRÜCKE  *(das Herz — dein eigentliches Lernziel)*
**Ziel:** Java startet einen Node-Scraper, der AMS scrapt, und speichert die Jobs.
Das ist exakt dein a11yforge-`ScannerProcessRunner` + Buch **Ch 8–10**.
1. **Node-Scraper** (Playwright): AMS-Seite öffnen, Jobs auslesen, **als JSON auf
   stdout** ausgeben. — Zwilling: `scanner/src/cli.ts`, `crawl.ts`
2. **DTO-Vertrag** Node↔Java (gleiche Shape beidseitig) — Zwilling: `types.ts` ↔
   `PageScanResultDto.java`
3. **`ScraperProcessRunner`** (Java): ProcessBuilder, Output in Temp-File
   (Deadlock-Falle!), Exit-Code prüfen, JSON parsen. — Zwilling:
   `ScannerProcessRunner.java` · **Buch Ch 8**
4. **Mapping + Persistenz** (DTO → Entity → speichern) — Zwilling: `ScanService`
   persist-Block · **Buch Ch 10**
5. **Crawl-Trigger** im Controller (`POST /api/crawl`).

## Phase 4 — Kür  *(wenn das Rückgrat + Brücke sitzen)*
- Suche/Filter (mehr derived queries), Pagination, Fehler-/Status-Handling,
  Dedup, evtl. ein simples Frontend. Je nach Lust.

---

## Vor JEDER Phase (der Loop, siehe CLAUDE.md)
1. Ich frage: „Was zuerst, warum?" → du begründest die Reihenfolge.
2. Du **erklärst den Ablauf in Worten**, bevor du tippst.
3. Neuland? → a11yforge-Zwilling studieren (nicht kopieren).
4. Du tippst. Steckst du → du rufst die Hinweis-Stufe ab.
5. Review in Worten + Win festhalten.

## Session-Start (jedes Mal)
„Erklär mir aus dem Kopf, was wir letzte Session gebaut haben und warum."
(Retrieval — verankert das Gelernte, bevor Neues draufkommt.)

---

**Nächster Schritt:** Phase 0. Aber NICHT ich richte es ein — *du*. Ich frage dich
gleich: „Wenn du ein Spring-Boot-Projekt von null startest — was ist der allererste
Schritt, und warum?" Beantworte das in Worten, dann legst du los.
