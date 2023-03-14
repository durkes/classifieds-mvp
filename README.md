# Project Outline

### Overview
This online marketplace SPA web app allows users to buy and sell used cars locally.  A visitor can shop by price, mileage, year, and type of vehicle. Sellers can list their car details for potential buyers to see. The project could easily be modified for other types of products such as apartment/home rentals, etc.

### Technologies
 - Node.js w/ Express.js web server
 - OAuth2 for Google/Twitter login or create an account
 - PocketBase SQLite for the database
 - Vite for React w/ Tailwind CSS for building the frontend
 - React Query + Axios for API calls
 - JavaScirpt, JSX, HTML, CSS, Sass, SQL
 - Deploy to CentOS behind Cloudflare

### Features
- User login: Users can create an account, log in, and change their password (or sign in w/ Google, Twitter)
- Post ads: Authenticated users can create a listing to sell their car with details and photos. They can delete their listing once sold.
- Filter/sort: Visitors and users can filter and sort listings by price, year, mileage, and type of vehicle
- Favorites: Authenticated users can save their favorite listings (TODO)