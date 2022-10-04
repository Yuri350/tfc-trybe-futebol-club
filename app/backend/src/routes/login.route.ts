import { Router } from 'express';
import UserController from '../controllers/user.controller';


const router = Router();

const UserController = new UserController();

router.route('/').post(userController.login);

export default router;