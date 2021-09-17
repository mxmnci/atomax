"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(config_1.port, () => {
    console.log(`App listening at http://localhost:${config_1.port}`);
});
exports.default = app;
//# sourceMappingURL=express.js.map