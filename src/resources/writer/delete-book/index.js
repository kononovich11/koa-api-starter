const Joi = require('@hapi/joi');


const writerService = require('resources/writer/writer.service');


async function handler(ctx) {
  console.log(ctx.params.idWriter);
  console.log(ctx.params.idWriter);
  await writerService.atomic.update(
    {_id: ctx.params.idWriter}, 
    {$pull: {books: { _id:ctx.params.idBook }}}
    );
    ctx.body = await writerService.find({_id: ctx.params.idWriter});
}

module.exports.register = (router) => {
  router.delete('/:idWriter/:idBook',  handler);
};