import { PrismaClient } from '@prisma/client';

// Inicializa o Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Criando uma Clínica
  const clinica = await prisma.clinica.create({
    data: {
      nome: 'Clínica Odonto Bem',
      endereco: 'Rua das Flores, 123',
      telefone: '11 98765-4321',
      status: true,
    },
  });

  console.log('Clínica criada:', clinica);

  // Criando uma Marca
  const marca = await prisma.marca.create({
    data: {
      nome: 'Marca XYZ',
    },
  });

  console.log('Marca criada:', marca);

  // Criando uma Categoria
  const categoria = await prisma.categoria.create({
    data: {
      nome: 'Higiene Bucal',
    },
  });

  console.log('Categoria criada:', categoria);

  // Criando Usuário Administrador (ADM)
  const usuarioAdm = await prisma.usuario.create({
    data: {
      nome_usuario: 'admin',
      senha: 'senha123', // Aqui, em produção, utilize uma senha hash
      cpf: '12345678901',
      email: 'admin@clinica.com',
      status: true,
      id_clinica: clinica.id,
    },
  });

  console.log('Usuário ADM criado:', usuarioAdm);

  // Criando Produto
  const produto = await prisma.produto.create({
    data: {
      nome: 'Escova de Dentes',
      descricao: 'Escova de dentes modelo X para uso geral.',
      data_validade: new Date('2025-12-31'),
      unidade_medida: 'un',
      id_categoria: categoria.id,
      id_marca: marca.id,
      preco: 15.50,
      id_usuario_atualizacao: usuarioAdm.id,
      id_usuario_cadastro: usuarioAdm.id,
      status: true,
      id_clinica: clinica.id,
    },
  });

  console.log('Produto criado:', produto);

  // Criando Estoque
  await prisma.estoque.create({
    data: {
      id_produto: produto.id,
      id_clinica: clinica.id,
      estoque: 100,
      quantidade_minima: 10,
    },
  });

  console.log('Estoque criado para o produto:', produto.nome);

  // Criando Movimentação (entrada de estoque)
  const movimentacaoEntrada = await prisma.movimentacao.create({
    data: {
      tipo: 'entrada',
      destino: 'Armazém Principal',
      estorno: false,
      id_usuario: usuarioAdm.id,
      id_clinica: clinica.id,
    },
  });

  console.log('Movimentação criada (entrada):', movimentacaoEntrada);

  // Movimentando o Produto (entrada no estoque)
  await prisma.movimentacaoProduto.create({
    data: {
      id_movimentacao: movimentacaoEntrada.id,
      id_produto: produto.id,
      quantidade: 50,  // Quantidade movimentada
      estorno: false,
    },
  });

  console.log('Produto movimentado para o estoque de entrada');

  // Criando Movimentação (saída de estoque)
  const movimentacaoSaida = await prisma.movimentacao.create({
    data: {
      tipo: 'saida',
      destino: 'Consultório 01',
      estorno: false,
      id_usuario: usuarioAdm.id,
      id_clinica: clinica.id,
    },
  });

  console.log('Movimentação criada (saída):', movimentacaoSaida);

  // Movimentando o Produto (saída do estoque)
  await prisma.movimentacaoProduto.create({
    data: {
      id_movimentacao: movimentacaoSaida.id,
      id_produto: produto.id,
      quantidade: 30,  // Quantidade movimentada
      estorno: false,
    },
  });

  console.log('Produto movimentado para o consultório');
}

// Executando o script de seed
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
