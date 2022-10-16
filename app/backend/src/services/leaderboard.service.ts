import MatchService from './match.service';
import TeamService from './team.service';
import LeaderboardCount from './utilities/leaderboardCounts';

// type teams = 'homeTeam' | 'awayTeam';

export default class leaderboardService { // implementado para nao quebrar o codigo
  constructor(private matchService: MatchService, private teamService: TeamService) {}

  private leaderboardCount = new LeaderboardCount();

  public async getLeaderboardHome() {
    const resultTeam = await this.teamService.getAll();
    const resultMatch = await this.matchService.getAllFinished();

    const resultCount = this.leaderboardCount.getCountsLeaderboard(resultTeam, resultMatch);

    return resultCount;
  }
}
