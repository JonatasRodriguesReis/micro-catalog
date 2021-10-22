import { Component } from '@loopback/core';
import { RestServer } from '@loopback/rest';
import { RestExplorerConfig } from '@loopback/rest-explorer';
/**
 * A component providing a self-hosted API Explorer.
 */
export declare class RestExplorerComponent implements Component {
    private restServer;
    constructor(restServer: RestServer, restExplorerConfig?: RestExplorerConfig);
    private registerControllerRoute;
}
