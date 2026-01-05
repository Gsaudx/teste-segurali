import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from './user.service';
import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../errors/AppError';

// Mock UserRepository
const userRepositoryMock = {
  create: vi.fn(),
  findAll: vi.fn(),
  findById: vi.fn(),
  findByEmail: vi.fn(),
} as unknown as UserRepository;

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(userRepositoryMock);
    vi.clearAllMocks();
  });

  describe('createUser', () => {
    it('Deve criar um usuário com sucesso', async () => {
      const userData = {
        name: 'Guilherme Saud',
        email: 'guilherme.saud@example.com',
        age: 25,
      };

      const createdUser = {
        id: 'user-id',
        ...userData,
        createdAt: new Date(),
      };

      vi.mocked(userRepositoryMock.findByEmail).mockResolvedValue(null);
      vi.mocked(userRepositoryMock.create).mockResolvedValue(createdUser);

      const result = await userService.createUser(userData);

      expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(userData.email);
      expect(userRepositoryMock.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(createdUser);
    });

    it('Deve lançar um erro se já existir um usuário com o mesmo e-mail', async () => {
      const userData = {
        name: 'Guilherme Saud',
        email: 'guilherme.saud@example.com',
        age: 25,
      };

      const existingUser = {
        id: 'existing-id',
        ...userData,
        createdAt: new Date(),
      };

      vi.mocked(userRepositoryMock.findByEmail).mockResolvedValue(existingUser);

      await expect(userService.createUser(userData)).rejects.toBeInstanceOf(AppError);
      await expect(userService.createUser(userData)).rejects.toThrow('Já existe um usuário com este e-mail');
      expect(userRepositoryMock.create).not.toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('Deve retornar um usuário se encontrado', async () => {
      const user = {
        id: 'user-id',
        name: 'Guilherme Saud',
        email: 'guilherme.saud@example.com',
        age: 25,
        createdAt: new Date(),
      };

      vi.mocked(userRepositoryMock.findById).mockResolvedValue(user);

      const result = await userService.getUserById('user-id');

      expect(userRepositoryMock.findById).toHaveBeenCalledWith('user-id');
      expect(result).toEqual(user);
    });

    it('Deve lançar um erro se o usuário não for encontrado', async () => {
      vi.mocked(userRepositoryMock.findById).mockResolvedValue(null);

      await expect(userService.getUserById('invalid-id')).rejects.toBeInstanceOf(AppError);
      await expect(userService.getUserById('invalid-id')).rejects.toThrow('Usuário não encontrado');
    });
  });

  describe('listUsers', () => {
    it('Deve retornar uma lista paginada de usuários', async () => {
      const users = [
        { id: '1', name: 'Guilherme Saud', email: 'guilherme.saud@example.com', age: 20, createdAt: new Date() },
        { id: '2', name: 'Francisca Segurali', email: 'francisca.segurali@example.com', age: 22, createdAt: new Date() },
      ];

      vi.mocked(userRepositoryMock.findAll).mockResolvedValue({
        users,
        total: 2,
      });

      const pagination = { page: 1, limit: 10 };
      const result = await userService.listUsers(pagination);

      expect(userRepositoryMock.findAll).toHaveBeenCalledWith(0, 10, undefined);
      expect(result).toEqual({
        data: users,
        meta: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1,
        },
      });
    });

    it('Deve filtrar usuários por nome', async () => {
      const users = [
        { id: '1', name: 'Guilherme Saud', email: 'guilherme.saud@example.com', age: 20, createdAt: new Date() },
      ];

      vi.mocked(userRepositoryMock.findAll).mockResolvedValue({
        users,
        total: 1,
      });

      const pagination = { page: 1, limit: 10, name: 'Guilherme' };
      const result = await userService.listUsers(pagination);

      expect(userRepositoryMock.findAll).toHaveBeenCalledWith(0, 10, 'Guilherme');
      expect(result.data).toHaveLength(1);
    });
  });
});
