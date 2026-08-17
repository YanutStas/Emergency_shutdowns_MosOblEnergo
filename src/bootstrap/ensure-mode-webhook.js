'use strict';

const WEBHOOK_NAME = 'tn_filialy_mode_live_update';
const WEBHOOK_EVENTS = ['entry.update', 'entry.publish', 'entry.unpublish'];
const WEBHOOK_HEADER_NAME = 'X-Mosobl-Webhook';
const WEBHOOK_HEADER_VALUE = 'tn-filialy-mode-live-update';

const getWebhookUrl = (strapi) => {
  const envUrl = process.env.TN_FILIALY_MODE_WEBHOOK_URL;
  if (envUrl) {
    return envUrl;
  }

  const serverUrl = strapi.config.get('server.url', 'https://jtv.mosoblenergo.ru');
  return `${serverUrl.replace(/\/$/, '')}/services/webhooks`;
};

const getWebhookPayload = (strapi) => ({
  name: WEBHOOK_NAME,
  url: getWebhookUrl(strapi),
  headers: {
    [WEBHOOK_HEADER_NAME]: WEBHOOK_HEADER_VALUE,
  },
  events: WEBHOOK_EVENTS,
  isEnabled: true,
});

const isWebhookActual = (webhook, payload) => {
  const webhookEvents = Array.isArray(webhook.events) ? webhook.events : [];

  return (
    webhook.url === payload.url &&
    webhook.isEnabled === payload.isEnabled &&
    WEBHOOK_EVENTS.every((event) => webhookEvents.includes(event)) &&
    webhook.headers?.[WEBHOOK_HEADER_NAME] === WEBHOOK_HEADER_VALUE
  );
};

const ensureModeWebhook = async ({ strapi }) => {
  const webhookStore = strapi.get('webhookStore');
  const webhookRunner = strapi.get('webhookRunner');
  const payload = getWebhookPayload(strapi);
  const webhooks = await webhookStore.findWebhooks();
  const existingWebhook = webhooks.find((webhook) => webhook.name === WEBHOOK_NAME);

  if (!existingWebhook) {
    const createdWebhook = await webhookStore.createWebhook(payload);
    webhookRunner.add(createdWebhook);
    strapi.log.info(`[bootstrap] Создан webhook "${WEBHOOK_NAME}" -> ${payload.url}`);
    return;
  }

  if (isWebhookActual(existingWebhook, payload)) {
    strapi.log.info(`[bootstrap] Webhook "${WEBHOOK_NAME}" уже настроен`);
    return;
  }

  const updatedWebhook = await webhookStore.updateWebhook(existingWebhook.id, {
    ...existingWebhook,
    ...payload,
  });

  if (updatedWebhook) {
    webhookRunner.update(updatedWebhook);
    strapi.log.info(`[bootstrap] Обновлен webhook "${WEBHOOK_NAME}" -> ${payload.url}`);
  }
};

module.exports = ensureModeWebhook;
