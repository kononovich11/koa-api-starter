const Router = require('@koa/router');

require('./writer.handler'); 


const router = new Router();

require('./get-writer').register(router); 
require('./update-current').register(router);
require('./create').register(router);
require('./update-writer').register(router);
require('./delete-writer').register(router);


module.exports = router.routes();
