import MatchService from './match.service';
import TeamService from './team.service';
import LeaderboardCount from './utilities/leaderboardCounts';

export default class leaderboardService { // implementado para nao quebrar o codigo
  constructor(private matchService: MatchService, private teamService: TeamService) {}

  private leaderboardCount = new LeaderboardCount();

  public async getLeaderboard(pathRe: string) {
    const resultTeam = await this.teamService.getAll();
    const resultMatch = await this.matchService.getAllFinished();

    const resultCount = this.leaderboardCount.getCountsLeaderboard(resultTeam, resultMatch, pathRe);

    return resultCount;
  }
}
