"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = routes;
const app_1 = require("../../app");
const move_router_1 = require("./move-router");
const produto_router_1 = require("./produto-router");
const user_router_1 = require("./user-router");
async function routes() {
    app_1.app.register(user_router_1.userRouter);
    app_1.app.register(produto_router_1.productRouter);
    app_1.app.register(move_router_1.moveRouter);
}
