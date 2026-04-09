 # Invoice Generator App

 # Overview
This project is a full-stack invoice generator that allows users to create and view invoices. 
It uses a Node.js and Express backend API along with a frontend interface for submitting and displaying invoice data.

 # Features
Create invoices using a form
- View and print invoices on a separate page
- Backend API using Express (GET and POST)
- Input validation to prevent invalid submissions
- Invoice calculations including hours worked, tax, and total
- Responsive design using CSS media queries
- Custom time formatting function

 # Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js

 # API Endpoints

- `POST /api/invoices` – Create a new invoice
- `GET /api/invoices` – Retrieve all invoices
- `GET /api/invoices/:id` – Retrieve a single invoice

 # How to Run
## Setup Instructions

### 1. Clone the repository

- `git clone https://github.com/chrisdengel/invoice-maker.git`

- `cd invoice-maker`

## 2. Install dependencies:

`npm install`

## 3. Set up environment variables

Check for a `.env.example` file:

- `ls -a`

If you see `.env.example`, run:

- `cp .env.example .env`

If not, create `.env` manually:

- `touch .env`

Then add:

`PORT=8000`

## 4. Start server:

`npm run dev`

## 5. Open in browser:

`http://localhost:8000`








