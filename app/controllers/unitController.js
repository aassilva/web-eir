const { Unit, Remedy } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      if (req.session.user.type !== 0) {
        req.flash('error', 'Não autorizado');
        return res.redirect('/');
      }

      const unit = await Unit.create({
        ...req.body,
        UserId: req.session.user.id,
      });

      req.flash('success', 'Unidade criada com sucesso');

      return res.redirect(`/app/units/${unit.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { user } = req.session;

      let units = [];

      if (user.type === 0) {
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

      const remedies = await Remedy.findAll({
        where: { UnitId: req.params.id },
      });

      return res.render('units/show', {
        units,
        remedies,
        activeUnit: req.params.id,
        user,
      });
    } catch (err) {
      return next(err);
    }
  },
};
