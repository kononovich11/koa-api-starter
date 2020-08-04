const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const ENUM = ["novel", "poem", "fantasy"];

const schema = Joi.object({
      _id: Joi.string().required(),
      title: Joi.string().required(),
      genre: Joi.string().valid(...ENUM),
});

async function handler(ctx) {
  const data = ctx.validatedData; 
  console.log(data);
  await writerService.update({ _id:ctx.params.id}, (doc) => {
    doc.books.push(data);
    return doc;
    });
}

module.exports.register = (router) => {
  router.post('/:id', validate(schema), handler);
};
