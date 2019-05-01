module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'postgres',
  password: '123456',
  database: 'barbershop',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
