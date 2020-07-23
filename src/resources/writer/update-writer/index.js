const Joi = require('@hapi/joi');

// const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');


async function handler(ctx) {
  await writerService.update(ctx.request.body._id , (doc) => {
    doc.firstName = 'Alex';
    doc.lastName = 'Smirnov';
    doc.ade = 30;
    doc.books = [
      {
        "_id": 1,
        "title": "my book 2",
        "genre": "poem"
      }
    ]
    console.log(doc);
  });
}



module.exports.register = (router) => {
  router.put('/',  handler);
};