const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const { v4: uuidv4 } = require('uuid');

const ENUM = ['novel', 'poem', 'fantasy'];

const schema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().valid(...ENUM),
});

async function handler(ctx) {
  const data = ctx.validatedData;
  const id = uuidv4();
  data._id = id;
  await writerService.atomic.update({ _id: ctx.params.id },
    {
      $push: {
        books: data,
      },
    });
  ctx.response.body = await writerService.findOne({ _id: ctx.params.id });
}

module.exports.register = (router) => {
  router.post('/:id', validate(schema), handler);
};
