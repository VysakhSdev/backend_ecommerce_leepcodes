# Leepcode Backend

Backend API for the Leepcode application.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (JWT)
- **File Uploads:** Multer

## Installation

1.  **Install dependencies**

    ```bash
    npm install
    ```

2.  **Environment Variables**

    Create a `.env` file in the root directory and add the necessary configuration. Example:

    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=postgres
    DB_PASSWORD=yourpassword
    DB_NAME=leepcode_db
    JWT_SECRET=your_jwt_secret
    ```
4. **Create your database in PostgreSQL and import the provided clean schema**

   psql -U postgres -d leapcodes_db < ./doc/schema.sql

 5.  **Seed the superadmin data**

    ```bash
    node seeder.js
    ```
6.  **Run the application**
    Development mode:
    ```bash
    npm run dev
    ```

   
