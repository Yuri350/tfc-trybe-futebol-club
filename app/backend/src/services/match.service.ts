import IMatch from '../interface/IMatch';
import MatchModel from '../database/models/match.model';
import Team from '../database/models/team.model';

interface StatusError extends Error { // duplicada no arquivo user
  message: string,
  status: number,
}

const catchError = (status: number, message: string) => {
  const error: StatusError = { message, status, name: 'error' };
  return error;
};

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
    const result = await this.team.findByPk(id);
    return result;
  }

  // public async getById(match: number) {
  //   const result = await this.matchModel.findOne({ where: { id: match } });
  //   return result;
  // }

  public async postInProgress(match: IMatch) {
    const result = await this.matchModel.create(match);
    return result as unknown as IMatch;
  }

  public async updateByIdFinish(id: number, inProgress: boolean) {
    await this.matchModel.update({ inProgress }, { where: { id } });
    const result = await this.matchModel.findOne({ where: { id } });
    return result;
    // update: pega o inProgress e procura o id dele
  }

  public async patchUpdate(date: IMatch, id: number): Promise<void> {
    const [result] = await this.matchModel.update(
      { awayTeamGoals: date.awayTeamGoals, homeTeamGoals: date.homeTeamGoals },
      { where: { id } },
    );
    if (result === 0) throw catchError(400, 'It is not possible to update a match');
  }

  public async getAllFinished() {
    const result = await this.matchModel.findAll({ where: { inProgress: false } });
    return result;
  }
}
