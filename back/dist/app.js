"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const fastify_1 = __importDefault(require("fastify"));
const env_1 = require("./config/env");
const _routers_1 = require("./http/router/@routers");
exports.app = (0, fastify_1.default)();
exports.app.setErrorHandler((error, _, reply) => {
    if (error.validation) {
        return reply
            .status(400)
            .send({ message: 'Erro de validação', details: error.validation });
    }
    if (env_1.env.NODE_ENV !== 'production') {
        console.error(error);
    }
    else {
        // DataDog
    }
    return reply.status(500).send({ message: 'Erro interno do servidor.' });
});
exports.app.register(_routers_1.routes);
