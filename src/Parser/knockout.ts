import MatchModel from '@/Model/match';
import KnockoutModel from '@/Model/knockout';
import ResultParser from '@/Parser/result';
import DataParser from '@/Parser/data';
import StadiumParser from '@/Parser/stadium';
import ChannelParser from '@/Parser/channel';
import GroupModel from '@/Model/group';
import TeamModel from '@/Model/team';

class KnockoutParser {
    public static knockoutmatches: any = [];
    public static parse(phases: any, groups: GroupModel[]): KnockoutModel[] {
        const output: KnockoutModel[] = [];
        Object.keys(phases).forEach((key) => {
            output.push(new KnockoutModel(
                phases[key].name,
                KnockoutParser.createKnockoutMatches(phases[key].matches, groups)))
            ;
        });
        return output;
    }

    private static createKnockoutMatches(matches: any, groups: GroupModel[]): MatchModel[] {
        const output: MatchModel[] = [];
        matches.forEach((match: any) => {
            const stadium = StadiumParser.getStadium(match.stadium);
            if (stadium) {
                const obj = new MatchModel(
                    match.name,
                    KnockoutParser.getKnockoutTeam(match.type, match.home_team, groups),
                    KnockoutParser.getKnockoutTeam(match.type, match.away_team, groups),
                    ResultParser.getResult(match, 'home'),
                    ResultParser.getResult(match, 'away'),
                    DataParser.getDate(match.date),
                    stadium,
                    ChannelParser.getChannels(match.channels))
                ;
                KnockoutParser.knockoutmatches.push({ name: match.name, obj });
                output.push(obj);
            }
        });
        return output;
    }

    private static getKnockoutTeam(type: string, matchteam: string, groups: GroupModel[]): string | TeamModel {
        let foundmatch;
        switch (type) {
            default:
            case 'qualified':
                const splitted = matchteam.split('_');
                const foundGroup = groups.find((group) => {
                    return group.getName() === splitted[1];
                });
                if (! foundGroup) {
                    throw new Error('Group not found in ' + matchteam);
                }

                if (splitted[0] === 'winner') {
                    return foundGroup.getFinished()
                        ? foundGroup.getStandings()[0].getTeam()
                        : 'Winner of group ' + foundGroup.getName().toUpperCase()
                    ;
                }

                return foundGroup.getFinished()
                    ? foundGroup.getStandings()[1].getTeam()
                    : 'Runner up group ' + foundGroup.getName().toUpperCase()
                ;
            case 'winner':
                foundmatch = KnockoutParser.findKnockoutMatch(matchteam);
                if (foundmatch) {
                    return foundmatch.getWinner();
                }
                return 'Winner of match ' + matchteam;
            case 'loser':
                foundmatch = KnockoutParser.findKnockoutMatch(matchteam);
                if (foundmatch) {
                    return foundmatch.getLoser();
                }
                return 'Loser of match ' + matchteam;
        }
    }

    private static findKnockoutMatch(matchteam: string): MatchModel | undefined {
        const found = KnockoutParser.knockoutmatches.find((match: any) => {
            return match.name === matchteam;
        });
        if (found) {
            return found.obj;
        }
        return undefined;
    }
}

export default KnockoutParser;
