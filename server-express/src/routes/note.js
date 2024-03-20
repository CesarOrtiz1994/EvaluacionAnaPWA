const express = require('express')
const noteSchema = require('../models/note')
const note = require('../models/note')

const router = express.Router()


//Crear note
router.post('/note', (req, res) => {
    const note = noteSchema(req.body)
    note.save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})
//Obtener note
router.get('/note', (req, res) => {
    noteSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
})



//Exportar el modulo
module.exports = router