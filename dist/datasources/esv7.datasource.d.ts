import { LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
export declare class Esv7DataSource extends juggler.DataSource implements LifeCycleObserver {
    static dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        index: string;
        version: number;
        debug: boolean;
        defaultSize: string;
        configuration: {
            node: string;
            requestTimeout: number;
            pingTimeout: number;
        };
        mappingProperties: {
            description: {
                type: string;
            };
            docType: {
                type: string;
                index: boolean;
            };
            id: {
                type: string;
            };
            name: {
                type: string;
                fields: {
                    keyword: {
                        type: string;
                        ignore_above: number;
                    };
                };
            };
            isActive: {
                type: string;
            };
            createdAt: {
                type: string;
            };
            updatedAt: {
                type: string;
            };
        };
    };
    constructor(dsConfig?: object);
}
