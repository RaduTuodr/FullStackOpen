const express = require('express')
const app = express()
app.use(express.json())

const Person = require('./models/people')

const PORT = 3001 || process.env.PORT

const errorHandler = (error, response, request, next) => {

    if (error.name === "CastError") {
        return response.status(400).send({error:"malformatted id"})
    }

    next(error)
}

app.use(errorHandler)

app.post('/api/phonebook', (request, response) => {

    const body = request.body

    if (body.name === undefined || body.number === undefined)
        return response.status(404).json({error:"Undefined request body"})

    const person = new Person({
        name: body.name,    
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/api/phonebook', (request, response, next) => {

    Person.find().then(data => {

        response.status(200).json(data)
    })
    .catch(error => next(error))
})

app.get('/api/phonebook/:id', (request, response) => {

    Person.findById(request.params.id).then(person => {
        if (person)
            response.json(person)
        else
            response.status(404).end
    })
    .catch(error => next(error))
})

app.put('/api/phonebook/:id', (request, response) => {

    const body = request.body

    const newPerson = {
        name: body.name,
        number: body.number
    }
    console.log(newPerson)

    Person.findByIdAndUpdate(request.params.id, newPerson).then(person => {
 
        if (person) {
            console.log(person)
            response.json(newPerson)
        }
        else
            response.status(204).end()
    })
})

app.delete('/api/phonebook/:id', (request, response, next) => {

    Person.findByIdAndDelete(request.params.id).then(data => {
        
        response.status(204).end()
    })
    .catch(error => {
        next(error)
    })
})

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`)
})