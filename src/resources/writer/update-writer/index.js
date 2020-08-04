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
    })
});

async function validator(ctx, next) {
  const existsWriter = await writerService.exists({
    _id: ctx.params.id
  });  
    if(!existsWriter) {
      ctx.body = 'havent this writer';
  }
  console.log(existsWriter);  
  next();
}

async function handler(ctx) {
  const data = ctx.validatedData;
  console.log(data);  
  await writerService.update({
    _id: ctx.params.id}, (doc) => {
      data.firstName? doc.firstName = data.firstName:doc.firstName;
      data.lastName? doc.lastName = data.lastName:doc.lastName;
      data.age? doc.age = data.age:doc.age;
    return doc;
  });
}

module.exports.register = (router) => {
  router.put('/:id', validate(schema), validator, handler);
};



