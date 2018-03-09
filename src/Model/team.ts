class TeamModel {
    private id: number;
    private name: string;
    private iso2: string;

    public constructor(id: number, name: string, iso2: string) {
        this.id = id;
        this.name = name;
        this.iso2 = iso2;
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getIso2() {
        return this.iso2;
    }
}

export default TeamModel;
