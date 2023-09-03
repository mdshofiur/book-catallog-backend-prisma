# book-catalog-backend-prisma

## Live Link: https://book-catallog-backend-prisma-beta.vercel.app

### Application Routes:

#### User

* api/v1/auth/signup (POST)

* api/v1/auth/signin (POST)

* api/v1/users (GET)

* api/v1/users/0b733e88-6733-48d6-8b44-3a81fc5acc49 (Single GET) 
Include an id that is saved in your database

* api/v1/users/0b733e88-6733-48d6-8b44-3a81fc5acc49 (PATCH)

* api/v1/users/0b733e88-6733-48d6-8b44-3a81fc5acc49 (DELETE)
Include an id that is saved in your database

* api/v1/profile (GET)

#### Category

* api/v1/categories/create-category (POST)

* api/v1/categories (GET)

* api/v1/categories/e0d2bed2-b0d3-46a8-9ff3-67a1b74bb8a3 (Single GET)
Include an id that is saved in your database

* api/v1/categories/e0d2bed2-b0d3-46a8-9ff3-67a1b74bb8a3 (PATCH)

* api/v1/categories/e0d2bed2-b0d3-46a8-9ff3-67a1b74bb8a3 (DELETE) 
Include an id that is saved in your database

#### Books

* api/v1/books/create-book (POST)

* api/v1/books (GET)

* api/v1/books/e0d2bed2-b0d3-46a8-9ff3-67a1b74bb8a3/category (GET)

* api/v1/books/e2ceac4b-23e9-4a3c-86da-cd8d5d65aac4 (GET)

* api/v1/books/e2ceac4b-23e9-4a3c-86da-cd8d5d65aac4 (PATCH)

* api/v1/books/e2ceac4b-23e9-4a3c-86da-cd8d5d65aac4 (DELETE)

#### Orders

* api/v1/orders/create-order (POST)

* api/v1/orders (GET)

* api/v1/orders/customer (GET)  (Only allow for customer)

* api/v1/orders/a581b60a-c55b-4444-b416-8f81ccec5207 (GET)

#### Bonus Part:

* api/v1/profile (Get)




