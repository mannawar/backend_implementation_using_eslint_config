const express = require('express')
//const morgan = require('morgan')
//const { request, response } = require('express')
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

// let persons = [
//   {
//     id: 1,
//     name: 'Arto Hellas',
//     number: '040-123456'
//   },
//   {
//     id: 2,
//     name: 'Ada Lovelace',
//     number: '39-44-5323523'
//   },
//   {
//     id: 3,
//     name: 'Dan Abramov',
//     number: '12-44-5323523'
//   },
//   {
//     id: 4,
//     name: 'Mary Poppendieck',
//     number: '39-23-5323523'
//   }
// ]

//Get information about single id
app.get('/api/phonebooks/:id', (request, response) => {
  PhoneBook.findById(request.params.id).then(phonebook => {
    response.json(phonebook.toJSON())
  })
})

//Info
app.get('/api/phonebooks', (request, response) => {
  PhoneBook.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})
// const len = phonebook.length
// var d = new Date("2020-08-13");

// app.get('/info', (request, response) => {
//     return response.send(`<strong>Phonebook has info for ${len} people <br /> <br /> ${d}</strong>`)
// })

//Post
// const generateId = () => {
//     const maxId = phonebook.length > 0 ? Math.floor(Math.random() * 1000) : 0
//     return maxId;
// }

app.post('/api/phonebooks', (request, response) => {
  const body = request.body
  //check for missing name and number
  if(body.name === undefined) {
    return response.status(400).json(
      {
        error: 'name-missing'
      }
    )
  }
  else if(body.name === PhoneBook.find({})) {
    return response.status(409).json({ error: 'The request could not be completed due to a conflict with the current state of the resource' })
  }
  else{
    const phonebooks  = new PhoneBook({
      name: body.name,
      phone: body.phone
    })
    phonebooks.save().then(phonebook => {
      response.json(phonebook.toJSON())
    })
  }

})

//Put//update
app.put('/api/phonebooks/:id', (request, response, next) => {
  const body = request.body
  const phonebook = {
    name: body.name,
    phone: body.phone
  }
  PhoneBook.findByIdAndUpdate(request.params.id, phonebook, { new: true })
    .then(updatedPhonebook => {
      response.json(updatedPhonebook.toJSON())
    })
    .catch(error => next(error))
})

//Delete
app.delete('/api/phonebooks/:id', (request, response, next) => {
  PhoneBook.findByIdAndRemove(request.params.id)
    .then(
      response.status(204).end()
    )
    .catch(error => next(error))
})

//morgan('tiny')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//Error Handling
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformed id' })
  }
  return next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
