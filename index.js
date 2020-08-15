const express = require('express')
const morgan = require('morgan')
const { request, response } = require('express')
require('dotenv').config()
const PhoneBook = require('./models/person')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
// app.use(morgan('tiny'))
// morgan.token('body', function (request, response) { return JSON.stringify(request.body) });
// app.use(morgan(':method :url :status :response[content-length] - :response-time ms :body'));


// const requestLogger = (req, response, next) => {
//     console.log('Method:', req.method)
//     console.log('Path:  ', req.path)
//     console.log('Body:  ', req.body)
//     console.log('---')
//     next()
//   }
  
//   const unknownEndpoint = (req, response) => {
//     response.status(404).send({ error: 'unknown endpoint' })
//   }

//   app.use(requestLogger)

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-44-5323523"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-5323523"
    }
  ]

  //Get
  app.get('/api/phonebooks', (request, response) => {
     PhoneBook.find({}).then(phonebooks => {
         response.json(phonebooks.map(phonebook => phonebook.toJSON()))
     })
  })

//Get information about single id
app.get('/api/phonebooks/:id', (request, response) => {
Person.findById(request.params.id).then(phonebook =>{
    response.json(phonebook.toJSON())
})
})

//Info
// const len = phonebook.length
// var d = new Date("2020-08-13");

// app.get('/info', (request, response) => {
//     return response.send(`<strong>Phonebook has info for ${len} people <br /> <br /> ${d}</strong>`)
// })

//Post
const generateId = () => {
    const maxId = phonebook.length > 0 ? Math.floor(Math.random() * 1000) : 0
    return maxId;
}

app.post('/api/phonebooks', (request, response) => {
    const body = request.body;
    //check for missing name and number
    if(body.name === undefined) {
        return response.status(400).json(
            {
                error: 'name-missing'
            }
        )
    }
    const phonebooks  = new PhoneBook({
        name: body.name,
        phone: body.phone
    })
    phonebooks.save().then(phonebook => {
        response.json(phonebook.toJSON())
    })
})

//Delete
app.delete('/api phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    const phonebook = phonebook.filter(person => person.id !== id)
    response.status(204).end()
})

//morgan('tiny')
// app.use(unknownEndpoint)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
