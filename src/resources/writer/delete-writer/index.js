const Joi = require('@hapi/joi');

// const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');


async function handler(ctx) {
  await writerService.remove(ctx.request.body);
}



module.exports.register = (router) => {
  router.delete('/',  handler);
};