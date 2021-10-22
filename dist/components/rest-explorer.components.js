"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestExplorerComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const rest_explorer_controller_1 = require("@loopback/rest-explorer/dist/rest-explorer.controller");
const swaggerUI = require('swagger-ui-dist');
/**
 * A component providing a self-hosted API Explorer.
 */
let RestExplorerComponent = class RestExplorerComponent {
    constructor(restServer, restExplorerConfig = {}) {
        var _a;
        this.restServer = restServer;
        const explorerPath = (_a = restExplorerConfig.path) !== null && _a !== void 0 ? _a : '/explorer';
        this.registerControllerRoute('get', explorerPath, 'indexRedirect');
        this.registerControllerRoute('get', explorerPath + '/', 'index');
        if (restExplorerConfig.useSelfHostedSpec !== false) {
            this.registerControllerRoute('get', explorerPath + '/openapi.json', 'spec');
        }
        restServer.static(explorerPath, swaggerUI.getAbsoluteFSPath());
        // Disable redirect to externally hosted API explorer
        restServer.config.apiExplorer = { disabled: true };
    }
    registerControllerRoute(verb, path, methodName) {
        this.restServer.route(verb, path, {
            'x-visibility': 'undocumented',
            responses: {},
        }, rest_explorer_controller_1.ExplorerController, rest_1.createControllerFactoryForClass(rest_explorer_controller_1.ExplorerController), methodName);
    }
};
RestExplorerComponent = tslib_1.__decorate([
    core_1.injectable({ tags: { [core_1.ContextTags.KEY]: rest_explorer_1.RestExplorerBindings.COMPONENT.key } }),
    tslib_1.__param(0, core_1.inject(rest_1.RestBindings.SERVER)),
    tslib_1.__param(1, core_1.config()),
    tslib_1.__metadata("design:paramtypes", [rest_1.RestServer, Object])
], RestExplorerComponent);
exports.RestExplorerComponent = RestExplorerComponent;
//# sourceMappingURL=rest-explorer.components.js.map