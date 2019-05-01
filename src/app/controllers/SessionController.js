const { User } = require('../models')

class SessionController {
  async create (req, res) {
    return res.render('auth/signin')
  }

  async store (req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      req.flash('error', 'Usuario não encontrado')
      console.log(req.flash('error'))
      return res.redirect('/')
    }
    if (!(await user.checkPassword(password))) {
      req.flash('erro', 'Senha incorreta')
      return res.redirect('/')
    }

    req.session.user = user

    return res.redirect('app/dashboard')
  }

  destroy (req, res) {
    return req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}
module.exports = new SessionController()
