<template>
    <div v-if="storedata">
        <section class="map">
            <gmap-map
                    :center="center"
                    :zoom="zoom"
                    map-type-id="terrain"
                    style="width: 100%; height: 100%"
            >
                <gmap-marker @click="setShow(stadium.getId())" v-for="stadium in stadiums" :key="stadium.getId()" :label="label(stadium.getId())" :title="stadium.getName()" :position="{ lat: stadium.getLat(), lng: stadium.getLng() }"></gmap-marker>
            </gmap-map>
        </section>
        <section class="stadiums mt-3">
            <stadium-matches v-for="stadium in stadiums" :show="isShow(stadium.getId())" :stadium="stadium" :key="'stadiummatches_' + stadium.getId()" :label="label(stadium.getId())"></stadium-matches>
        </section>
    </div>
</template>

<script>
    import Vue from 'vue';
    import * as VueGoogleMaps from 'vue2-google-maps';
    import StadiumMatches from './../Components/StadiumMatches';
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
                show: false,
                center: {
                    lat: 54.3168784,
                    lng: 53.5596674,
                },
                zoom: 4,
            };
        },
        methods: {
            isShow(id) {
                return this.show === id;
            },
            setShow(id) {
                this.show = id;
            },
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
            StadiumMatches,
        },
    };
</script>
