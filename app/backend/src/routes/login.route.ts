import { Router } from 'express';
import UserService from '../services/user.service';
import UserController from '../controllers/user.controller';
import Users from '../database/models/user.model';

const router = Router();

const usersService = new UserService(Users);
const userController = new UserController(usersService);

router.post('/', (req, res) => userController.login(req, res));
// router.get('/', (req, res) => userController.getAll(req, res));

export default router;
