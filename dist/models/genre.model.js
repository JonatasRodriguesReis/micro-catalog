"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Genre = class Genre extends repository_1.Entity {
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
], Genre.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        generated: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Genre.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: "boolean",
        generated: false,
        required: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Genre.prototype, "isActive", void 0);
Genre = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Genre);
exports.Genre = Genre;
//# sourceMappingURL=genre.model.js.map