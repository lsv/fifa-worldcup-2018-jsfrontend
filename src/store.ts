import Vue from 'vue';
import Vuex from 'vuex';
import DataParser from '@/Parser/data';
import AppModel from '@/Model/app';

Vue.use(Vuex);

const DATAURL = 'https://cdn.rawgit.com/lsv/fifa-worldcup-2018/master/data.json';

export default new Vuex.Store({
    state: {
        loading: false,
        data:  {},
    },
    mutations: {
        ['LOADING'](state, payload) {
            state.loading = payload;
        },
        ['LOAD_DATA'](state, payload) {
            state.data = payload;
        },
    },
    getters: {
        getStatus(state) {
            return state.loading;
        },
        getData(state) {
            return state.data;
        },
    },
    actions: {
        loadData({commit}) {
            commit('LOADING', true);
            fetch(DATAURL)
                .then((response) => {
                    return response.json();
                })
                .then( (json) => {
                    return DataParser.parse(json);
                })
                .then((data: AppModel) => {
                    commit('LOAD_DATA', data);
                    commit('LOADING', false);
                })
            ;
        },
    },
});
