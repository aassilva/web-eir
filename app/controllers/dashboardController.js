const { Unit, Remedy } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      let units;

      if (req.session.user.type === 0) {
        units = await Unit.findAll({
          include: [Remedy],
          where: {
            UserId: req.session.user.id,
          },
        });
      } else {
        units = await Unit.findAll({
          include: [Remedy],
        });
      }

      const { user } = req.session;

      return res.render('dashboard/index', { units, user });
    } catch (err) {
      return next(err);
    }
  },
};
