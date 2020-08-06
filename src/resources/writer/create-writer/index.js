const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');

const ENUM = ['novel', 'poem', 'fantasy'];

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

  books: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      genre: Joi.string().valid(...ENUM),
    }),
  ),
});

async function exist(ctx, next) {
  const { firstName, lastName } = ctx.validatedData;
  const existsWriter = await writerService.exists({
    firstName,
    lastName,
  });
  if (existsWriter) {
    ctx.response.body = 'writer already exist';
  }
  next();
}

async function handler(ctx) {
  const data = ctx.validatedData;
  ctx.response.body = data;
  await writerService.create([data]);
}

module.exports.register = (router) => {
  router.post('/', validate(schema), exist, handler);
};
