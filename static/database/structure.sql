CREATE TABLE IF NOT EXISTS mh_structure (
    id       BIGINT   PRIMARY KEY ASC,
    filename STRING,
    start_at DATETIME,
    end_at   DATETIME
);
