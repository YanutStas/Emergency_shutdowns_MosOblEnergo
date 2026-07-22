'use strict';

/**
 * po service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::po.po');
