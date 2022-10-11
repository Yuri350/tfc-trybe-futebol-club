import { Router } from 'express';
import Match from '../database/models/match.model';
import MatchController from '../controllers/match.controller';
import MatchService from '../services/match.service';
import Team from '../database/models/team.model';

const router = Router();

const matchService = new MatchService(Match, Team);
const matchController = new MatchController(matchService);

router.get('/', (req, res) => matchController.getAll(req, res));

export default router;
