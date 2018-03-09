import GameModel from '@/Model/match';
import KnockoutModel from '@/Model/knockout';
import GroupModel from '@/Model/group';

class TeammatchModel {
    private match: GameModel;
    private type: KnockoutModel | GroupModel;

    public constructor(match: GameModel, type: KnockoutModel|GroupModel) {
        this.match = match;
        this.type = type;
    }

    public getMatch(): GameModel {
        return this.match;
    }

    public getType(): KnockoutModel|GroupModel {
        return this.type;
    }

    public isKnockout(): boolean {
        return (this.getType() instanceof KnockoutModel);
    }

    public isGroup(): boolean {
        return (this.getType() instanceof GroupModel);
    }
}

export default TeammatchModel;
