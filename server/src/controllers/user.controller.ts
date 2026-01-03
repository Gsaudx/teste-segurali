import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { createUserSchema } from '../schemas/user.schema';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response) => {
    const data = createUserSchema.parse(req.body);
    const user = await this.userService.createUser(data);
    return res.status(201).json(user);
  };

  list = async (req: Request, res: Response) => {
    const users = await this.userService.listUsers();
    return res.json(users);
  };

  show = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    return res.json(user);
  };
}
