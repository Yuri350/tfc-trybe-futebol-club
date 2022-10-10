import TeamModel from '../database/models/team.model';
import ITeam from '../interface/ITeam';

export default class teamsService {
  constructor(private teamModel: typeof TeamModel) {}

  public async getAll(): Promise<ITeam[]> {
    const result = await this.teamModel.findAll();
    return result;
  }

  public async getId(id: number): Promise<ITeam | null> {
    const result = await this.teamModel.findByPk(id);
    return result as ITeam || null;
  }
}
