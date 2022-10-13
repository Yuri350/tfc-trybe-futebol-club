import IMatch from '../interface/IMatch';
import MatchModel from '../database/models/match.model';
import Team from '../database/models/team.model';

export default class MatchService {
  constructor(private matchModel: typeof MatchModel, private team: typeof Team) {}

  public async getAll() {
    const result = await this.matchModel.findAll({
      include: [
        { model: this.team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this.team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    console.log('esse 1 ---->', result);
    return result;
  }

  public async getById(id: number) {
    const result = await this.matchModel.findByPk(id);
    return result;
  }

  public async postInProgress(match: IMatch) {
    const result = await this.matchModel.create(match);
    return result as unknown as IMatch;
  }
}
