module.exports = {
  username: process.env.USERNAME || 'root',
  password: process.env.PASSWORD || '123',
  database: process.env.DATABASE || 'eir',
  host: process.env.HOST || 'localhost',
  dialect: process.env.DIALECT || 'mysql',
};
