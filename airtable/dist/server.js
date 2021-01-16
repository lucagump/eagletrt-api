"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var config_1 = require("./config/config");
var routes_1 = require("./routes");
var app = express_1.default();
app.use(express_1.default.json());
app.use('/users', routes_1.userRouter);
app.listen(config_1.PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:" + config_1.PORT + "\u26A1\uFE0F");
});
