import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const clinica = await prisma.clinica.create({
    data: {
      nome: 'Clínica Odonto Bem',
      endereco: 'Rua das Flores, 123',
      telefone: '11 98765-4321',
      status: true,
    },
  });
}
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
