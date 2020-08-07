const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const { v4: uuidv4 } = require('uuid');

const ENUM = ['novel', 'poem', 'fantasy'];

const schema = Joi.object({
  books: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      genre: Joi.string().valid(...ENUM),
    }),
  ),
});

async function handler(ctx) {
  const data = ctx.validatedData;
  data.books.map((item) => {
    const itemBook = item;
    const id = uuidv4();
    itemBook._id = id;
    return itemBook;
  });
  ctx.response.body = data;
  await writerService.atomic.update({ _id: ctx.params.id },
    {
      $set: {
        books: { ...data.books },
      },
    });
}

module.exports.register = (router) => {
  router.put('/putBook/:id', validate(schema), handler);
};
