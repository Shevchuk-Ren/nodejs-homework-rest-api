const { NotFound } = require('http-errors')
const express = require('express')
const router = express.Router()

const contactsOperations = require('../../model')
const { contactSchema } = require('../../schemas')

// GET api/contacts
router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error'
    })
  }
}) // change something

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      // пишем вручную
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Not found ${contactId}`
      // })
      // return
      // делаю динамической ошибку, которая передается в app (app.use((err, req, res, next))
      // const error = new Error(`Not found contact with id: ${contactId}`)
      // error.status = 404
      // throw error
      // вариант с пакетом http-errors
      throw new NotFound(`Not found contact with id: ${contactId}`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
    // res.status(500).json({
    //   status: 'error',
    //   code: 500,
    //   message: 'Server error'
    // })
  }
})
// POST api/contacts
router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
      throw new NotFound(`Not found contact with id: ${contactId}`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
      data: {
        result: result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.updateContact(contactId, req.body)
    if (!result) {
      throw new NotFound(`Not found contact with id: ${contactId}`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact changed',
      data: {
        result: result
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
