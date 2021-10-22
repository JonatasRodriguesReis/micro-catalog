"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Category = class Category extends repository_1.Entity {
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
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: false,
        default: ''
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: "boolean",
        required: false,
        default: true
    }),
    tslib_1.__metadata("design:type", Boolean)
], Category.prototype, "isActive", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        type: 'date',
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        type: 'date',
        required: true
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "updatedAt", void 0);
Category = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Category);
exports.Category = Category;
//# sourceMappingURL=category.model.js.map