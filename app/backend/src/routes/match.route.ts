import { Router } from 'express';
import Match from '../database/models/match.model';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import Team from '../database/models/team.model';
import validation from '../middleware/tokenValidation';

const router = Router();

const matchService = new MatchService(Match, Team);
const matchController = new MatchController(matchService);

router.get('/', (req, res) => matchController.getAll(req, res));
router.post('/', validation, (req, res) => matchController.postInProgress(req, res));
router.patch('/:id/finish', (req, res) => matchController.pathByIdFinish(req, res));

// o patch pega a informação que ja existe e modifica uma delas

export default router;
