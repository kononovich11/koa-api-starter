const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const ENUM = ["novel", "poem", "fantasy"];

const schema = Joi.object({
  books: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(),
      title: Joi.string().required(),
      genre: Joi.string().valid(...ENUM),
    })
  )
});

async function handler(ctx) {
  const data = ctx.validatedData; 
  console.log(data);
  await writerService.update({ _id:ctx.params.id}, (doc) => {
      doc.books = ctx.request.body;
      return doc;
    });
}

module.exports.register = (router) => {
  router.put('/putBook/:id', validate(schema), handler);
};
