const db = require('db');
const constants = require('app.constants');

const validateSchema = require('./writer.schema');


const service = db.createService(constants.DATABASE_DOCUMENTS.WRITER, { validateSchema });


module.exports = service;
