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
    async handler({ data, message }) {
        const action = message.fields.routingKey.split('.')[2];
        switch (action) {
            case 'created':
                await this.genreRepo.create(data);
                console.log('criou');
                break;
            case 'updated':
                await this.genreRepo.updateById(data.id, data);
                break;
            case 'deleted':
                await this.genreRepo.deleteById(data.id);
                break;
        }
        ;
    }
};
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'micro-catalog/sync-videos/genre',
        routingKey: 'model.genre.*'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GenreSyncService.prototype, "handler", null);
GenreSyncService = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, repository_1.repository(repositories_1.GenreRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.GenreRepository])
], GenreSyncService);
exports.GenreSyncService = GenreSyncService;
//# sourceMappingURL=genre-sync.service.js.map