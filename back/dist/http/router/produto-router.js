"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = productRouter;
const productController_1 = require("../controller/productController");
const app_1 = require("../../app");
const produto_prisma_1 = require("../../repositories/prisma/produto-prisma");
const controller = new productController_1.ProductController(new produto_prisma_1.ProdutoPrismaRepository);
async function productRouter() {
    app_1.app.post('/product', (req, reply) => controller.create(req, reply));
    app_1.app.post('/product/uso', (req, reply) => controller.newProdutoUso(req, reply));
    app_1.app.get('/products', (req, reply) => controller.findAll(req, reply));
    app_1.app.get('/product', (req, reply) => controller.findById(req, reply));
    app_1.app.put('/product', (req, reply) => controller.update(req, reply));
    app_1.app.get('/product/buscar', (req, reply) => controller.buscar(req, reply));
    app_1.app.get('/products/uso', (req, reply) => controller.produtoUsoList(req, reply));
    app_1.app.put('/product/uso/saida', (req, reply) => controller.removerProdutoUso(req, reply));
    app_1.app.get('/home', (req, reply) => controller.home(req, reply));
}
