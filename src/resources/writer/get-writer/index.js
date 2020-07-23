const Joi = require('@hapi/joi');

const writerService = require('resources/writer/writer.service');



async function handler(ctx) {

  const writer = await writerService.findOne({_id: ctx.params.id});
  console.log(writer);
}



module.exports.register = (router) => {
  router.get('/get/:id',  handler);
};