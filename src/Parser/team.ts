import TeamModel from '@/Model/team';

class TeamParser {
    public static parse(teams: any[]) {
        teams.forEach((team: any) => {
            TeamParser.teams.push(new TeamModel(team.id, team.name, team.iso2));
        });
    }

    public static getTeam(team: number): TeamModel|undefined {
        return TeamParser.teams.find( (model) => model.getId() === team);
    }

    private static teams: TeamModel[] = [];
}

export default TeamParser;
