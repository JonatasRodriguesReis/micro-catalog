"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
let TestService = class TestService {
    constructor( /* Add @inject to inject parameters */) { }
};
TestService = tslib_1.__decorate([
    core_1.injectable({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__metadata("design:paramtypes", [])
], TestService);
exports.TestService = TestService;
//# sourceMappingURL=test.service.js.map