import {Moment} from 'moment';

export default {
    titleDate(date: Moment): string {
        return date.format('llll');
    },
    viewDate(date: Moment): string {
        return date.format('llll');
    },
};
