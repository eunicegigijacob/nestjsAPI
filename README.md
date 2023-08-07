````markdown
# Nestjs API

This is a Books Management API it is a RESTful web service built with Nest.js, using a MySQL database with TypeORM for managing a collection of books. It provides endpoints to retrieve, create, update, and delete books in the collection.

## Getting Started

To run the Books Management API locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/eunicegigijacob/nestjsAPI
```
````

2. Install dependencies:

```bash
npm install
```

3. Set up the MySQL database:

   - Create a new MySQL database with a name of your choice, make sure to add name in env file .
   - Configure the database connection in the `.env` file. Copy the `.env.example` file to `.env` and update the following variables:

   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_DATABASE=books_db
   ```

4. Start the development server:

```bash
npm run start:dev
```

The API should now be running at `http://localhost:3000`.

## Endpoints

All endpoints are prefixed with `/api`.

### Retrieve all books

- **URL:** `/api/books`
- **Method:** GET
- **Response:** Returns an array of all the books in the collection.

### Retrieve a specific book

- **URL:** `/api/books/:id`
- **Method:** GET
- **URL Parameters:** `id` (number) - The ID of the book to retrieve.
- **Response:** Returns the details of the book matching the provided ID.

### Add a new book

- **URL:** `/api/books`
- **Method:** POST
- **Request Body:** Should contain the book details in JSON format.
  ```json
  {
    "title": "Book Title",
    "author": "Book Author"
  }
  ```
- **Response:** Returns the newly created book object.

### Update an existing book

- **URL:** `/api/books/:id`
- **Method:** PUT
- **URL Parameters:** `id` (number) - The ID of the book to update.
- **Request Body:** Should contain the updated book details in JSON format.
  ```json
  {
    "title": "Updated Book Title",
    "author": "Updated Book Author"
  }
  ```
- **Response:** Returns the updated book object.

### Delete a book

- **URL:** `/api/books/:id`
- **Method:** DELETE
- **URL Parameters:** `id` (number) - The ID of the book to delete.
- **Response:** Returns a success message if the book was successfully deleted.

## Error Handling

The API handles various error scenarios and provides appropriate HTTP status codes and error messages. For example, if a book with the given ID is not found, the API will return a 404 Not Found status code with the message "Book not found."

## Testing

The API is thoroughly tested using the Jest testing framework. To run the tests, use the following command:

```bash
npm run test
```
