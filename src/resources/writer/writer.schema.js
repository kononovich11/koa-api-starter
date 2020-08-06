const Joi = require('@hapi/joi');

const schema = Joi.object({
  _id: Joi.string(),
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  age: Joi.number()
    .required(),
  createdOn: Joi.date(),
  books: [
    {
      _id: Joi.string()
        .required(),
      title: Joi.string()
        .required(),
      genre: Joi.string().valid('novel', 'poem'),
    },
  ],
});

module.exports = (obj) => schema.validate(obj, { allowUnknown: false });
