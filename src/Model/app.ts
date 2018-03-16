import GroupModel from '@/Model/group';
import KnockoutModel from '@/Model/knockout';
import StadiumModel from '@/Model/stadium';

class AppModel {
    private groups: GroupModel[];
    private knockouts: KnockoutModel[];
    private stadiums: StadiumModel[];

    public constructor(groups: GroupModel[], knockouts: KnockoutModel[], stadiums: StadiumModel[]) {
        this.groups = groups;
        this.knockouts = knockouts;
        this.stadiums = stadiums;
    }

    public getGroups(): GroupModel[] {
        return this.groups;
    }

    public getKnockouts(): KnockoutModel[] {
        return this.knockouts;
    }

    public getStadiums(): StadiumModel[] {
        return this.stadiums;
    }
}

export default AppModel;
