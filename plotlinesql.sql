Users:

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    createdAt TIMESTAMP WITH TIME ZONE,
    updatedAt TIMESTAMP WITH TIME ZONE,
    username character varying,
    email character varying
);

Orders:

CREATE TABLE "Orders" (
    id serial PRIMARY KEY,
    total_amount numeric,
    order_date timestamp with time zone,
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone,
    user_email character varying
);

Products:

CREATE TABLE "Products" (
    id serial PRIMARY KEY,
    price numeric,
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone,
    name character varying PRIMARY KEY
);

Services:

CREATE TABLE "Services" (
    id serial,
    price numeric,
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone,
    name character varying PRIMARY KEY
);

CartItems:

CREATE TABLE "CartItems" (
    id integer PRIMARY KEY,
    quantity integer,
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone,
    user_email character varying,
    productname character varying REFERENCES "Products"("name"),
    servicename character varying REFERENCES "Products"("name")
);

Admins:

CREATE TABLE "Admins" (
    id integer PRIMARY KEY,
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone,
    username character varying
);
