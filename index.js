const express = require('express')
const morgan = require('morgan')
const { request, response } = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


// const requestLogger = (req, res, next) => {
//     console.log('Method:', req.method)
//     console.log('Path:  ', req.path)
//     console.log('Body:  ', req.body)
//     console.log('---')
//     next()
//   }
  
//   const unknownEndpoint = (req, res) => {
//     res.status(404).send({ error: 'unknown endpoint' })
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
  app.get('/api/persons', (req, res) => {
      return res.send(persons)
  })

//Get information about single id
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        res.json(person)
    }
    else {
        res.status(404).send('Requested resource not found')
    }
})

//Info
const len = persons.length
var d = new Date("2020-08-13");

app.get('/info', (req, res) => {
    return res.send(`<strong>Phonebook has info for ${len} people <br /> <br /> ${d}</strong>`)
})

//Post
const generateId = () => {
    const maxId = persons.length > 0 ? Math.floor(Math.random() * 1000) : 0
    return maxId;
}

app.post('/api/persons', (req, res) => {
    const body = req.body;
    //check for missing name and number
    if(!body.name || !body.number) {
        return res.status(400).json(
            {
                error: 'Either Name or Number is missing'
            }
        )
    }
    //Error handling for the hardcoded list of object
    for (let i = 0; i < persons.length; i++) {
        if(persons[i].name === req.body.name) {
            return res.status(409).json(
                {
                    error: 'Name must be unique'
                }
            )
        }
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons.concat(person)

    res.json(person)
})

//Delete
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.filter(person => person.id === id)
    res.status(204).end()
})

//morgan('tiny')
// app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


