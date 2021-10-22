"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.MicroCatalogApplication = void 0;
const application_1 = require("./application");
Object.defineProperty(exports, "MicroCatalogApplication", { enumerable: true, get: function () { return application_1.MicroCatalogApplication; } });
require("./bootstrap");
async function main(options = {}) {
    const app = new application_1.MicroCatalogApplication(options);
    await app.boot();
    await app.start();
    const restServer = app.getSync('servers.RestServer');
    const url = restServer.url;
    console.log(`Server is running at ${url}`);
    console.log(`Try ${url}/ping`);
    return app;
}
exports.main = main;
if (require.main === module) {
    // Run the application
    const config = {
        rest: {
            port: +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
            host: process.env.HOST,
            // The `gracePeriodForClose` provides a graceful close for http/https
            // servers with keep-alive clients. The default value is `Infinity`
            // (don't force-close). If you want to immediately destroy all sockets
            // upon stop, set its value to `0`.
            // See https://www.npmjs.com/package/stoppable
            gracePeriodForClose: 5000,
            openApiSpec: {
                // useful when used with OpenAPI-to-GraphQL to locate your application
                setServersFromRequest: true,
            },
        },
        rabbitmq: {
            uri: process.env.RABBITMQ_URI,
            exchanges: [
                { name: 'test1', type: 'direct' },
                { name: 'test2', type: 'direct' }
            ]
        }
    };
    main(config).catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map