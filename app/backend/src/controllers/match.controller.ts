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

      const messageTeam = 'It is not possible to create a match with two equal teams'; // 25
      const messageTeam2 = 'There is no team with such id!';

      const { homeTeam, awayTeam } = result;
      const HT = await this.matchService.getById(homeTeam);
      const AT = await this.matchService.getById(awayTeam); // 25

      if (HT === AT) return res.status(404).json({ message: messageTeam }); // 25

      if (!HT || !AT) return res.status(404).json({ message: messageTeam2 }); // 26

      const newMatch = await this.matchService.postInProgress(result);
      return res.status(201).json(newMatch);
    } catch (error) {
      res.status(404).json({ message: 'There is no team with such id!' });
    }
  };

  public getByIdFinish = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const inProgress = false;

      const result = await this.matchService.getByIdFinish(Number(id), inProgress);
      req.body.match = result;
      res.status(200).json({ message: 'Finished' });
    } catch (error) {
      res.status(404).json({ message: 'Error 404: not found' });
    }
  };
}
