<template>
    <div id="app" class="container-fluid">
        <header>
            <h1>Worldcup 2018 - Russia</h1>
            <ul v-if="!loading">
                <li><router-link :to="{name: 'phase'}">Phases</router-link></li>
                <li><router-link :to="{name: 'matches'}">Matches</router-link></li>
                <li><router-link :to="{name: 'stadiums'}">Stadiums</router-link></li>
            </ul>
        </header>
        <div v-if="loading">Loading!!!</div>
        <router-view v-if="!loading" />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        computed: {
            loading() {
                return this.$store.state.loading;
            },
        },
        mounted() {
            this.$store.dispatch('loadData');
            this.$store.dispatch('setDate');
        },
    })
    export default class App extends Vue {
    }
</script>
