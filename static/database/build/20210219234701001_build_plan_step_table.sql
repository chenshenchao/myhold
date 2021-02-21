CREATE TABLE mh_plan_step (
    plan_id  INTEGER,
    step_id  INTEGER,
    title    STRING,
    content  TEXT,
    enter_at DATETIME,
    alter_at DATETIME,
    start_at DATETIME,
    flow_at  DATETIME,
    end_at   DATETIME,
    PRIMARY KEY (
        plan_id,
        step_id
    )
);
