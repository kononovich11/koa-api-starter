const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  await writerService.remove({ _id: ctx.params.id });
}

module.exports.register = (router) => {
  router.delete('/:id', handler);
};
