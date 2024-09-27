CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    product VARCHAR(100) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total DECIMAL(15, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED
);