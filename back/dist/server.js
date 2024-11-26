"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const cors_1 = __importDefault(require("@fastify/cors"));
const env_1 = require("./config/env");
app_1.app.register(cors_1.default);
app_1.app
    .listen({
    host: '0.0.0.0',
    port: env_1.env.PORT,
})
    .then(() => {
    console.log(`🚀 HTTP server running in port ${env_1.env.PORT}`);
});
