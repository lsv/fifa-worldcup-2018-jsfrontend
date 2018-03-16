import MatchModel from '@/Model/match';

class StadiumModel {
    private id: number;
    private name: string;
    private lat: number;
    private lng: number;
    private matches: MatchModel[] = [];

    public constructor(id: number, name: string, lat: number, lng: number) {
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getLat(): number {
        return this.lat;
    }

    public getLng(): number {
        return this.lng;
    }

    public addMatch(match: MatchModel) {
        this.matches.push(match);
    }

    public getMatches(): MatchModel[] {
        return this.matches;
    }
}

export default StadiumModel;
