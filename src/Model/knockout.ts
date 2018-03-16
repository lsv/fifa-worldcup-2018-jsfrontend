import MatchModel from '@/Model/match';

class KnockoutModel {
    private id: string;
    private name: string;
    private matches: MatchModel[];

    public constructor(id: string, name: string, matches: MatchModel[]) {
        this.id = id;
        this.name = name;
        this.matches = matches;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getMatches(): MatchModel[] {
        return this.matches;
    }
}

export default KnockoutModel;
