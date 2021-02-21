CREATE TABLE mh_plan (
    id       INTEGER  PRIMARY KEY ASC AUTOINCREMENT,
    title    STRING,
    content  TEXT,
    enter_at DATETIME,
    alter_at DATETIME,
    start_at DATETIME,
    flow_at  DATETIME,
    end_at   DATETIME
);
