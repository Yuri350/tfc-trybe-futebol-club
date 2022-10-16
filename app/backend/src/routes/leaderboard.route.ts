import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import LeaderboardService from '../services/leaderboard.service';
import MatchService from '../services/match.service';
import TeamService from '../services/team.service';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';

const router = Router();

const matchService = new MatchService(Match, Team);
const teamService = new TeamService(Team);
const leaderboardService = new LeaderboardService(matchService, teamService);
const leaderboardController = new LeaderboardController(leaderboardService);

router.get('/home', (req, res) => leaderboardController.getLeaderboard(req, res));
router.get('/away', (req, res) => leaderboardController.getLeaderboard(req, res));
router.get('/', (req, res) => leaderboardController.getLeaderboard(req, res));

export default router;
