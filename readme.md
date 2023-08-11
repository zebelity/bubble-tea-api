# Bubble Tea API

Welcome to the Bubble Tea API, a backend service for managing bubble tea menu items and reviews.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Entity Relationship Diagram](#entity-relationship-diagram)
- [Authentication and Authorization](#authentication-and-authorization)


## Introduction

The Bubble Tea API provides a set of endpoints to manage bubble tea menu items and reviews. It allows users to create, read, update, and delete reviews. The API is built to be used as a backend service for a frontend application.

## Features

- Read bubble tea menu items
- Create, read, update, and delete reviews for menu items
- User authentication and authorization
- Get detailed information about menu items and their associated reviews

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

## API Endpoints

The API provides the following endpoints:

- `GET /api/menuItems`: Get a list of all menu items 
- `GET /api/menuItems/:id`: Get detailed information about a specific menu item by ID and reviews
- `POST /api/menuItems/:id/reviews`: Post a new review for a specific menu item.
- `PUT /api/menuItems/:id/reviews/:reviewId`: Update an existing review for a specific menu item.
- `DELETE /api/menuItems/:id/reviews/:reviewId`: Delete a review for a specific menu item.
- `POST /api/login`: Login

## Entity Relationship Diagram

<img width="1328" alt="image" src="/img/ERD.png">

## Authentication and Authorization

The API uses JWT for user authentication and authorization. Users can log in, and obtain a JWT token, which must be included in the `Authorization` header for protected routes.


