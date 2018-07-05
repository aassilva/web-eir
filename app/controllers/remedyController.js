const { Unit, Remedy } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      if (req.session.user.type !== 0) {
        req.flash('error', 'Não autorizado');
        return res.redirect('/');
      }

      const { unitId } = req.params;

      const remedy = await Remedy.create({
        ...req.body,
        UnitId: unitId,
      });

      req.flash('success', 'Medicamento criado com sucesso');

      return res.redirect(`/app/units/${unitId}/remedies/${remedy.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { unitId, id } = req.params;
      const { user } = req.session;

      let units = [];

      if (user.type === 0) {
        units = await Unit.findAll({
          include: [Remedy],
          where: {
            UserId: user.id,
          },
        });
      } else {
        units = await Unit.findAll({
          include: [Remedy],
        });
      }

      const remedies = await Remedy.findAll({
        where: { UnitId: unitId },
      });

      const remedy = await Remedy.findById(id);

      return res.render('remedies/show', {
        activeUnit: unitId,
        units,
        remedies,
        currentRemedy: remedy,
        user,
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      if (req.session.user.type !== 0) {
        req.flash('error', 'Não autorizado');
        return res.redirect('/');
      }

      const remedy = await Remedy.findById(req.params.id);

      await remedy.update(req.body);

      req.flash('success', 'Medicamento atualizado com sucesso');

      return res.redirect(`/app/units/${req.params.unitId}/remedies/${remedy.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      if (req.session.user.type !== 0) {
        req.flash('error', 'Não autorizado');
        return res.redirect('/');
      }

      await Remedy.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Medicamento removido com sucesso');

      return res.redirect(`/app/units/${req.params.unitId}`);
    } catch (err) {
      return next(err);
    }
  },
};
