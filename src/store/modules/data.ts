import DataParser from '@/Parser/data';
import AppModel from '@/Model/app';
import KnockoutModel from '@/Model/knockout';
import MatchModel from '@/Model/match';
import GroupParser from '@/Parser/group';
import GroupModel from '@/Model/group';
import KnockoutParser from '@/Parser/knockout';

const DATAURL = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json';

const state = {
    loading: true as boolean,
    data: null as AppModel,
};

const getters = {};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const actions = {
    loadData({commit}: {commit: any}) {
        commit('LOADING', true);
        fetch(DATAURL)
            .then((response) => {
                return response.json();
            })
            .then( (json) => {
                return DataParser.parse(json);
            })
            .then((data: AppModel) => {
                wait(0).then(() => {
                    commit('LOAD_DATA', data);
                    commit('LOADING', false);
                });
            })
        ;
    },
};

const mutations = {
    ['LOADING'](state: any, payload: any) {
        state.loading = payload;
    },
    ['LOAD_DATA'](state: any, payload: any) {
        state.data = payload;
    },
    ['SET_KNOCKOUT_MATCH_RESULT'](state: any, payload: any) {
        const knockout = state.data.getKnockouts().find((k: KnockoutModel) => {
            return k.getName() === payload.knockoutid;
        });
        if (knockout) {
            const match = knockout.getMatches().find((m: MatchModel) => {
                return m.getId() === payload.matchid;
            });
            if (match) {
                match.setAwayResult(payload.awayscore);
                match.setHomeResult(payload.homescore);
                KnockoutParser.updateKnockouts(state.data);
            }
        }
    },
    ['SET_GROUP_MATCH_RESULT'](state: any, payload: any) {
        const group = state.data.getGroups().find((g: GroupModel) => {
            return g.getName() === payload.groupid;
        });
        if (group) {
            const match = group.getMatches().find((m: MatchModel) => {
                return m.getId() === payload.matchid;
            });
            if (match) {
                match.setAwayResult(payload.awayscore);
                match.setHomeResult(payload.homescore);
                GroupParser.updateStandings(group);
                KnockoutParser.updateKnockouts(state.data);
            }
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
