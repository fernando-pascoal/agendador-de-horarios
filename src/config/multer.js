const path = require('path') // obtem o final do nome após ponto, extenção
const crypto = require('crypto') // retorna uma string aleatória
const multer = require('multer') // pega o arquivo do form e 'salva'

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err)
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
