const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
"mongodb+srv://fullstack:zarien%401008@cluster0.beuwq.mongodb.net/Phonebook?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  phone: String
})

const name = process.argv[3];
const phone = process.argv[4];

const Phonebook = mongoose.model('Phonebook', phoneSchema)

const phonebook = new Phonebook({
  _id: mongoose.Types.ObjectId(),
  name: "Arto Hellas",
  phone: "040-123456"
},
{
  _id: mongoose.Types.ObjectId(),
  name: "Ada Lovelace",
  phone: "39-44-5323523"
},
{
  _id: mongoose.Types.ObjectId(),
  name: "Dan Abramov",
  phone: "12-44-5323523"
},
{
  _id: mongoose.Types.ObjectId(),
  name: "Mary Poppendieck",
  phone: "39-23-5323523"
})

  phoneBook.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })

// else if (process.argv.length === 2) {
//   db.collection.count()
//   .then()
// }

