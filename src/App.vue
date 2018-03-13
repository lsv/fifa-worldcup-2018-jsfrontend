<template>
    <div id="app">
        <div v-if="loading">Loading!!!</div>
        <router-view v-show="!loading" />
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
        created() {
            this.$store.dispatch('loadData');
        },
    })
    export default class App extends Vue {
    }
</script>
