'use strict';

/**
 * `survey` middleware
 */

module.exports = {
  // Add your own logic here.
  async registerSurvey (ctx) {
    try {      
      const { email, data } = ctx.request.body;      

      const users = await strapi.entityService.findMany('plugin::users-permissions.user', {
        filters: { email }
      });

      const user = users.length > 0 ? users[0] : null;

      if (!user) {
        return ctx.badRequest('Usuario no encontrado');
      }

      const preferences = {
        Activities: data.Activities || [],
        PlaceRating: {
          Historical: data.PlaceRating?.Historical || 0,
          Nature: data.PlaceRating?.Nature || 0,
          Market: data.PlaceRating?.Market || 0,
          Mall: data.PlaceRating?.Mall || 0,
          Show: data.PlaceRating?.Show || 0,
          Religious: data.PlaceRating?.Religious || 0
        },
        Budget: data.Budget || 0,
        BestMoment: data.BestMoment || 0,
        Food: data.Food || [],
        LevelActivity: data.LevelActivity || 0,
        Notification: data.Notification || false
      };      

      strapi.entityService.update("plugin::users-permissions.user", user.id, {
        data: {
          Preferences: JSON.stringify(preferences),
        },
      });

      return ctx.send({ message: 'Encuesta registrada exitosamente' });
    } catch (error) {
      console.log('Error al registrar la encuesta:', error);
      return ctx.badRequest('No se pudo registrar la encuesta');
    }
  }
};
