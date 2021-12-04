const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()

  const result = contacts.find(item => item.id.toString() === contactId)

  return result
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(contact => contact.id.toString() === contactId)

  if (index === -1) {
    return null
  };

  const newContacts = contacts.filter((_, idx) => idx !== index)
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))
  return contacts[index]
}

const addContact = async (body) => {
  const contacts = await listContacts()
  console.log(body)
  const newObjContact = {
    id: uuidv4(),
    name: body.name,
    email: body.email,
    phone: body.phone
  }
  contacts.push(newObjContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newObjContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const { name, email, phone } = body
  console.log(name)
  const index = contacts.findIndex(contact => contact.id.toString() === contactId)

  if (index === -1) {
    return null
  };
  contacts[index] = {
    id: contactId,
    name,
    email,
    phone
  }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
