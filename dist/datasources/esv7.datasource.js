"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Esv7DataSource = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/naming-convention */
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
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
        type: {
            type: "byte"
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
let Esv7DataSource = class Esv7DataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
Esv7DataSource.dataSourceName = 'esv7';
Esv7DataSource.defaultConfig = config;
Esv7DataSource = tslib_1.__decorate([
    core_1.lifeCycleObserver('datasource'),
    tslib_1.__param(0, core_1.inject('datasources.config.esv7', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], Esv7DataSource);
exports.Esv7DataSource = Esv7DataSource;
//# sourceMappingURL=esv7.datasource.js.map