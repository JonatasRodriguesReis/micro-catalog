"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastMemberRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let CastMemberRepository = class CastMemberRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.CastMember, dataSource);
    }
};
CastMemberRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.esv7')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.Esv7DataSource])
], CastMemberRepository);
exports.CastMemberRepository = CastMemberRepository;
//# sourceMappingURL=cast-member.repository.js.map