const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');

const schema = Joi.object({
  firstName: Joi.string()
    .trim()
    .messages({
      'string.empty': 'First name is required',
    }),
  lastName: Joi.string()
    .trim()
    .messages({
      'string.empty': 'Last name is required',
    }),
});

async function validator(ctx, next) {
  const { email } = ctx.validatedData; //

  const isEmailInUse = await userService.exists({
    _id: { $ne: ctx.state.user._id },
    email,
  });

  if (isEmailInUse) {
    ctx.body = {
      errors: {
        email: ['This email is already in use'],
      },
    };
    ctx.throw(400);
  }

  await next();
}

async function handler(ctx) {
  let { user } = ctx.state;

  const data = ctx.validatedData;

  if (Object.keys(data).length > 0) {
    user = await userService.update(
      { _id: user._id },
      (old) => ({ ...old, ...data }),
    );
  }

  ctx.body = userService.getPublic(user);
}

module.exports.register = (router) => {
  router.put('/current', validate(schema), validator, handler);
};