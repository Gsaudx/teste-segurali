import { prisma } from '../lib/prisma';
import { CreateUserDTO } from '../schemas/user.schema';

export class UserRepository {
  async create(data: CreateUserDTO) {
    return prisma.user.create({
      data,
    });
  }

  async findAll() {
    return prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
