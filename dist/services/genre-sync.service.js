"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreSyncService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const decorators_1 = require("../decorators");
const repositories_1 = require("../repositories");
let GenreSyncService = class GenreSyncService {
    constructor(genreRepo) {
        this.genreRepo = genreRepo;
    }
    async handlerCreated({ data }) {
        console.log('created', data);
        const { id, name, isActive } = data;
        await this.genreRepo.create({
            id, name, isActive
        });
    }
    async handlerUpdated({ data }) {
        console.log('updated', data);
        const { id, name, isActive } = data;
        await this.genreRepo.updateById(id, {
            name, isActive
        });
    }
    async handlerDeleted({ data }) {
        console.log('deleted', data);
        const { id } = data;
        await this.genreRepo.deleteById(id);
    }
};
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'genreCreated',
        routingKey: 'model.genre.created'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GenreSyncService.prototype, "handlerCreated", null);
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'genreUpdated',
        routingKey: 'model.genre.updated'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GenreSyncService.prototype, "handlerUpdated", null);
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'genreDeleted',
        routingKey: 'model.genre.deleted'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GenreSyncService.prototype, "handlerDeleted", null);
GenreSyncService = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, repository_1.repository(repositories_1.GenreRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.GenreRepository])
], GenreSyncService);
exports.GenreSyncService = GenreSyncService;
//# sourceMappingURL=genre-sync.service.js.map