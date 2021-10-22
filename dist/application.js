"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroCatalogApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const rest_explorer_1 = require("@loopback/rest-explorer");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const components_1 = require("./components");
const sequence_1 = require("./sequence");
const servers_1 = require("./servers");
class MicroCatalogApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(core_1.Application))) {
    constructor(options = {}) {
        super(options);
        options.rest.sequence = sequence_1.MySequence;
        this.component(rest_1.RestComponent);
        const restServer = this.getSync('servers.RestServer');
        restServer.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.bind(rest_explorer_1.RestExplorerBindings.CONFIG).to({
            path: '/explorer',
        });
        this.component(components_1.RestExplorerComponent);
        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ['controllers'],
                extensions: ['.controller.js'],
                nested: true,
            },
        };
        this.server(servers_1.RabbitmqServer);
    }
}
exports.MicroCatalogApplication = MicroCatalogApplication;
//# sourceMappingURL=application.js.map