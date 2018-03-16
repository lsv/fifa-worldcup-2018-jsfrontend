<template>
    <div v-if="storedata">
        <section class="map">
            <gmap-map
                    :center="center"
                    :zoom="zoom"
                    map-type-id="terrain"
                    style="width: 100%; height: 100%"
            >
                <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                    {{infoContent}}
                </gmap-info-window>
                <gmap-marker v-for="stadium in stadiums" :key="stadium.getId()" :label="label(stadium.getId())" :title="stadium.getName()" :position="{ lat: stadium.getLat(), lng: stadium.getLng() }"></gmap-marker>
            </gmap-map>
        </section>
        <section class="stadiums">
            <div class="card card--group" v-for="stadium in stadiums">
                <div class="card-header">{{ label(stadium.getId())}}: {{ stadium.getName() }}</div>
                <table class="table-knockouts">
                    <tbody class="tbody--open">
                        <match v-for="(match, index) in stadium.getMatches()" :id="match.getGroupname()" :game="match" :gametype="match.getType()" :key="index"></match>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import * as VueGoogleMaps from 'vue2-google-maps';
    import Match from './../Components/Match.vue';
    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyDAAJ1YmFYX3LQpNAJdBCDCpyzHYR6VHF0',
        },
    });

    Array.range = (a, b, step) => {
        let A = [];
        if (typeof a === 'number') {
            A[0] = a;
            step = step || 1;
            while (a + step <= b) {
                A[A.length] = a += step;
            }
        } else {
            let s = 'abcdefghijklmnopqrstuvwxyz';
            if (a === a.toUpperCase()) {
                b = b.toUpperCase();
                s = s.toUpperCase();
            }
            s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
            A = s.split('');
        }
        return A;
    };

    export default {
        data() {
            return {
                center: {
                    lat: 54.3168784,
                    lng: 53.5596674,
                },
                zoom: 4,
                infoOptions: {},
                infoWindowPos: {
                    lat: 0,
                    lng: 0,
                },
                infoWinOpen: false,
                infoContent: '',
            };
        },
        methods: {
            label(index) {
                const letters = Array.range('A', 'Z');
                return letters[index - 1];
            },
        },
        computed: {
            storedata() {
                return this.$store.state.Data.data;
            },
            stadiums() {
                return this.storedata.getStadiums();
            },
        },
        components: {
            Match,
        },
    };
</script>
