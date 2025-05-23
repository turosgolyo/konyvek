import * as db from './util/database.js'
import express from 'express'

const app = express()
const PORT = 8080

app.use(express.json())

app.get('/books', (req, res) => {
    try{
        const books = db.getBooks()
        res.status(200).json(books)
    }
    catch(err){
        res.status(500).json({error: `${err}`})
    }   
})

app.get('/books/:id', (req, res) => {
    const id = +req.params.id
    try{
        const book = db.getBook(id)
        if(!book){
            return res.status(404).json({error: 'Book not found'})
        }
        res.status(200).json(book)
    }
    catch(err){
        res.status(500).json({error: `${err}`})
    }   
})

app.post('/books', (req, res) => {
    try{
        const { title, author } = req.body
        if(!title || !author){
            return res.status(400).json({error: 'Invalid input'})
        }
        const savedBook = db.saveUser(title, author)
        if(!savedBook){
            return res.status(500).json({error: 'Failed to save book'})
        }
        res.status(201).json({id: savedBook.lastInsertRowid})
    }
    catch(err){
        res.status(500).json({error: `${err}`})
    }   
})

app.delete('/books/:id', (req, res) => {
    const id = +req.params.id
    try{
        const deletedBook = db.deleteBook(id)
        if(!deletedBook){
            return res.status(404).json({error: 'Book not found'})
        }
        res.status(204)
    }
    catch(err){
        res.status(500).json({error: `${err}`})
    }   
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})