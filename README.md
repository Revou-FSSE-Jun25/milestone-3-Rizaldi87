[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/oWpYBV3N)

# RevoShop E-Commerce

## Overview

This project is an simple **E-Commerce Web** built using **Next.js** with **TypeScript** and **Tailwind CSS**.  
It provides a platform for all users to browse products, view details, and for admins to manage products including create, update, and delete. The project integrates with a public API (**Platzi Fake Store API**) to fetch product and category data.

<details>
  <summary><strong>🔐 Admin Login Information (Click to Show)</strong></summary>

  <br>
  <p>For admin login use this:</p>

**Email:** rizaldiganteng@example.com  
 **Password:** 123456

</details>

## Features Implemented

| Feature         | Description                                                 | Access    |
| --------------- | ----------------------------------------------------------- | --------- |
| Product Listing | Displays all products with images, price, and category      | All users |
| Product Details | View detailed information for a single product              | All users |
| Search & Filter | Search products by name or filter by category               | All users |
| Add Product     | Create new products with title, price, category, and images | Admin     |
| Edit Product    | Update existing product information                         | Admin     |
| Delete Product  | Remove products from the dashboard                          | Admin     |

## Technologies Used

- **Next.js (App Router)** – Server-side rendering and routing
- **React 18+** – UI components and state management
- **TypeScript** – Type safety for components and API data
- **Tailwind CSS** – Styling and responsive design
- **React Hook Form** – Form management and validation
- **Axios / Fetch API** – Handling HTTP requests
- **API** – [Platzi Fake Store API](https://fakeapi.platzi.com/) for products and categories

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Install Depedency:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:3000 in your browser.

## Screenshots / Demo

### Home Page

![Dashboard](./screenshots/home-page.png)

### Store Page

![Store Page](./screenshots/store-page.png)

### Product Detail

![Product Detail](./screenshots/product-detail.png)

### Cart Page

![Cart Page](./screenshots/cart-page.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

### Add Product

![Add Product](./screenshots/add-product.png)

### Edit Product

![Edit Product](./screenshots/edit-product.png)

## Web URL

you can see the live website from:
[RevoShop](https://milestone-3-rizaldi87.vercel.app/)
