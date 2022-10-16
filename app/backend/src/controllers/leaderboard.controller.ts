import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  public getLeaderboard = async (req: Request, res: Response) => {
    const pathReq = req.path;

    const result = await this.leaderboardService.getLeaderboard(pathReq);
    res.status(200).json(result.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn));
  };
}
