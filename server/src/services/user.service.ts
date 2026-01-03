import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../schemas/user.schema';
import { AppError } from '../errors/AppError';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: CreateUserDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new AppError('User already exists', 409);
    }

    return this.userRepository.create(data);
  }

  async listUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
