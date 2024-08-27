-- for help \?

--list database \l

-- connect to a particular database \c database_name;

--create database CREATE DATABASE database_name;

--create table

CREATE TABLE product(
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale BOOLEAN
);

--list tables in the database \d after connecting to the particular database

--to see the structure of the table \d TABLE_NAME

-- Modify table by adding column

ALTER TABLE product ADD COLUMN featured BOOLEAN;

--Modify table by deleting a column

ALTER TABLE product DROP COLUMN featured;

--drop table 

DROP TABLE product;

--drop database

DROP DATABASE practice;

CREATE DATABASE yelp; 

\c yelp;

CREATE TABLE restaurants(
    id INT,
    name VARCHAR(50),
    location VARCHAR(50),
    price_range INT
);

INSERT INTO restaurants(id,name,location,price_range) VALUES (123,'macdonalds','new york',3);

INSERT INTO restaurants(id,name,location,price_range) VALUES (124,'pizza hut','vegas',2);

--view all the data within the table SELECT * from table_name;

SELECT * from restaurants;

--view specific data within the table SELECT COL_NAME_1 COL_NAME_2 from table_name;

SELECT name,price_range from restaurants;

DROP TABLE restaurants;

Add autoincrement feature to the id, add NOT NUll constraint to all the columns, add price_range check 

CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <=5)
);


INSERT INTO restaurants(name,location,price_range) VALUES ('macdonalds','new york',3);

INSERT INTO restaurants(name,location,price_range) VALUES ('pizza hut','vegas',2);


//create a row and to return the created row

INSERT INTO restaurants(name,location,price_range) VALUES ('Taco Bell','denver',3) returning *;

//update a row

UPDATE restaurants SET name = 'red lobseter', location = 'dallas', price_range = 2 WHERE id = 5;

//Delete a restaurant

DELETE FROM restaurants WHERE id = 5;


CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL references restaurants(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <=5)
);


INSERT INTO reviews(restaurant_id,name,review,rating) VALUES (1,'vaneesa', 'The restaurant has good aesthetics',5);


