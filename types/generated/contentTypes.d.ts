import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAdresAdres extends Struct.CollectionTypeSchema {
  collectionName: 'adress';
  info: {
    description: '';
    displayName: '\u0422\u041D: \u0410\u0434\u0440\u0435\u0441';
    pluralName: 'adress';
    singularName: 'adres';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    all: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    fiasId: Schema.Attribute.String;
    fullAddress: Schema.Attribute.String;
    lat: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::adres.adres'> &
      Schema.Attribute.Private;
    lon: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAuditEventAuditEvent extends Struct.CollectionTypeSchema {
  collectionName: 'audit_events';
  info: {
    displayName: '\u041B\u043E\u0433\u0433\u0435\u0440';
    pluralName: 'audit-events';
    singularName: 'audit-event';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    details: Schema.Attribute.JSON;
    entity_id: Schema.Attribute.String;
    event_time: Schema.Attribute.DateTime & Schema.Attribute.Required;
    ip: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::audit-event.audit-event'
    > &
      Schema.Attribute.Private;
    page: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    request_id: Schema.Attribute.String;
    source: Schema.Attribute.Enumeration<
      ['frontend', 'backend', 'bot', 'system']
    >;
    status_event: Schema.Attribute.Enumeration<
      ['success', 'error', 'info', 'warning']
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
    view_role: Schema.Attribute.Enumeration<
      ['standart', 'preview', 'supergeneral', 'system']
    >;
  };
}

export interface ApiDashbordOoStatistikaDashbordOoStatistika
  extends Struct.CollectionTypeSchema {
  collectionName: 'dashbord_oo_statistikas';
  info: {
    displayName: '\u0414\u0430\u0448\u0431\u043E\u0440\u0434\u041E\u041E: \u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430';
    pluralName: 'dashbord-oo-statistikas';
    singularName: 'dashbord-oo-statistika';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.DefaultTo<'tech_violations_2026'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    data: Schema.Attribute.JSON & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::dashbord-oo-statistika.dashbord-oo-statistika'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiElectroObjectElectroObject
  extends Struct.CollectionTypeSchema {
  collectionName: 'electro_objects';
  info: {
    description: '';
    displayName: '\u041F\u042D\u0421: R3 \u043E\u0431\u044A\u0435\u043A\u0442\u044B/\u043B\u0438\u043D\u0438\u0438';
    pluralName: 'electro-objects';
    singularName: 'electro-object';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Schema.Attribute.String;
    class_name: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    enobj_name: Schema.Attribute.String;
    eq_datetime: Schema.Attribute.DateTime;
    eq_datetime_raw: Schema.Attribute.String;
    eq_insert_datetime: Schema.Attribute.DateTime;
    eq_insert_datetime_raw: Schema.Attribute.String;
    equipment_exists: Schema.Attribute.String;
    installation_date: Schema.Attribute.DateTime;
    installation_date_raw: Schema.Attribute.String;
    keylink: Schema.Attribute.String & Schema.Attribute.Unique;
    lat: Schema.Attribute.Float;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::electro-object.electro-object'
    > &
      Schema.Attribute.Private;
    lon: Schema.Attribute.Float;
    publishedAt: Schema.Attribute.DateTime;
    rclass_name: Schema.Attribute.String;
    settlement: Schema.Attribute.String;
    sheet_name: Schema.Attribute.String;
    source_file: Schema.Attribute.String;
    source_row: Schema.Attribute.Integer;
    subclass_name: Schema.Attribute.String;
    subcontrol_area_name: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    voltage: Schema.Attribute.String;
  };
}

export interface ApiFilialFilial extends Struct.SingleTypeSchema {
  collectionName: 'filials';
  info: {
    displayName: '\u0424\u0438\u043B\u0438\u0430\u043B';
    pluralName: 'filials';
    singularName: 'filial';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::filial.filial'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiIntegrationMappingIntegrationMapping
  extends Struct.CollectionTypeSchema {
  collectionName: 'integration_mappings';
  info: {
    displayName: '\u0422\u041D: \u041C\u0430\u043F\u043F\u0438\u043D\u0433 \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u0438\u0439';
    pluralName: 'integration-mappings';
    singularName: 'integration-mapping';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    comment: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    integration: Schema.Attribute.Enumeration<
      ['edds_new', 'mes', 'planned_module']
    > &
      Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::integration-mapping.integration-mapping'
    > &
      Schema.Attribute.Private;
    mappingType: Schema.Attribute.Enumeration<
      ['district_fias', 'reason_code', 'equipment_type']
    > &
      Schema.Attribute.Required;
    matchType: Schema.Attribute.Enumeration<['exact', 'contains']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'exact'>;
    priority: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<100>;
    publishedAt: Schema.Attribute.DateTime;
    sourceField: Schema.Attribute.Enumeration<['DISTRICT', 'BRIGADE_ACTION']> &
      Schema.Attribute.Required;
    sourceValue: Schema.Attribute.String & Schema.Attribute.Required;
    targetValue: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNastrojkiPolejNastrojkiPolej
  extends Struct.CollectionTypeSchema {
  collectionName: 'nastrojki_polejs';
  info: {
    displayName: '\u0422\u041D: \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043E\u043B\u0435\u0439';
    pluralName: 'nastrojki-polejs';
    singularName: 'nastrojki-polej';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    editable: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::nastrojki-polej.nastrojki-polej'
    > &
      Schema.Attribute.Private;
    nameEdds: Schema.Attribute.String;
    nameModus: Schema.Attribute.String;
    nameMosEnergoSbit: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPesBranchPesBranch extends Struct.CollectionTypeSchema {
  collectionName: 'pes_branches';
  info: {
    displayName: '\u041F\u042D\u0421: \u0424\u0438\u043B\u0438\u0430\u043B\u044B ';
    pluralName: 'pes-branches';
    singularName: 'pes-branch';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pes-branch.pes-branch'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    name_norm: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    po: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    subscribers_max: Schema.Attribute.Relation<
      'manyToMany',
      'api::pes-max-subscriber.pes-max-subscriber'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPesCollectionPointPesCollectionPoint
  extends Struct.CollectionTypeSchema {
  collectionName: 'pes_collection_points';
  info: {
    description: '';
    displayName: '\u041F\u042D\u0421: \u0422\u043E\u0447\u043A\u0438 \u0441\u0431\u043E\u0440\u0430';
    pluralName: 'pes-collection-points';
    singularName: 'pes-collection-point';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Schema.Attribute.String;
    branch: Schema.Attribute.String;
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    coords_raw: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    dispatcher_phone: Schema.Attribute.String;
    lat: Schema.Attribute.Float;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pes-collection-point.pes-collection-point'
    > &
      Schema.Attribute.Private;
    lon: Schema.Attribute.Float;
    po: Schema.Attribute.String;
    point_kind: Schema.Attribute.Enumeration<['base', 'alternative', 'other']>;
    point_type_raw: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    source_file: Schema.Attribute.String;
    source_row: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPesMapAllowlistPesMapAllowlist
  extends Struct.CollectionTypeSchema {
  collectionName: 'pes_map_allowlists';
  info: {
    displayName: '\u041F\u042D\u0421 \u0414\u0430\u0448\u0431\u043E\u0440\u0434';
    pluralName: 'pes-map-allowlists';
    singularName: 'pes-map-allowlist';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pes-map-allowlist.pes-map-allowlist'
    > &
      Schema.Attribute.Private;
    pesId: Schema.Attribute.Integer;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPesMaxBotStatePesMaxBotState
  extends Struct.CollectionTypeSchema {
  collectionName: 'pes_max_bot_states';
  info: {
    displayName: '\u041F\u042D\u0421: \u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 MAX-\u0431\u043E\u0442\u0430 ';
    pluralName: 'pes-max-bot-states';
    singularName: 'pes-max-bot-state';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'main'>;
    last_poll_at: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pes-max-bot-state.pes-max-bot-state'
    > &
      Schema.Attribute.Private;
    polling_marker: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPesMaxSubscriberPesMaxSubscriber
  extends Struct.CollectionTypeSchema {
  collectionName: 'pes_max_subscribers';
  info: {
    displayName: '\u041F\u042D\u0421: \u041F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u0438 MAX';
    pluralName: 'pes-max-subscribers';
    singularName: 'pes-max-subscriber';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    branches: Schema.Attribute.Relation<
      'manyToMany',
      'api::pes-branch.pes-branch'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    first_name: Schema.Attribute.String;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    last_interaction_at: Schema.Attribute.DateTime;
    last_name: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pes-max-subscriber.pes-max-subscriber'
    > &
      Schema.Attribute.Private;
    max_chat_id: Schema.Attribute.Integer;
    max_user_id: Schema.Attribute.Integer;
    muted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    publishedAt: Schema.Attribute.DateTime;
    subscribe_all: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiPesOperationLogPesOperationLog
  extends Struct.CollectionTypeSchema {
  collectionName: 'pes_operation_logs';
  info: {
    description: '';
    displayName: '\u041F\u042D\u0421: \u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439 ';
    pluralName: 'pes-operation-logs';
    singularName: 'pes-operation-log';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    action: Schema.Attribute.Enumeration<
      ['dispatch', 'reroute', 'cancel', 'depart', 'connect', 'ready', 'repair']
    >;
    actor_chat_id: Schema.Attribute.Integer;
    actor_login: Schema.Attribute.String;
    actor_role: Schema.Attribute.Enumeration<
      ['standart', 'supergeneral', 'telegram', 'system']
    >;
    actual_departure_at: Schema.Attribute.DateTime;
    batch_id: Schema.Attribute.String;
    branch: Schema.Attribute.String;
    command_sent_at: Schema.Attribute.DateTime;
    comment: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    delay_over_15m: Schema.Attribute.Boolean;
    delay_seconds: Schema.Attribute.Integer;
    destination_address: Schema.Attribute.String;
    destination_lat: Schema.Attribute.Float;
    destination_lon: Schema.Attribute.Float;
    destination_title: Schema.Attribute.String;
    destination_type: Schema.Attribute.Enumeration<['assembly', 'tp']>;
    event_time: Schema.Attribute.DateTime & Schema.Attribute.Required;
    event_uid: Schema.Attribute.UID & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pes-operation-log.pes-operation-log'
    > &
      Schema.Attribute.Private;
    pes_unit: Schema.Attribute.Relation<'manyToOne', 'api::pes-unit.pes-unit'>;
    po: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    status_from: Schema.Attribute.Enumeration<
      ['ready,', 'command_sent', 'delay', 'en_route', 'connected', 'repair']
    >;
    status_to: Schema.Attribute.Enumeration<
      ['ready', 'command_sent', 'delay', 'en_route', 'connected', 'repair']
    >;
    tn_guid: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPesUnitStatePesUnitState
  extends Struct.CollectionTypeSchema {
  collectionName: 'pes_unit_states';
  info: {
    displayName: '\u041F\u042D\u0421: \u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435';
    pluralName: 'pes-unit-states';
    singularName: 'pes-unit-state';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    actual_departure_at: Schema.Attribute.DateTime;
    command_sent_at: Schema.Attribute.DateTime;
    connected_at: Schema.Attribute.DateTime;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    destination_address: Schema.Attribute.String;
    destination_lat: Schema.Attribute.Float;
    destination_lon: Schema.Attribute.Float;
    destination_ref: Schema.Attribute.String;
    destination_title: Schema.Attribute.String;
    destination_type: Schema.Attribute.Enumeration<['assembly', 'tp']>;
    last_comment: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pes-unit-state.pes-unit-state'
    > &
      Schema.Attribute.Private;
    pes_status: Schema.Attribute.Enumeration<
      ['ready', 'command_sent', 'delay', 'en_route', 'connected', 'repair']
    >;
    pes_unit: Schema.Attribute.Relation<'oneToOne', 'api::pes-unit.pes-unit'>;
    publishedAt: Schema.Attribute.DateTime;
    rerouted_at: Schema.Attribute.DateTime;
    updated_by_chat_id: Schema.Attribute.Integer;
    updated_from: Schema.Attribute.Enumeration<['web', 'telegram', 'system']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPesUnitPesUnit extends Struct.CollectionTypeSchema {
  collectionName: 'pes_units';
  info: {
    description: '';
    displayName: '\u041F\u042D\u0421: \u0420\u0435\u0435\u0441\u0442\u0440 ';
    pluralName: 'pes-units';
    singularName: 'pes-unit';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    access_pass: Schema.Attribute.String;
    base_address: Schema.Attribute.String;
    branch: Schema.Attribute.String;
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    district: Schema.Attribute.String;
    duty_type: Schema.Attribute.String;
    garage_number: Schema.Attribute.String;
    generator_model: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pes-unit.pes-unit'
    > &
      Schema.Attribute.Private;
    manufacture_year: Schema.Attribute.Integer;
    notes: Schema.Attribute.String;
    operation_logs: Schema.Attribute.Relation<
      'oneToMany',
      'api::pes-operation-log.pes-operation-log'
    >;
    ownership_form: Schema.Attribute.String;
    pes_name: Schema.Attribute.String;
    po: Schema.Attribute.String;
    power_kva_max: Schema.Attribute.Decimal;
    power_kva_nominal: Schema.Attribute.Decimal;
    power_kw_max: Schema.Attribute.Decimal;
    power_kw_nominal: Schema.Attribute.Decimal;
    prioritet: Schema.Attribute.Boolean;
    publishedAt: Schema.Attribute.DateTime;
    source_file: Schema.Attribute.String;
    source_row: Schema.Attribute.Integer;
    state: Schema.Attribute.Relation<
      'oneToOne',
      'api::pes-unit-state.pes-unit-state'
    >;
    towing_vehicle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    vehicle_plate: Schema.Attribute.String;
  };
}

export interface ApiPoPo extends Struct.SingleTypeSchema {
  collectionName: 'pos';
  info: {
    displayName: '\u041F\u041E';
    pluralName: 'pos';
    singularName: 'po';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::po.po'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTehNarusheniyaTehNarusheniya
  extends Struct.CollectionTypeSchema {
  collectionName: 'teh_narusheniyas';
  info: {
    description: '';
    displayName: '\u0422\u041D: \u0422\u0435\u0445 \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u044F';
    pluralName: 'teh-narusheniyas';
    singularName: 'teh-narusheniya';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    addressList: Schema.Attribute.Text;
    BASE_TYPE: Schema.Attribute.Integer;
    createdAt: Schema.Attribute.DateTime;
    createDateTime: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    data: Schema.Attribute.JSON;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043F\u0440\u043E\u0431\u043E\u0439'>;
    dispCenter: Schema.Attribute.String;
    edds_electricityRequestId: Schema.Attribute.String;
    energoObject: Schema.Attribute.String;
    guid: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::teh-narusheniya.teh-narusheniya'
    > &
      Schema.Attribute.Private;
    number: Schema.Attribute.String;
    PES_COUNT: Schema.Attribute.String & Schema.Attribute.DefaultTo<'0'>;
    PES_POWER: Schema.Attribute.String & Schema.Attribute.DefaultTo<'0'>;
    publishedAt: Schema.Attribute.DateTime;
    recoveryFactDateTime: Schema.Attribute.DateTime;
    recoveryPlanDateTime: Schema.Attribute.DateTime;
    required_brigades: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    required_emergency_power_supply: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<0>;
    required_equipment: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<0>;
    required_workers: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    sendedEdds: Schema.Attribute.Boolean;
    sendedMosEnergoSbit: Schema.Attribute.Boolean;
    STATUS_NAME: Schema.Attribute.Enumeration<
      [
        '\u043E\u0442\u043A\u0440\u044B\u0442\u0430',
        '\u0443\u0434\u0430\u043B\u0435\u043D\u0430',
        '\u0437\u0430\u043A\u0440\u044B\u0442\u0430',
        '\u0437\u0430\u043F\u0438\u0442\u0430\u043D\u0430',
        '\u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E',
        '\u043D\u0430\u0447\u0430\u0442\u0430',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTnFilialyTnFilialy extends Struct.CollectionTypeSchema {
  collectionName: 'tn_filialies';
  info: {
    displayName: '\u0422\u041D: \u0424\u0438\u043B\u0438\u0430\u043B\u044B';
    pluralName: 'tn-filialies';
    singularName: 'tn-filialy';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tn-filialy.tn-filialy'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    osn_resours: Schema.Attribute.BigInteger;
    ovb: Schema.Attribute.BigInteger;
    publishedAt: Schema.Attribute.DateTime;
    rezim: Schema.Attribute.Enumeration<['bez_rezhima', 'rpg', 'orr']>;
    sort_order: Schema.Attribute.Integer;
    tn_okruga: Schema.Attribute.Relation<'manyToOne', 'api::tn-okrug.tn-okrug'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTnOkrugTnOkrug extends Struct.CollectionTypeSchema {
  collectionName: 'tn_okruga';
  info: {
    displayName: '\u0422\u041D: \u041E\u043A\u0440\u0443\u0433\u0430';
    pluralName: 'tn-okruga';
    singularName: 'tn-okrug';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    geometry: Schema.Attribute.JSON & Schema.Attribute.Required;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tn-okrug.tn-okrug'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    properties: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    sort_order: Schema.Attribute.Integer;
    source_name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    tn_filialies: Schema.Attribute.Relation<
      'oneToMany',
      'api::tn-filialy.tn-filialy'
    >;
    tn_pos: Schema.Attribute.Relation<'oneToMany', 'api::tn-po.tn-po'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTnPoTnPo extends Struct.CollectionTypeSchema {
  collectionName: 'tn_pos';
  info: {
    displayName: '\u0422\u041D: \u041F\u041E';
    pluralName: 'tn-pos';
    singularName: 'tn-po';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::tn-po.tn-po'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    sort_order: Schema.Attribute.Integer;
    tn_filialy: Schema.Attribute.Relation<
      'oneToOne',
      'api::tn-filialy.tn-filialy'
    >;
    tn_okruga: Schema.Attribute.Relation<'manyToOne', 'api::tn-okrug.tn-okrug'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiZhurnalOtpravkiZhurnalOtpravki
  extends Struct.CollectionTypeSchema {
  collectionName: 'zhurnal_otpravkis';
  info: {
    displayName: '\u0422\u041D: \u0416\u0443\u0440\u043D\u0430\u043B \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438';
    pluralName: 'zhurnal-otpravkis';
    singularName: 'zhurnal-otpravki';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    data: Schema.Attribute.JSON;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::zhurnal-otpravki.zhurnal-otpravki'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.Text;
    caption: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    focalPoint: Schema.Attribute.JSON;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.Text;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.Text & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    view_role: Schema.Attribute.Enumeration<
      ['supergeneral', 'standart', 'preview']
    > &
      Schema.Attribute.DefaultTo<'standart'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::adres.adres': ApiAdresAdres;
      'api::audit-event.audit-event': ApiAuditEventAuditEvent;
      'api::dashbord-oo-statistika.dashbord-oo-statistika': ApiDashbordOoStatistikaDashbordOoStatistika;
      'api::electro-object.electro-object': ApiElectroObjectElectroObject;
      'api::filial.filial': ApiFilialFilial;
      'api::integration-mapping.integration-mapping': ApiIntegrationMappingIntegrationMapping;
      'api::nastrojki-polej.nastrojki-polej': ApiNastrojkiPolejNastrojkiPolej;
      'api::pes-branch.pes-branch': ApiPesBranchPesBranch;
      'api::pes-collection-point.pes-collection-point': ApiPesCollectionPointPesCollectionPoint;
      'api::pes-map-allowlist.pes-map-allowlist': ApiPesMapAllowlistPesMapAllowlist;
      'api::pes-max-bot-state.pes-max-bot-state': ApiPesMaxBotStatePesMaxBotState;
      'api::pes-max-subscriber.pes-max-subscriber': ApiPesMaxSubscriberPesMaxSubscriber;
      'api::pes-operation-log.pes-operation-log': ApiPesOperationLogPesOperationLog;
      'api::pes-unit-state.pes-unit-state': ApiPesUnitStatePesUnitState;
      'api::pes-unit.pes-unit': ApiPesUnitPesUnit;
      'api::po.po': ApiPoPo;
      'api::teh-narusheniya.teh-narusheniya': ApiTehNarusheniyaTehNarusheniya;
      'api::tn-filialy.tn-filialy': ApiTnFilialyTnFilialy;
      'api::tn-okrug.tn-okrug': ApiTnOkrugTnOkrug;
      'api::tn-po.tn-po': ApiTnPoTnPo;
      'api::zhurnal-otpravki.zhurnal-otpravki': ApiZhurnalOtpravkiZhurnalOtpravki;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
