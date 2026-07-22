'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::audit-event.audit-event');
