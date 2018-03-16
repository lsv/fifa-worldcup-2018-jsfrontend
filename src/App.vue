<template>
    <div id="app" class="container-fluid">
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
        mounted() {
            this.$store.dispatch('loadData');
            this.$store.dispatch('setDate');
        },
    })
    export default class App extends Vue {
    }
</script>
