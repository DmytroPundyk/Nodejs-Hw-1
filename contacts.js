const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const filePath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(filePath);
  const list = JSON.parse(data);
  return list;
}

async function getContactById(contactId) {
  const list = await listContacts();
  const result = list.find((item) => parseInt(item.id) === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const list = await listContacts();
  const removeIndex = list.findIndex((item) => parseInt(item.id) === contactId);
  if (removeIndex === -1) {
    return null;
  }
  const [removeContact] = list.splice(removeIndex, 1);
  await fs.writeFile(filePath, JSON.stringify(list));
  return removeContact;
}

async function addContact({ name, email, phone }) {
  const list = await listContacts();
  const newContact = { name, email, phone, id: v4() };
  list.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(list));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};