# EventFinder
EventFinder is a web application designed to help users discover and save events based on their city or specific artists. All events are tied to a 3rd party ticket system, 
allowing users to search for events, save them for later, and filter results to find exactly what they're looking for.

Demo: https://christianpng.github.io/Portfolio-Website/#/EventFinder

## Features
Search Events: Find events by city or artist.
Search Artists: Discover events by searching for specific artists.
Save Events: Users can save events for later viewing.
Login/Sign Up: Users can create accounts to save and manage their events.

## Tech Stack
Backend: Spring Boot, Java
Frontend: React, JavaScript, Axios
Database: SQL
API Integration: Ticketmaster API

## Installation and Setup
Prerequisites
Node.js and npm installed
Java and Spring Boot set up
SQL database setup
VS Code with extensions for running code

## Steps to Run Locally
A local copy won't be enough to handle login feature as that requires my database to be connected

- Clone the repository
- cd backend
  - have java JDK setup
  - run the application to start the server
- cd frontend
  - npm install all dependencies
  - npm run dev to start the frontend

## APIs and Endpoints
Ticketmaster API:
The backend handles API calls to Ticketmaster and serves the data to the frontend.

## Database Schema
Users Table: Stores user account information.
Events Table: Stores event details.
UserEvents Table: Junction table to manage the many-to-many relationship between users and events.
