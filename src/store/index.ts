import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import Data from './modules/data';
import Time from './modules/time';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        Data,
        Time,
    },
    strict: debug,
    plugins: debug ? [createLogger({})] : [],
});
