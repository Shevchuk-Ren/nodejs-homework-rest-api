const fs = require('fs/promises')

// const contactsPath = require('./contactPath')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  // const contacts = await listContacts()

  // const result = contacts.find(item => item.id.toString() === contactId)

  // return result
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
