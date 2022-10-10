import TeamModel from '../database/models/team.model';
import ITeam from '../interface/ITeam';

export default class teamsService {
  constructor(private teamModel: typeof TeamModel) {}

  public async getAll(): Promise<ITeam[]> {
    const result = await this.teamModel.findAll();
    return result;
  }
}
