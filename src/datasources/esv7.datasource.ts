/* eslint-disable @typescript-eslint/naming-convention */
import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'esv7',
  connector: 'esv6',
  index: 'catalog',
  version: 7,
  debug: process.env.APP_ENV === 'dev',
  defaultSize: '50',
  configuration: {
    node: "http://elasticsearch:9200",
    requestTimeout: 30000,
    pingTimeout: 3000
  },
  mappingProperties: {
    description: {
      type: "text",
    },
    docType: {
      type: "keyword",
      index: true
    },
    id: {
      type: "keyword",
    },
    name: {
      type: "text",
      fields: {
        keyword: {
          type: "keyword",
          "ignore_above": 256
        }
      }
    },
    isActive: {
      type: "boolean"
    },
    createdAt: {
      type: "date",
    },
    updatedAt: {
      type: "date",
    }
  }
};

console.log(config);

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Esv7DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'esv7';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.esv7', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
