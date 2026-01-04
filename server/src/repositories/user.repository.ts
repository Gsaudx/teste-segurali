import { prisma } from '../lib/prisma';
import { CreateUserDTO } from '../schemas/user.schema';

export class UserRepository {
  async create(data: CreateUserDTO) {
    return prisma.user.create({
      data,
    });
  }

  async findAll(skip: number, take: number, name?: string) {
    const where = name ? {
      name: {
        contains: name,
        mode: 'insensitive' as const,
      }
    } : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        where,
        orderBy: {
          name: 'asc',
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
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
