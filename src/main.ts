import Vue from 'vue';
import moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './style.scss';

Vue.config.productionTip = false;

// Vue.use(VueGoogleMaps, {
//     load: {
//         key: 'AIzaSyB9j9NDmj6GCCVvBhkFeBJZP1I0Vtg13BU',
//     },
// });

moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('d', 3000);
moment.relativeTimeThreshold('h', 24);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
