## 📋 Overview

The **Bus Reservation System** is a complete solution for managing bus booking services.

* **Customer Web Application**: Search bus routes, make reservations, and generate quotations
* **Admin Dashboard**: Manage bus operations, schedules, and quotation records
* **RESTful API**: A robust backend built with Spring Boot

---

## ✨ Features

### Customer Features

* 🚌 Search and browse bus routes
* 📅 Check schedules and make reservations
* 📝 3-step reservation form (departure, destination, bus selection)
* 💬 Input contact information
* 📄 Generate and view quotations
* 🔍 Real-time search functionality

---

### Admin Features

* 🎛️ Dashboard: statistics and monitoring
* 🚌 Bus information management
* 📅 Schedule management
* 💰 Quotation management and tracking
* 🔐 Role-Based Access Control (RBAC)

---

## 🛠️ Tech Stack

### Backend

* **Language**: Java 17
* **Framework**: Spring Boot 4.0.1
* **Database**: PostgreSQL
* **ORM**: JPA/Hibernate
* **Security**: Spring Security + JWT Authentication
* **Build Tool**: Gradle
* **Additional Libraries**:

  * Lombok (reduces boilerplate code)
  * JWT (jjwt 0.11.5)
  * Validation

---

### Frontend (Customer)

* **Framework**: React 19
* **Build Tool**: Vite
* **Routing**: React Router v7
* **State Management**: Zustand
* **UI Components**: React Bootstrap
* **Styling**: Bootstrap 5, Tailwind CSS
* **HTTP Client**: Axios

---

### Frontend Admin (Management)

* **Framework**: React 19
* **Build Tool**: Vite
* **Routing**: React Router v7
* **Styling**: Tailwind CSS
* **UI Components**: Headless UI
* **HTTP Client**: Axios

---

## 📦 Installation

### Prerequisites

* Java 17 or higher
* Node.js 18 or higher
* PostgreSQL 14 or higher
* Gradle (included via wrapper)

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Configure the database (application.properties)
# - Update PostgreSQL connection settings

# 3. Install dependencies and build
./gradlew build

# 4. Run the server
./gradlew bootRun
```
