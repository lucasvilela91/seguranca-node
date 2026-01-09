const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute')
const usuarios = require('./usuariosRoute')
const auth = require('./authRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),
    produto,
    usuarios,
    auth
  )
}
