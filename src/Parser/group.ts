import GroupModel from '@/Model/group';
import MatchModel from '@/Model/match';
import StandingModel from '@/Model/standing';
import TeamParser from '@/Parser/team';
import ResultParser from '@/Parser/result';
import DataParser from '@/Parser/data';
import StadiumParser from '@/Parser/stadium';
import ChannelParser from '@/Parser/channel';

class GroupParser {
    public static parse(groupdata: any): GroupModel[] {
        const models: GroupModel[] = [];
        Object.keys(groupdata).forEach((key) => {
            const matches = GroupParser.createMatches(groupdata[key].matches);
            models.push(new GroupModel(key, GroupParser.createStandings(matches), matches, GroupParser.finished));
        });
        return models;
    }

    private static finished: boolean = false;

    private static createMatches(data: any): MatchModel[] {
        GroupParser.finished = false;
        const matches: MatchModel[] = [];
        data.forEach((match: any) => {
            const hometeam = TeamParser.getTeam(match.home_team);
            const awayteam = TeamParser.getTeam(match.away_team);
            const stadium = StadiumParser.getStadium(match.stadium);
            if (hometeam && awayteam && stadium) {
                const object = new MatchModel(
                    match.name,
                    hometeam,
                    awayteam,
                    ResultParser.getResult(match, 'home'),
                    ResultParser.getResult(match, 'away'),
                    DataParser.getDate(match.date),
                    stadium,
                    ChannelParser.getChannels(match.channels))
                ;

                if (object.getHomeResult() !== null || object.getAwayResult() !== null) {
                    GroupParser.finished = true;
                }

                matches.push(object);
            }
        });

        return matches;
    }

    private static createStandings(matches: MatchModel[]): StandingModel[] {
        let standings: StandingModel[] = [];
        matches.forEach((match) => {
            standings = GroupParser.parseStandingMatch(standings, match, true);
            standings = GroupParser.parseStandingMatch(standings, match, false);
        });
        return standings;
    }

    private static parseStandingMatch(standings: StandingModel[], match: MatchModel, isHometeam: boolean): StandingModel[] {
        const team = isHometeam ? match.getHomeTeam() : match.getAwayTeam();
        let index = standings.findIndex((value) => value.getTeam() === team);
        if (! index) {
            standings.push(new StandingModel(team));
            index = standings.findIndex((value) => value.getTeam() === team);
        }
        const standing = standings[index];

        if (match.getHomeResult() !== null && match.getAwayResult() !== null) {
            standing.addPlayed();
            if (isHometeam) {
                standing.addGoalsFor(match.getHomeResult());
                standing.addGoalsAgainst(match.getAwayResult());
                if (match.getHomeResult() === match.getAwayResult()) {
                    standing.addDraw();
                } else if (match.getHomeResult() > match.getAwayResult()) {
                    standing.addWin();
                } else {
                    standing.addLost();
                }
            } else {
                standing.addGoalsFor(match.getAwayResult());
                standing.addGoalsAgainst(match.getHomeResult());
                if (match.getHomeResult() === match.getAwayResult()) {
                    standing.addDraw();
                } else if (match.getHomeResult() < match.getAwayResult()) {
                    standing.addWin();
                } else {
                    standing.addLost();
                }
            }
        }

        return standings;
    }
}

export default GroupParser;
