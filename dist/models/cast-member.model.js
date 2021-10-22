"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastMember = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CastMember = class CastMember extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], CastMember.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        generated: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], CastMember.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        generated: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], CastMember.prototype, "type", void 0);
CastMember = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CastMember);
exports.CastMember = CastMember;
//# sourceMappingURL=cast-member.model.js.map