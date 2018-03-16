import AppModel from '@/Model/app';
import StadiumParser from '@/Parser/stadium';
import ChannelParser from '@/Parser/channel';
import TeamParser from '@/Parser/team';
import {Moment} from 'moment';
import GroupParser from '@/Parser/group';
import KnockoutParser from '@/Parser/knockout';
import * as moment from 'moment';

class DataParser {
    public static getDate(date: string): Moment {
        return moment(date);
    }

    public static parse(data: any): AppModel {
        const stadiums = StadiumParser.parse(data.stadiums);
        ChannelParser.parse(data.channels);
        TeamParser.parse(data.teams);
        const groups = GroupParser.parse(data.groups);
        const knockouts = KnockoutParser.parse(data.knockout, groups);
        return new AppModel(groups, knockouts, stadiums);
    }

}

export default DataParser;
