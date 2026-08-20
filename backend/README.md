# Project Video
https://drive.google.com/file/d/1WmQFQ08_gdiuC19S37w4qL6gtRCs-Gf1/view?usp=drive_link


# WTWR Back End

This is the back-end server for the WTWR (What to Wear?) application.

The server handles:
- user authentication
- JWT-based authorization
- user profile routes
- clothing item routes

It is deployed on a Google Cloud VM and served through Nginx with HTTPS.

## Features

- User signup
- User signin
- Protected routes
- Get all items
- Create items
- Delete items
- Like and unlike items
- PM2 process management
- HTTPS deployment
- Reverse proxy with Nginx

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- PM2
- Nginx
- Google Cloud
- dotenv
- celebrate / joi

## Running Locally

```bash
npm install
npm run dev