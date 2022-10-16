import IGoals from '../../interface/IGoals';
import ITeam from '../../interface/ITeam';
import ILeaderboard from '../../interface/ILeaderboard';

export default class leaderboardCount {
  private obj: ILeaderboard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  public resetObj() {
    this.obj.name = '';
    this.obj.totalPoints = 0;
    this.obj.totalGames = 0;
    this.obj.totalVictories = 0;
    this.obj.totalDraws = 0;
    this.obj.totalLosses = 0;
    this.obj.goalsFavor = 0;
    this.obj.goalsOwn = 0;
    this.obj.goalsBalance = 0;
    this.obj.efficiency = 0;
  }

  public async getCountsLeaderboard(resultTeam: ITeam[], resultMatch: IGoals[]) {
    const teamsName: ILeaderboard[] = resultTeam.map((el: ITeam) => {
      this.resetObj();
      this.obj.name = el.teamName;
      resultMatch.forEach((elR) => {
        if (elR.homeTeam === el.id) {
          this.points(elR);
        }
      });
      return { ...this.obj };
    });
    return teamsName;
  }

  private points(elR: IGoals) {
    this.obj.totalVictories += elR.awayTeamGoals < elR.homeTeamGoals ? 1 : 0;
    this.obj.totalDraws += elR.awayTeamGoals === elR.homeTeamGoals ? 1 : 0;

    this.obj.totalPoints = (this.obj.totalVictories * 3) + this.obj.totalDraws;

    // P/(J*3)*100

    this.obj.totalGames += 1;
    this.obj.efficiency = Number(
      ((this.obj.totalPoints / (this.obj.totalGames * 3)) * 100).toFixed(2),
    );

    // totalLosses
    this.obj.totalLosses += elR.awayTeamGoals > elR.homeTeamGoals ? 1 : 0;

    // goalsFavor
    this.obj.goalsFavor += elR.homeTeamGoals;

    // goalsOwn
    this.obj.goalsOwn += elR.awayTeamGoals;

    // goalsBalance
    this.obj.goalsBalance = (this.obj.goalsFavor - this.obj.goalsOwn);

    // if (elR.awayTeamGoals < elR.homeTeamGoals) {
    //   this.obj.totalPoints += 3;
    // } else if (elR.awayTeamGoals === elR.homeTeamGoals) {
    //   this.obj.totalDraws += 1;
    // }
  }
}
