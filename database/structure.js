export default `
CREATE TABLE IF NOT EXISTS structure (
    id       BIGINT   PRIMARY KEY ASC,
    filename STRING,
    start_at DATETIME,
    end_at   DATETIME
)`;
