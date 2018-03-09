import StandingModel from '@/Model/standing';
import MatchModel from '@/Model/match';

class GroupModel {
    private name: string;
    private standings: StandingModel[];
    private matches: MatchModel[];
    private finished: boolean;

    public constructor(name: string, standings: StandingModel[], matches: MatchModel[], finished: boolean) {
        this.name = name;
        this.standings = standings;
        this.matches = matches;
        this.finished = finished;
    }

    public getName(): string {
        return this.name;
    }

    public getStandings(): StandingModel[] {
        return this.standings;
    }

    public getMatches(): MatchModel[] {
        return this.matches;
    }

    public getFinished(): boolean {
        return this.finished;
    }
}

export default GroupModel;
