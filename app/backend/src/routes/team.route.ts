import { Router } from 'express';
import Team from '../database/models/team.model';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/team.service';

const router = Router();

const teamsService = new TeamsService(Team);
const teamsController = new TeamsController(teamsService);

router.get('/:id', (req, res) => teamsController.getId(req, res));
router.get('/', (req, res) => teamsController.getAll(req, res));

export default router;
