const { User, Appointment } = require('../models')
const moment = require('moment')
const { Op } = require('sequelize')

class DashboardController {
  async index (req, res) {
    if (req.session.user && req.session.user.provider) {
      return res.render('dashboardProvider')
    } else {
      const providers = await User.findAll({ where: { provider: true } })
      return res.render('dashboard', { providers })
    }
  }
  async period (req, res) {
    if (req.params.period === 'month') {
      const appointments = await Appointment.findAll({
        where: {
          provider_id: req.session.user.id
        }
      }).map(appointment => {
        return {
          month: moment(appointment.date).format('MMMM'),
          day: moment(appointment.date).format('DD'),
          year: moment(appointment.date).format('YYYY'),
          date: moment(appointment.date).format('YYYY-MM-DD')
        }
      })
      return res.render('appointments/providerDay.njk', { appointments })
    }
    if (req.params.period === 'day') {
      const appointments = await Appointment.findAll({
        include: [{ model: User, as: 'user' }],
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.between]: [
              moment(req.query.date).startOf('day'),
              moment(req.query.date).endOf('day')
            ]
          }
        }
      }).map(appointment => {
        console.log('=>>>>>', moment(appointment.date).format('YYYY-MM-DD'))
        return {
          name: appointment.user.name,
          hour: moment(appointment.date).format('HH:mm'),
          avatar: appointment.user.avatar
        }
      })
      return res.render('appointments/providerToday.njk', { appointments })
    }
    if (req.params.period === 'today') {
      const appointments = await Appointment.findAll({
        include: [{ model: User, as: 'user' }],
        where: {
          provider_id: req.session.user.id,
          date: {
            [Op.between]: [
              moment(req.query.date).startOf('day'),
              moment(req.query.date).endOf('day')
            ]
          }
        }
      }).map(appointment => {
        return {
          name: appointment.user.name,
          date: moment(appointment.date).format('HH:mm'),
          avatar: appointment.user.avatar
        }
      })
      return res.render('appointments/providerToday.njk', { appointments })
    }
    return res.render('notFound.njk')
  }
}

module.exports = new DashboardController()
