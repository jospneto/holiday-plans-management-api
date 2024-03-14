require('dotenv').config()

const ROOT_USER = process.env.DB_ROOT_USER
const PASSWORD = process.env.DB_PASSWORD
const PORT = process.env.PORT

module.exports = { ROOT_USER, PASSWORD, PORT }


