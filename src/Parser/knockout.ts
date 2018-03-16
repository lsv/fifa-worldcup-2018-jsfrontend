import MatchModel from '@/Model/match';
import KnockoutModel from '@/Model/knockout';
import ResultParser from '@/Parser/result';
import DataParser from '@/Parser/data';
import StadiumParser from '@/Parser/stadium';
import ChannelParser from '@/Parser/channel';
import GroupModel from '@/Model/group';
import TeamModel from '@/Model/team';
import AppModel from '@/Model/app';

class KnockoutParser {
    public static knockoutmatches: any = [];
    public static parse(phases: any, groups: GroupModel[]): KnockoutModel[] {
        const output: KnockoutModel[] = [];
        Object.keys(phases).forEach((key) => {
            output.push(new KnockoutModel(
                key,
                phases[key].name,
                KnockoutParser.createKnockoutMatches(phases[key].matches, groups, phases[key].name)))
            ;
        });
        return output;
    }

    public static updateKnockouts(data: AppModel): AppModel {
        data.getKnockouts().forEach((k: KnockoutModel) => {
            k.getMatches().forEach((m: MatchModel) => {
                m.setHomeTeam(this.getKnockoutTeam(m.getType(), m.getRawHometeam(), data.getGroups()));
                m.setAwayTeam(this.getKnockoutTeam(m.getType(), m.getRawAwayteam(), data.getGroups()));
            });
        });

        return data;
    }

    private static createKnockoutMatches(matches: any, groups: GroupModel[], key: string): MatchModel[] {
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
                    ChannelParser.getChannels(match.channels),
                    match.type,
                    match.home_team,
                    match.away_team,
                    key)
                ;
                KnockoutParser.knockoutmatches.push({ name: match.name, obj });
                output.push(obj);
                stadium.addMatch(obj);
            }
        });
        return output;
    }

    private static getKnockoutTeam(type: string, matchteam: string | TeamModel, groups: GroupModel[]): string | TeamModel {
        let foundmatch;
        switch (type) {
            default:
                return matchteam;
            case 'qualified':
                if (typeof matchteam === 'string') {
                    const splitted = matchteam.split('_');
                    const foundGroup = groups.find((group) => {
                        return group.getName() === splitted[1];
                    });
                    if (!foundGroup) {
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
                }

                throw new Error('matchteam variable should be a string ' + matchteam + ' given');
            case 'winner':
                foundmatch = KnockoutParser.findKnockoutMatch(matchteam);
                if (foundmatch && foundmatch.isFinish()) {
                    return foundmatch.getWinner();
                }
                return 'Winner of match ' + matchteam;
            case 'loser':
                foundmatch = KnockoutParser.findKnockoutMatch(matchteam);
                if (foundmatch && foundmatch.isFinish()) {
                    return foundmatch.getLoser();
                }
                return 'Loser of match ' + matchteam;
        }
    }

    private static findKnockoutMatch(matchteam: string | TeamModel): MatchModel | undefined {
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
