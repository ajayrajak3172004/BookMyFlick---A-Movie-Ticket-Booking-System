# BookMyFlick - Movie Ticket Booking Platform

## Live Demo

🔗 Live Application: https://bookmyflick-rho.vercel.app/

## Overview

BookMyFlick is a full-stack movie ticket booking platform built using the MERN stack. The application allows users to browse movies, select show timings, choose seats with real-time availability, and securely book tickets online. It also includes an admin dashboard for managing movies, shows, bookings, and revenue analytics.

---

## Features

### User Features

* User registration and login
* Browse available movies and show timings
* Real-time seat availability tracking
* Interactive seat selection
* Secure online ticket booking
* Booking history and ticket details
* Responsive design for desktop and mobile

### Admin Features

* Add, edit, and delete movies
* Manage show schedules and timings
* Monitor bookings and ticket sales
* View revenue and booking analytics
* Manage platform content through a dedicated dashboard

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB
* Mongoose

### Authentication & Payments

* OAuth 2.0
* JWT Authentication
* Stripe Payment Gateway

---

## System Architecture

User → React Frontend → Express REST APIs → MongoDB

Admin → Dashboard → Express REST APIs → MongoDB

Stripe ↔ Backend ↔ Booking System

---

## Installation

### Clone Repository

```bash
git clone https://github.com/ajayrajak3172004/BookMyFlick---A-Movie-Ticket-Booking-System
cd BookMyFlick
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000
```

### Run Backend

```bash
npm run server
```

### Run Frontend

```bash
npm start
```

---

## Key Features Implemented

### Real-Time Seat Management

* Dynamically updates seat availability during the booking process.
* Prevents double-booking conflicts and improves booking accuracy.

### Secure Payments

* Integrated Stripe payment gateway for secure and reliable transactions.
* Automated booking confirmation after successful payment.

### Admin Dashboard

* Manage movies, theatres, and show schedules.
* Track bookings and revenue metrics through a centralized dashboard.

---

## Challenges Faced

* Handling concurrent seat booking requests.
* Synchronizing seat availability in real time.
* Integrating secure payment workflows.
* Designing scalable APIs for movie and booking management.

---

## Key Learnings

* Full-stack application architecture using MERN.
* REST API development and integration.
* Payment gateway integration with Stripe.
* Authentication and authorization using OAuth 2.0 and JWT.
* Database design for booking and transaction systems.

---

## Future Improvements

* Movie recommendations using AI
* QR-code based ticket verification
* Email and SMS ticket notifications
* Multi-theatre support
* Refund and cancellation management
* Dynamic pricing system

---

## Links

* Live Demo: https://bookmyflick-rho.vercel.app/
* GitHub Repository: https://github.com/ajayrajak3172004/BookMyFlick---A-Movie-Ticket-Booking-System

---

## Author

**Ajay Rajak**

B.Tech Mathematics and Computing Engineering

Madhav Institute of Technology and Science (MITS), Gwalior
