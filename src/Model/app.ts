import GroupModel from '@/Model/group';
import KnockoutModel from '@/Model/knockout';

class AppModel {
    private groups: GroupModel[];
    private knockouts: KnockoutModel[];

    public constructor(groups: GroupModel[], knockouts: KnockoutModel[]) {
        this.groups = groups;
        this.knockouts = knockouts;
    }

    public getGroups(): GroupModel[] {
        return this.groups;
    }

    public getKnockouts(): KnockoutModel[] {
        return this.knockouts;
    }
}

export default AppModel;
