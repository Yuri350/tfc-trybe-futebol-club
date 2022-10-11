import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private matchService: MatchService) {}

  public getAll = async (req: Request, res: Response) => {
    const result = await this.matchService.getAll();
    return res.status(200).json(result);
  };
}
