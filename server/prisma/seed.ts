import { prisma } from '../src/lib/prisma';

async function main() {
  const users = [
    {
      name: 'Guilherme Saud',
      email: 'guilherme@example.com',
      age: 20,
    },
    {
      name: 'Francisca Segurali',
      email: 'francisca@example.com',
      age: 25,
    },
    {
      name: 'Danilo Navarro',
      email: 'danilo.navarro@example.com',
      age: 25,
    },
    {
      name: 'Francisco Navarro',
      email: 'francisco.navarro@example.com',
      age: 22,
    },
    {
      name: 'Sergio Brogna',
      email: 'sergio.brogna@example.com',
      age: 45,
    },
    {
      name: 'Ana Santos',
      email: 'ana.santos@example.com',
      age: 28,
    },
    {
      name: 'Pedro Costa',
      email: 'pedro.costa@example.com',
      age: 50,
    },
    {
      name: 'Lucia Ferreira',
      email: 'lucia.ferreira@example.com',
      age: 40,
    },
    {
      name: 'Roberto Almeida',
      email: 'roberto.almeida@example.com',
      age: 33,
    },
    {
      name: 'Fernanda Lima',
      email: 'fernanda.lima@example.com',
      age: 27,
    },
    {
      name: 'Ricardo Gomes',
      email: 'ricardo.gomes@example.com',
      age: 38,
    },
    {
      name: 'Patricia Barbosa',
      email: 'patricia.barbosa@example.com',
      age: 29,
    },
  ];

  for (const user of users) {
    const userExists = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userExists) {
      await prisma.user.create({
        data: user,
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
