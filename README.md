# Task & Project Management Board

A full-stack Kanban task management application built with React, Vite, Java, Spring Boot, and PostgreSQL.

## Features

- Create, edit, and delete tasks
- Organize tasks into Todo, In Progress, and Done
- REST API integration
- PostgreSQL persistence
- Input validation and API error handling
- Responsive React interface

## Technology Stack

- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Java 17+, Spring Boot 3, Maven, Spring Data JPA
- **Database:** PostgreSQL
- **API:** REST, JSON, HTTP

## Prerequisites

Install Java 17+, Maven (or use the Maven wrapper), Node.js, npm, and PostgreSQL.

## 1. Configure PostgreSQL

Create a database named `taskboard_db` and a user named `taskboard_user`. Configure the database credentials through environment variables or `application.properties`.

## 2. Run the backend

```bash
cd backend
mvn spring-boot:run
```

The REST API runs at `http://localhost:8080/api/tasks`.

## 3. Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/{id}` | Get one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/{id}` | Update a task |
| DELETE | `/api/tasks/{id}` | Delete a task |

## Task Status Values

`TODO`, `IN_PROGRESS`, `DONE`

## Architecture

React components communicate through a centralized API service. Spring Boot exposes REST endpoints, the service layer handles business operations, Spring Data JPA manages persistence, and PostgreSQL stores the task records.

## Future Enhancements

- JWT authentication and role-based access
- Projects and team collaboration
- Due dates, priorities, and task filtering
- Automated backend and frontend tests
- Docker-based deployment and CI/CD

## Security Note

This project is a portfolio-ready development foundation, not a fully security-hardened production deployment. Configure secrets securely, add authentication and authorization, apply database migrations, and restrict CORS before exposing it publicly.