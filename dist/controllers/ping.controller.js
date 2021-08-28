"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const metadata_1 = require("@loopback/metadata");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const uuidv4_1 = require("uuidv4");
const repositories_1 = require("../repositories");
/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE = {
    description: 'Ping Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                title: 'PingResponse',
                properties: {
                    greeting: { type: 'string' },
                    date: { type: 'string' },
                    url: { type: 'string' },
                    headers: {
                        type: 'object',
                        properties: {
                            'Content-Type': { type: 'string' },
                        },
                        additionalProperties: true,
                    },
                },
            },
        },
    },
};
function myClassDecorator(spec) {
    const factory = new metadata_1.ClassDecoratorFactory('metadata-my-class-decorator', spec);
    return factory.create();
}
/**
 * A simple controller to bounce back http requests
 */
let PingController = class PingController {
    constructor(req, categoryRepository) {
        this.req = req;
        this.categoryRepository = categoryRepository;
    }
    // Map to `GET /ping`
    ping() {
        // Reply with a greeting, the current time, the url, and request headers
        return {
            greeting: 'Hello from LoopBack',
            date: new Date(),
            url: this.req.url,
            headers: Object.assign({}, this.req.headers),
        };
    }
    //@response(200, PING_RESPONSE)
    async index() {
        await this.categoryRepository.create({
            id: uuidv4_1.uuid().toString(),
            name: 'new-category',
            description: 'testando a primeira criação'
        });
        const result = await this.categoryRepository.find();
        return result;
    }
    //@response(200, PING_RESPONSE)
    async create() {
        const result = await this.categoryRepository.create({
            id: uuidv4_1.uuid().toString(),
            name: 'new-category',
            description: 'testando a primeira criação'
        });
        return result;
    }
};
tslib_1.__decorate([
    rest_1.get('/ping'),
    rest_1.response(200, PING_RESPONSE),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Object)
], PingController.prototype, "ping", null);
tslib_1.__decorate([
    rest_1.get('/categories'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PingController.prototype, "index", null);
tslib_1.__decorate([
    rest_1.post('/new-category'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PingController.prototype, "create", null);
PingController = tslib_1.__decorate([
    myClassDecorator({ name: 'teste' }),
    tslib_1.__param(0, core_1.inject(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__param(1, repository_1.repository(repositories_1.CategoryRepository)),
    tslib_1.__metadata("design:paramtypes", [Object, repositories_1.CategoryRepository])
], PingController);
exports.PingController = PingController;
//# sourceMappingURL=ping.controller.js.map