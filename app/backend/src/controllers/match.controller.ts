import { Request, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private matchService: MatchService) {}

  public getAll = async (req: Request, res: Response) => {
    const result = await this.matchService.getAll();
    return res.status(200).json(result);
  };

  public postInProgress = async (req: Request, res: Response) => {
    try {
      const result = req.body;

      const newMatch = await this.matchService.postInProgress(result);
      return res.status(201).json(newMatch);
    } catch (error) {
      res.status(404).json({ message: 'There is no team with such id!' });
    }
  };
}
