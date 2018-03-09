<template>
  <div id="app">
    <router-view/>
    <div v-if="loading">Loading!!!</div>
    <div v-if="!loading">No more loading!</div>
    <div v-if="!loading" v-html="data"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    computed: {
        loading() {
            return this.$store.state.loading;
        },
        data() {
            return this.$store.state.data;
        },
    },
    created() {
        this.$store.dispatch('loadData');
    },
})
export default class App extends Vue {}
</script>
