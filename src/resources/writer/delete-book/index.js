const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  await writerService.atomic.update(
    { _id: ctx.params.idWriter },
    { $pull: { books: { _id: ctx.params.idBook } } },
  );
  ctx.response.body = await writerService.find({ _id: ctx.params.idWriter });
}

module.exports.register = (router) => {
  router.delete('/:idWriter/:idBook', handler);
};
