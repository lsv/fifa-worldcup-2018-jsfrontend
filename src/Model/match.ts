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

    public constructor(id: number, homeTeam: TeamModel | string, awayTeam: TeamModel | string, homeResult: number | null, awayResult: number | null, date: Moment, stadium: StadiumModel, channels: ChannelModel[] | null) {
        this.id = id;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.homeResult = homeResult;
        this.awayResult = awayResult;
        this.date = date;
        this.stadium = stadium;
        this.channels = channels;
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

    public getAwayResult(): number | null {
        return this.awayResult;
    }

    public getDate(): Moment {
        return this.date;
    }

    public getStadium(): StadiumModel {
        return this.getStadium();
    }

    public getChannels(): ChannelModel[] | null {
        return this.channels;
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
}

export default MatchModel;
