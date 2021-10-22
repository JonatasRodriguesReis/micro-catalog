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
    async handler({ data, message }) {
        const action = message.fields.routingKey.split('.')[2];
        console.log(data);
        console.log(action);
        switch (action) {
            case 'created':
                await this.categoryRepo.create({ ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
                break;
            case 'updated':
                await this.categoryRepo.updateById(data.id, data);
                break;
            case 'deleted':
                await this.categoryRepo.deleteById(data.id);
                break;
        }
        ;
    }
};
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'micro-catalog/sync-videos/category',
        routingKey: 'model.category.*'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategorySyncService.prototype, "handler", null);
CategorySyncService = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, repository_1.repository(repositories_1.CategoryRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CategoryRepository])
], CategorySyncService);
exports.CategorySyncService = CategorySyncService;
//# sourceMappingURL=category-sync.service.js.map