"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySyncService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const decorators_1 = require("../decorators");
const repositories_1 = require("../repositories");
let CategorySyncService = class CategorySyncService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
    }
    async handlerCreated({ data }) {
        console.log('created', data);
        const { id, name, isActive, description } = data;
        await this.categoryRepo.create({
            id, name, description, isActive, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
        });
    }
    async handlerUpdated({ data }) {
        console.log('updated', data);
        const { id, name, isActive, description } = data;
        await this.categoryRepo.updateById(id, {
            name, isActive, description, updatedAt: new Date().toISOString()
        });
    }
    async handlerDeleted({ data }) {
        console.log('deleted', data);
        const { id } = data;
        await this.categoryRepo.deleteById(id);
    }
};
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'categoryCreated',
        routingKey: 'model.category.created'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategorySyncService.prototype, "handlerCreated", null);
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'categoryUpdated',
        routingKey: 'model.category.updated'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategorySyncService.prototype, "handlerUpdated", null);
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'categoryDeleted',
        routingKey: 'model.category.deleted'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategorySyncService.prototype, "handlerDeleted", null);
CategorySyncService = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, repository_1.repository(repositories_1.CategoryRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CategoryRepository])
], CategorySyncService);
exports.CategorySyncService = CategorySyncService;
//# sourceMappingURL=category-sync.service.js.map