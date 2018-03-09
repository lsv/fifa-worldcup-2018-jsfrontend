import MatchModel from '@/Model/match';

class KnockoutModel {
    private name: string;
    private matches: MatchModel[];

    public constructor(name: string, matches: MatchModel[]) {
        this.name = name;
        this.matches = matches;
    }

    public getName(): string {
        return this.name;
    }

    public getMatches(): MatchModel[] {
        return this.matches;
    }
}

export default KnockoutModel;
