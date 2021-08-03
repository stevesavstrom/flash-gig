
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

-- List of wedding venues
CREATE TABLE "venue" (
	"id" SERIAL PRIMARY KEY,
	"venue" VARCHAR(255),
	"address" VARCHAR(255),
	"city" VARCHAR(255),
	"state" VARCHAR(255),
	"zip" INT,
	"description" TEXT,
	"lat" NUMERIC,
	"lng" NUMERIC
);

-- List of services
CREATE TABLE "service" (
	"id" SERIAL PRIMARY KEY,
	"service" VARCHAR(255)
);

-- List of jobs
CREATE TABLE "job" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user"(id),
    "headline" TEXT,
    "date" DATE,
    "venue_id" INT REFERENCES "venue"(id),
    "hours" INT,
    "pay" INT,
    "service_id" INT REFERENCES "service"(id)
);

-- List of applications
CREATE TABLE "application" (
    "id" SERIAL PRIMARY KEY,
    "job_id" INT REFERENCES "job"(id),
    "applicant_id" INT REFERENCES "user"(id),
    "message" TEXT,
    "status" VARCHAR(55) DEFAULT 'A'
);