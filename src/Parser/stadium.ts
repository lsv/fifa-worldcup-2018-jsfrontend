import StadiumModel from '@/Model/stadium';

class StadiumParser {
    public static parse(stadiums: any[]): StadiumModel[] {
        stadiums.forEach((stadium: any) => {
            StadiumParser.stadiums.push(new StadiumModel(stadium.id, stadium.name, stadium.lat, stadium.lng));
        });
        return this.stadiums;
    }

    public static getStadium(stadium: number): StadiumModel|undefined {
        return StadiumParser.stadiums.find( (model) => model.getId() === stadium);
    }

    private static stadiums: StadiumModel[] = [];
}

export default StadiumParser;
