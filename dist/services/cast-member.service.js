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
    async handlerCreated({ data }) {
        console.log('created', data);
        const { id, name, type } = data;
        await this.castMemberRepo.create({
            id, name, type
        });
    }
    async handlerUpdated({ data }) {
        console.log('updated', data);
        const { id, name, type } = data;
        await this.castMemberRepo.updateById(id, {
            name, type
        });
    }
    async handlerDeleted({ data }) {
        console.log('deleted', data);
        const { id } = data;
        await this.castMemberRepo.deleteById(id);
    }
};
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'castMemberCreated',
        routingKey: 'model.castMember.created'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CastMemberService.prototype, "handlerCreated", null);
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'castMemberUpdated',
        routingKey: 'model.castMember.updated'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CastMemberService.prototype, "handlerUpdated", null);
tslib_1.__decorate([
    decorators_1.rabbitmqSubscriber({
        exchange: 'amq.topic',
        queue: 'castMemberDeleted',
        routingKey: 'model.castMember.deleted'
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CastMemberService.prototype, "handlerDeleted", null);
CastMemberService = tslib_1.__decorate([
    core_1.bind({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, repository_1.repository(repositories_1.CastMemberRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CastMemberRepository])
], CastMemberService);
exports.CastMemberService = CastMemberService;
//# sourceMappingURL=cast-member.service.js.map