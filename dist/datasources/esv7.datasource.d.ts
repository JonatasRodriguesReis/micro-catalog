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
            node: string | undefined;
            requestTimeout: string | undefined;
            pingTimeout: string | undefined;
        };
        mappingProperties: {};
    };
    constructor(dsConfig?: object);
}
