"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var crud_controller_1 = require("../crud-controller");
var UserController = /** @class */ (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserController.prototype.create = function (req, res) {
        throw new Error("Method not implemented.");
    };
    UserController.prototype.read = function (req, res) {
        res.json({ message: 'GET /user request received' });
    };
    UserController.prototype.update = function (req, res) {
        throw new Error("Method not implemented.");
    };
    UserController.prototype.delete = function (req, res) {
        throw new Error("Method not implemented.");
    };
    return UserController;
}(crud_controller_1.CrudController));
exports.UserController = UserController;
