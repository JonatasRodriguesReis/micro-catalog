"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastMemberService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const decorators_1 = require("../decorators");
const repositories_1 = require("../repositories");
let CastMemberService = class CastMemberService {
    constructor(castMemberRepo) {
        this.castMemberRepo = castMemberRepo;
    }
    async handler({ data, message }) {
        const action = message.fields.routingKey.split('.')[2];
        switch (action) {
            case 'created':
                await this.castMemberRepo.create(data);
                break;
            case 'updated':
                await this.castMemberRepo.updateById(data.id, data);
                break;
            case 'deleted':
                await this.castMemberRepo.deleteById(data.id);
                break;
        }
        ;
    }
};
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'micro-catalog/sync-videos/cast_member',
        routingKey: 'model.cast_member.*'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CastMemberService.prototype, "handler", null);
CastMemberService = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, repository_1.repository(repositories_1.CastMemberRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CastMemberRepository])
], CastMemberService);
exports.CastMemberService = CastMemberService;
//# sourceMappingURL=cast-member.service.js.map