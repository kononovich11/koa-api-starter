const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');

const schema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(15)
    .messages({
      'string.empty': 'Please, enter firstname right',
    }),
  lastName: Joi.string()
    .min(2)
    .max(20)
    .messages({
      'string.empty': 'Please, enter lastname right',
    }),
  age: Joi.number()
    .messages({
      'string.empty': 'Please, enter age right',
    }),
});

async function exist(ctx, next) {
  const existsWriter = await writerService.exists({
    _id: ctx.params.id,
  });
  if (!existsWriter) {
    ctx.body = 'havent this writer';
  }
  next();
}

async function handler(ctx) {
  const data = ctx.validatedData;
  ctx.response.body = data;
  await writerService.atomic.update({ _id: ctx.params.id },
    {
      $set: data,
    });
}

module.exports.register = (router) => {
  router.put('/:id', validate(schema), exist, handler);
};
