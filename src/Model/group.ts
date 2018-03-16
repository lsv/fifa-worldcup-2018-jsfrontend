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

    public getDisplayName(): string {
        return this.getName().toUpperCase();
    }

    public getStandings(): StandingModel[] {
        return this.standings;
    }

    public setStandings(standings: StandingModel[]) {
        this.standings = standings;
    }

    public getMatches(): MatchModel[] {
        return this.matches;
    }

    public getFinished(): boolean {
        return this.finished;
    }

    public setFinish(finish: boolean) {
        this.finished = finish;
    }
}

export default GroupModel;
