## Schema Decisions

### 1. Role Enum

I created a `Role` enum with two possible values: `PATRON` and `LIBRARIAN`.

This ensures that users can only have one of the predefined roles. It also helps maintain consistency in the database.

### 2. User Model

The `User` model stores information about library users, including their ID, name, email, and role.

The email field is unique to prevent multiple users from registering with the same email address.

### 3. Genre Model

The `Genre` model stores book categories such as Fiction, Science, Fantasy, and History.

Each genre has a unique ID and name. One genre can be associated with many books.

### 4. Book Model

The `Book` model stores information about individual books, including their title, author, ISBN, and genre.

The ISBN field is unique to prevent duplicate book records.

### 5. Why Book References Genre

I chose to make `Book` reference `Genre` through a foreign key called `genreId` instead of embedding genre information directly inside each book.

This is because multiple books can belong to the same genre. Storing genres separately avoids repeating genre information in every book record.

It also makes updating and managing genres easier. For example, if a genre name changes, I only need to update the Genre record instead of updating every book belonging to that genre.

The relationship also helps maintain referential integrity because each book must reference an existing genre.

Overall, this relational structure reduces data duplication and makes the database easier to maintain.## Schema Decisions

### 1. Role Enum

I created a `Role` enum with two possible values: `PATRON` and `LIBRARIAN`.

This ensures that users can only have one of the predefined roles. It also helps maintain consistency in the database.

### 2. User Model

The `User` model stores information about library users, including their ID, name, email, and role.

The email field is unique to prevent multiple users from registering with the same email address.

### 3. Genre Model

The `Genre` model stores book categories such as Fiction, Science, Fantasy, and History.

Each genre has a unique ID and name. One genre can be associated with many books.

### 4. Book Model

The `Book` model stores information about individual books, including their title, author, ISBN, and genre.

The ISBN field is unique to prevent duplicate book records.

### 5. Why Book References Genre

I chose to make `Book` reference `Genre` through a foreign key called `genreId` instead of embedding genre information directly inside each book.

This is because multiple books can belong to the same genre. Storing genres separately avoids repeating genre information in every book record.

It also makes updating and managing genres easier. For example, if a genre name changes, I only need to update the Genre record instead of updating every book belonging to that genre.

The relationship also helps maintain referential integrity because each book must reference an existing genre.

Overall, this relational structure reduces data duplication and makes the database easier to maintain.