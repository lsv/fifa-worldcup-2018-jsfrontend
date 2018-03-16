import TeamModel from '@/Model/team';
import StadiumModel from '@/Model/stadium';
import ChannelModel from '@/Model/channel';
import * as moment from 'moment';
import {Moment} from 'moment';

class MatchModel {
    private id: number;
    private homeTeam: TeamModel | string;
    private awayTeam: TeamModel | string;
    private homeResult: number | null;
    private awayResult: number | null;
    private date: Moment;
    private stadium: StadiumModel;
    private channels: ChannelModel[] | null;
    private type: string;
    private rawHometeam: string|null;
    private rawAwayteam: string|null;

    public constructor(id: number, homeTeam: TeamModel | string, awayTeam: TeamModel | string, homeResult: number | null, awayResult: number | null, date: Moment, stadium: StadiumModel, channels: ChannelModel[] | null, type: string, rawHometeam: string|null = null, rawAwayteam: string|null = null) {
        this.id = id;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeResult = homeResult;
        this.awayResult = awayResult;
        this.date = date;
        this.stadium = stadium;
        this.channels = channels;
        this.type = type;
        this.rawHometeam = rawHometeam;
        this.rawAwayteam = rawAwayteam;
    }

    public getId(): number {
        return this.id;
    }

    public getHomeTeam(): TeamModel | string {
        return this.homeTeam;
    }

    public getAwayTeam(): TeamModel | string {
        return this.awayTeam;
    }

    public getHomeResult(): number | null {
        return this.homeResult;
    }

    public setHomeResult(result: number) {
        this.homeResult = result;
    }

    public getAwayResult(): number | null {
        return this.awayResult;
    }

    public setAwayResult(result: number) {
        this.awayResult = result;
    }

    public getDate(): Moment {
        return this.date;
    }

    public getStadium(): StadiumModel {
        return this.stadium;
    }

    public getChannels(): ChannelModel[] | null {
        return this.channels;
    }

    public getType(): string {
        return this.type;
    }

    public isFinish(): boolean {
        return this.getHomeResult() !== null && this.getAwayResult() !== null;
    }

    public isStarted(): boolean {
        const now = moment();
        return now.isAfter(this.getDate());
    }

    public getWinner(): TeamModel | string {
        if (this.getHomeResult() > this.getAwayResult()) {
            return this.getHomeTeam();
        }

        return this.getAwayTeam();
    }

    public getLoser(): TeamModel | string {
        if (this.getHomeResult() < this.getAwayResult()) {
            return this.getHomeTeam();
        }

        return this.getAwayTeam();
    }

    public setHomeTeam(team: string | TeamModel) {
        this.homeTeam = team;
    }

    public setAwayTeam(team: string | TeamModel) {
        this.awayTeam = team;
    }

    public getRawHometeam(): string|null {
        return this.rawHometeam;
    }

    public getRawAwayteam(): string|null {
        return this.rawAwayteam;
    }
}

export default MatchModel;
