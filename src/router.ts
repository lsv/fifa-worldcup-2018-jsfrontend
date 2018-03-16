import Vue from 'vue';
import Router from 'vue-router';
import Phase from './views/Phase.vue';
import Matches from './views/Matches.vue';
import Stadiums from './views/Stadiums.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'phase',
            component: Phase,
        },
        {
            path: '/matches',
            name: 'matches',
            component: Matches,
        },
        {
            path: '/stadiums',
            name: 'stadiums',
            component: Stadiums,
        },
    ],
});
