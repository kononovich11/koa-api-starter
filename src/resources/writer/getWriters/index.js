const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const ENUMSort =['createdOn', 'firstName', 'lastName', '_id'];
const ENUMOrder =['asc', 'desc'];

const schema = Joi.object({
  pageNumber: Joi.number()
    .min(0)
    .max(Infinity)
    .messages({
      'string.empty': 'Please, enter number right',
    }),
    documentsInPage: Joi.number()
  .min(1)
  .max(5)
    .messages({
      'string.empty': 'Please, enter documentsInPage right',
    }),

    sortOrder: Joi.string().valid(...ENUMOrder),
    sortBy: Joi.string().valid(...ENUMSort),
});


async function handler(ctx) {
  const {pageNumber, documentsInPage, sortBy} = ctx.query;
  let {sortOrder} = ctx.query;
  sortOrder = sortOrder === 'asc'? 1 : -1;

  const result = await writerService.find({}, 
    {
      page: +pageNumber, 
      perPage: +documentsInPage, 
      sort: {[sortBy]:sortOrder}
    } );

  ctx.body =result;
  console.log(pageNumber, documentsInPage, sortOrder, sortBy);  
}

module.exports.register = (router) => {
  router.get('/get', validate(schema), handler);
};