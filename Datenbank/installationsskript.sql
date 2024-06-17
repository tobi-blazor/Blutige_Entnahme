-- Erstellen der Tabelle Patient
CREATE TABLE Patient (
    PatientID INT AUTO_INCREMENT PRIMARY KEY,
    Vorname VARCHAR(255) NOT NULL,
    Nachname VARCHAR(255) NOT NULL,
    Geburtsdatum DATE NOT NULL,
    Hinweise TEXT
);

-- Erstellen der Tabelle Personal
CREATE TABLE Personal (
    PersonalID INT AUTO_INCREMENT PRIMARY KEY,
    Vorname VARCHAR(255) NOT NULL,
    Nachname VARCHAR(255) NOT NULL,
    Geburtsdatum DATE NOT NULL
);

-- Erstellen der Tabelle Auftrag
CREATE TABLE Auftrag (
    AuftragsID INT AUTO_INCREMENT PRIMARY KEY,
    GeplanterZeitpunkt DATETIME,
    PatientID INT,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID)
);

-- Erstellen der Tabelle Blutprobe
CREATE TABLE Blutprobe (
    ProbeID INT AUTO_INCREMENT PRIMARY KEY,
    Grund TEXT,
    Hinweise TEXT,
    MaxVerweildauer INT,
    EntnahmeZeitpunkt DATETIME, -- gefüllt wenn Blutentnommen
    Laboreingang DATETIME, -- gefüllt wenn im Labor eingegangen
    PersonalID INT, -- gefüllt wenn Blutentnommen
    AuftragsID INT,
    FOREIGN KEY (AuftragsID) REFERENCES Auftrag(AuftragsID),
    FOREIGN KEY (PersonalID) REFERENCES Personal(PersonalID)
);


-- Beispiel-Daten für die Tabelle Patient
INSERT INTO Patient (Vorname, Nachname, Geburtsdatum, Hinweise)
VALUES
    ('Max', 'Mustermann', '1990-05-15', 'Bluthochdruck'),
    ('Anna', 'Müller', '1985-12-03', NULL),
    ('Michael', 'Schmidt', '1978-07-20', 'Allergien: Pollen');

-- Beispiel-Daten für die Tabelle Personal
INSERT INTO Personal (Vorname, Nachname, Geburtsdatum)
VALUES
    ('Julia', 'Schulz', '1987-09-25'),
    ('Markus', 'Fischer', '1980-03-12'),
    ('Sarah', 'Wagner', '1993-11-08');

-- Beispiel-Daten für die Tabelle Auftrag
INSERT INTO Auftrag (GeplanterZeitpunkt, PatientID)
VALUES
    ('2024-06-20 10:00:00', 1),
    ('2024-06-22 15:30:00', 2),
    ('2024-06-23 09:00:00', 3);

-- Beispiel-Daten für die Tabelle Blutprobe
INSERT INTO Blutprobe (Grund, Hinweise, MaxVerweildauer, EntnahmeZeitpunkt, Laboreingang, PersonalID, AuftragsID)
VALUES
    ('Routineuntersuchung', 'Keine besonderen Hinweise', 48, '2024-06-20 11:30:00', '2024-06-20 12:15:00', 1, 1),
    ('Verdacht auf Infektion', 'Fieber in den letzten Tagen', 24, '2024-06-22 16:00:00', NULL, 2, 2),
    ('Nachkontrolle', NULL, 72, '2024-06-23 09:30:00', NULL, 3, 3);
