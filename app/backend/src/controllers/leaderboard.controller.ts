import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  public getLeaderboardHome = async (req: Request, res: Response) => {
    const result = await this.leaderboardService.getLeaderboardHome();
    res.status(200).json(result.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn));
  };
}
