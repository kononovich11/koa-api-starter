const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  const writer = await writerService.findOne({ _id: ctx.params.id });
  ctx.response.body = writer;
}

module.exports.register = (router) => {
  router.get('/:id', handler);
};
