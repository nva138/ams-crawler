CREATE TABLE job_posting (
    id  BIGSERIAL PRIMARY KEY,
    title   VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    url VARCHAR(512) NOT NULL,
    description TEXT
);