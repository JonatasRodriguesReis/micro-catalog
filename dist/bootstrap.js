"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
dotenv_1.config({ path: path_1.join(__dirname, '../.env') });
console.log('config .env', process.env.ELASTIC_SEARCH_HOST);
//# sourceMappingURL=bootstrap.js.map