const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');

const ENUM = ['novel', 'poem', 'fantasy'];

const schema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().valid(...ENUM),
});

async function handler(ctx) {
  const data = ctx.validatedData;
  await writerService.atomic.update({ _id: ctx.params.id },
    {
      $push: {
        books: { ...data },
      },
    });
  ctx.response.body = await writerService.findOne({ _id: ctx.params.id });
}

module.exports.register = (router) => {
  router.post('/:id', validate(schema), handler);
};
