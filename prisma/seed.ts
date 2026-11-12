
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create the genres
  const genres = [
    'Fiction',
    'Science',
    'Fantasy',
    'History',
  ];

  const createdGenres = await Promise.all(
    genres.map((name) =>
      prisma.genre.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  // 2. Create the books
  const books = [
    // Fiction
    { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '9780385474542', genre: 'Fiction' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genre: 'Fiction' },
    { title: 'Jane Eyre', author: 'Charlotte Bronte', isbn: '9780141441146', genre: 'Fiction' },
    { title: 'Animal Farm', author: 'George Orwell', isbn: '9780451526342', genre: 'Fiction' },

    // Science
    { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', genre: 'Science' },
    { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780345539434', genre: 'Science' },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '9780198788607', genre: 'Science' },
    { title: 'The Gene', author: 'Siddhartha Mukherjee', isbn: '9781476733524', genre: 'Science' },

    // Fantasy
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', genre: 'Fantasy' },
    { title: 'Harry Potter and the Philosopher’s Stone', author: 'J.K. Rowling', isbn: '9780747532699', genre: 'Fantasy' },
    { title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', isbn: '9780547928210', genre: 'Fantasy' },
    { title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis', isbn: '9780064471046', genre: 'Fantasy' },

    // History
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', genre: 'History' },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '9780553296983', genre: 'History' },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '9780393354324', genre: 'History' },
    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', isbn: '9780316548182', genre: 'History' },
  ];

  // 3. Insert books and connect each to its genre
  for (const book of books) {
    const genre = createdGenres.find(
      (item) => item.name === book.genre,
    );

    if (!genre) {
      throw new Error(`Genre not found: ${book.genre}`);
    }

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {
        title: book.title,
        author: book.author,
        genreId: genre.id,
      },
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        genreId: genre.id,
      },
    });
  }

  console.log('Database seeded successfully!');
  console.log(`Genres created: ${createdGenres.length}`);
  console.log(`Books inserted or updated: ${books.length}`);
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
