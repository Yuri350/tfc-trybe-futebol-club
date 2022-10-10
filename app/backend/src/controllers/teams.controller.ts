import { Request, Response } from 'express';
import TeamsService from '../services/team.service';

export default class TeamsController {
  constructor(private teamsService: TeamsService) {}

  public getAll = async (req: Request, res: Response) => {
    const result = await this.teamsService.getAll();
    return res.status(200).json(result);
  };
}
