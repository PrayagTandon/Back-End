# Project done by:

- Name: Anoosh Koneru
- Student ID: 101579792
- Email: 101579792@georgebrown.ca

- Name: Prayag Tandon
- Student ID: 101571637
- Email: 101571637@georgebrown.ca

## Ethereum Blockchain Explorer Landing Page

This project is an Ethereum Blockchain Explorer with a landing page that allows users to:

- View all blockchain transactions with pagination.
- Create new Ethereum transfers.
- Retrieve and display block details based on selected addresses.

The backend is built with Node.js and MongoDB, while the frontend is powered by React, Vite, and Tailwind CSS.

## Features

- Transactions Overview: Displays all blockchain transactions with pagination.
- Transfer Creation: Allows users to create a new Ethereum transfer, which is then displayed in the latest blocks.
- Block Details: Allows users to select a block by address and view its details.
- Navigation: Simple routing with links to Transactions, Transfer, and Blocks sections.

## Tech Stack

### Frontend

- React, Vite, Tailwind CSS, Material-UI and CryptoJS

### Backend

- Node.js, Express.js, MongoDB and Mongoose

## API Endpoints

### Transactions

- GET /api/transactions/history - Retrieves all transaction records.
- POST /api/transactions/send - Creates a new transaction and returns a transaction receipt.

### Blocks

- GET /api/blocks/addresses - Fetches a list of unique Ethereum addresses for use in the Blocks component.

## References

- [React Docs](https://react.dev/)
- [MaterialUI Docs](https://mui.com/material-ui/getting-started/)
- [Tailwind CSS - Docs](https://tailwindcss.com/docs/installation)
- [Pagination Tutorial - Youtube](https://www.youtube.com/watch?v=wAGIOCqS8tk)
- [React Crash Course - Youtube](https://www.youtube.com/watch?v=LDB4uaJ87e0&t=22s)
- [MongoDB Docs](https://www.mongodb.com/docs/manual/)
- [ExpressJS Docs](https://expressjs.com/en/guide/routing.html)
