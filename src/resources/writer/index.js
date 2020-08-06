const Router = require('@koa/router');

const router = new Router();

require('./getWriters').register(router);
require('./get-writer').register(router);
require('./create-writer').register(router);
require('./update-writer').register(router);
require('./delete-writer').register(router);
require('./add-book').register(router);
require('./delete-book').register(router);
require('./put-books').register(router);


module.exports = router.routes();
