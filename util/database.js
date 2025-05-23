import Database from 'better-sqlite3'

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS books
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    title STRING,
    author STRING)`).run()

export const getBooks = () => db
.prepare(`SELECT * FROM books`)
.all()

export const getBook = (id) => db
.prepare(`SELECT * FROM books WHERE id = ?`)
.get(id)

export const saveUser = (title, author) => db
.prepare(`INSERT INTO books (title, author) VALUES (?, ?)`)
.run(title, author)

export const deleteBook = (id) => db
.prepare(`DELETE FROM books WHERE id = ?`)
.run(id)

const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
    { id: 4, title: 'Book 4', author: 'Author 4' }
]

//for (const book of books) {
//    db.prepare(`INSERT INTO books (title, author) VALUES (?, ?)`)
//      .run(book.title, book.author)
//}