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

  // Criando Categorias
  const categorias = [
    { nome: 'Higiene Bucal' },
    { nome: 'Instrumentos Clínicos' },
    { nome: 'Materiais de Limpeza' },
    { nome: 'Medicamentos' },
    { nome: 'Acessórios de Proteção' },
  ];

  const categoriasCriadas = [];
  for (const categoria of categorias) {
    const novaCategoria = await prisma.categoria.create({ data: categoria });
    categoriasCriadas.push(novaCategoria);
    console.log('Categoria criada:', novaCategoria);
  }

  // Criando uma Marca
  const marca = await prisma.marca.create({
    data: {
      nome: 'Marca XYZ',
    },
  });

  console.log('Marca criada:', marca);

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

  // Criando vários produtos com categorias diferentes
  const produtos = [
    { nome: 'Escova de Dentes', descricao: 'Escova modelo X', preco: 15.50, categoria: categoriasCriadas[0] },
    { nome: 'Fio Dental', descricao: 'Fio dental de alta qualidade', preco: 7.90, categoria: categoriasCriadas[0] },
    { nome: 'Alicate Odontológico', descricao: 'Alicate para extração de dentes', preco: 120.00, categoria: categoriasCriadas[1] },
    { nome: 'Máscara Cirúrgica', descricao: 'Máscara descartável', preco: 1.50, categoria: categoriasCriadas[4] },
    { nome: 'Álcool 70%', descricao: 'Álcool em gel para assepsia', preco: 12.00, categoria: categoriasCriadas[2] },
    { nome: 'Antisséptico Bucal', descricao: 'Antisséptico para enxágue bucal', preco: 14.00, categoria: categoriasCriadas[0] },
    { nome: 'Luvas Descartáveis', descricao: 'Luvas de látex para procedimentos', preco: 20.00, categoria: categoriasCriadas[4] },
    { nome: 'Anestésico Dental', descricao: 'Medicamento para anestesia local', preco: 50.00, categoria: categoriasCriadas[3] },
    { nome: 'Creme Dental', descricao: 'Creme dental para dentes sensíveis', preco: 8.50, categoria: categoriasCriadas[0] },
    { nome: 'Kit Higiene Bucal', descricao: 'Kit com escova, fio e creme dental', preco: 25.00, categoria: categoriasCriadas[0] },
  ];

  for (const produtoData of produtos) {
    const produto = await prisma.produto.create({
      data: {
        nome: produtoData.nome,
        descricao: produtoData.descricao,
        data_validade: new Date('2025-12-31'),
        unidade_medida: 'un',
        fornecedor: 'azzo',
        id_categoria: produtoData.categoria.id,
        id_marca: marca.id,
        preco: produtoData.preco,
        id_usuario_atualizacao: usuarioAdm.id,
        id_usuario_cadastro: usuarioAdm.id,
        status: true,
        id_clinica: clinica.id,
      },
    });

    console.log('Produto criado:', produto);

    // Criando Estoque mais realista para cada produto
    const estoqueInicial = Math.floor(Math.random() * 50) + 50; // Quantidade inicial entre 50 e 100
    const quantidadeMinima = Math.floor(Math.random() * 10) + 5; // Quantidade mínima entre 5 e 15

    await prisma.estoque.create({
      data: {
        id_produto: produto.id,
        id_clinica: clinica.id,
        estoque: estoqueInicial,
        quantidade_minima: quantidadeMinima,
      },
    });

    console.log(`Estoque criado para o produto: ${produto.nome}, Quantidade: ${estoqueInicial}, Mínima: ${quantidadeMinima}`);

    // Criando movimentações (entrada, saída e uso) para cada produto
    for (let i = 1; i <= 5; i++) {
      // Movimentação de entrada
      const movimentacaoEntrada = await prisma.movimentacao.create({
        data: {
          tipo: 'entrada',
          destino: `Armazém ${i}`,
          estorno: false,
          id_usuario: usuarioAdm.id,
          id_clinica: clinica.id,
        },
      });

      await prisma.movimentacaoProduto.create({
        data: {
          id_movimentacao: movimentacaoEntrada.id,
          id_produto: produto.id,
          quantidade: 10 * i, // Incrementa a quantidade
          estorno: false,
        },
      });

      console.log(`Movimentação de entrada criada para o produto: ${produto.nome}, Quantidade: ${10 * i}`);

      // Movimentação de saída
      const movimentacaoSaida = await prisma.movimentacao.create({
        data: {
          tipo: 'saida',
          destino: `Consultório ${i}`,
          estorno: false,
          id_usuario: usuarioAdm.id,
          id_clinica: clinica.id,
        },
      });

      await prisma.movimentacaoProduto.create({
        data: {
          id_movimentacao: movimentacaoSaida.id,
          id_produto: produto.id,
          quantidade: 5 * i, // Incrementa a quantidade
          estorno: false,
        },
      });

      console.log(`Movimentação de saída criada para o produto: ${produto.nome}, Quantidade: ${5 * i}`);

      // Movimentação de uso
      const movimentacaoUso = await prisma.movimentacao.create({
        data: {
          tipo: 'uso',
          destino: `Paciente ${i}`,
          estorno: false,
          id_usuario: usuarioAdm.id,
          id_clinica: clinica.id,
        },
      });

      await prisma.movimentacaoProduto.create({
        data: {
          id_movimentacao: movimentacaoUso.id,
          id_produto: produto.id,
          quantidade: 2 * i, // Incrementa a quantidade
          estorno: false,
        },
      });

      console.log(`Movimentação de uso criada para o produto: ${produto.nome}, Quantidade: ${2 * i}`);
    }
  }
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
