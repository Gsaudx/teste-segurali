import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';

const userRoutes = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.post('/', userController.create);
userRoutes.get('/', userController.list);
userRoutes.get('/:id', userController.show);

export { userRoutes };
