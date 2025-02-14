import type { Schema, Struct } from '@strapi/strapi';

export interface AddressInfoAddressInfo extends Struct.ComponentSchema {
  collectionName: 'components_address_info_address_infos';
  info: {
    description: '';
    displayName: 'AddressInfo';
    icon: 'house';
  };
  attributes: {
    building_type: Schema.Attribute.Enumeration<
      [
        '\u0436\u0438\u043B\u043E\u0439 \u0441\u0435\u043A\u0442\u043E\u0440',
        '\u0447\u0430\u0441\u0442\u043D\u044B\u0439 \u0441\u0435\u043A\u0442\u043E\u0440',
        '\u0421\u041D\u0422',
        '\u043F\u0440\u043E\u043C\u0437\u043E\u043D\u0430',
        '\u0421\u0417\u041E',
      ]
    > &
      Schema.Attribute.DefaultTo<'\u0436\u0438\u043B\u043E\u0439 \u0441\u0435\u043A\u0442\u043E\u0440'>;
    city_district: Schema.Attribute.Relation<
      'oneToOne',
      'api::city-district.city-district'
    >;
    settlement_type: Schema.Attribute.Enumeration<
      [
        '\u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0439',
        '\u0441\u0435\u043B\u044C\u0441\u043A\u0438\u0439',
      ]
    > &
      Schema.Attribute.DefaultTo<'\u0433\u043E\u0440\u043E\u0434\u0441\u043A\u043E\u0439'>;
    streets: Schema.Attribute.Text;
  };
}

export interface DisruptionStatsDisruptionStats extends Struct.ComponentSchema {
  collectionName: 'components_disruption_stats_disruption_stats';
  info: {
    displayName: 'DisruptionStats';
    icon: 'folder';
  };
  attributes: {
    affected_clinics: Schema.Attribute.BigInteger;
    affected_hospitals: Schema.Attribute.BigInteger;
    affected_kindergartens: Schema.Attribute.BigInteger;
    affected_mkd: Schema.Attribute.BigInteger;
    affected_residents: Schema.Attribute.BigInteger;
    affected_schools: Schema.Attribute.BigInteger;
    affected_settlements: Schema.Attribute.BigInteger &
      Schema.Attribute.DefaultTo<'1'>;
    boiler_shutdown: Schema.Attribute.BigInteger;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'address-info.address-info': AddressInfoAddressInfo;
      'disruption-stats.disruption-stats': DisruptionStatsDisruptionStats;
    }
  }
}
