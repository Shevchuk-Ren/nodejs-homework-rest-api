const { v4: uuidv4 } = require('uuid')
const express = require('express')
const router = express.Router()
const contacts = require('../../model/contacts.json')

// GET api/contacts
router.get('/', async (req, res, next) => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts
    }
  })
}) // change something

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  const result = contacts.find(contact => contact.id.toString() === contactId)

  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Not found ${contactId}`
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
})
// POST api/contacts
router.post('/', async (req, res, next) => {
  const newContact = {
    ...req.body, id: uuidv4()
  }
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: newContact
    }
  })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
