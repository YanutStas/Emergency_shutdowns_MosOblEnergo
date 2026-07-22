'use strict';

/**
 * integration-mapping service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::integration-mapping.integration-mapping');
