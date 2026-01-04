import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO, PaginationDTO } from '../schemas/user.schema';
import { AppError } from '../errors/AppError';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: CreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError('Já existe um usuário com este e-mail', 409);
    }

    return this.userRepository.create(data);
  }

  async listUsers({ page, limit, name }: PaginationDTO) {
    const skip = (page - 1) * limit;
    const { users, total } = await this.userRepository.findAll(skip, limit, name);

    return {
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return user;
  }
}
