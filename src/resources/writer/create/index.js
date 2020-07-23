const Joi = require('@hapi/joi');

// const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');


async function handler(ctx) {
  console.log(ctx.request.body);
  await writerService.create([ctx.request.body]);
}



module.exports.register = (router) => {
  router.post('/',  handler);
};