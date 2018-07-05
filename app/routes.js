const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const unitController = require('./controllers/unitController');
const remedyController = require('./controllers/remedyController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get(('/'), guestMiddleware, authController.signin);
routes.get(('/signup'), guestMiddleware, authController.signup);
routes.get(('/signout'), authController.signout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

routes.use('/app', authMiddleware);
routes.get('/app/dashboard', dashboardController.index);

routes.get('/app/units/:id', unitController.show);
routes.post('/app/units/create', unitController.store);

routes.get('/app/units/:unitId/remedies/:id', remedyController.show);
routes.post('/app/units/:unitId/remedies/create', remedyController.store);
routes.put('/app/units/:unitId/remedies/:id', remedyController.update);
routes.delete('/app/units/:unitId/remedies/:id', remedyController.destroy);

routes.use((req, res) => res.render('errors/404'));

routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

module.exports = routes;
