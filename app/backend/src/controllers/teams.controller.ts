import { Request, Response } from 'express';
import TeamsService from '../services/team.service';

export default class TeamsController {
  constructor(private teamsService: TeamsService) {}

  public getAll = async (req: Request, res: Response) => {
    const result = await this.teamsService.getAll();
    return res.status(200).json(result);
  };

  public getId = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('esse ----->', typeof id);
    if (!id) return res.status(422).json({ message: 'id not found' });

    const idInt = parseInt(id, 10);

    const result = await this.teamsService.getId(idInt);
    if (!result) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(result);
  };
}
