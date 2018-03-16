<template>
    <div>
        <header>
            <h1>Worldcup 2018 - Russia</h1>
        </header>
        <section class="groups" v-if="data && data.groups">
            <group v-for="(group, index) in data.groups" :group="group" :key="index"></group>
        </section>
        <section class="knockouts" v-if="data && data.knockouts">
            <knockout v-for="(knockout, index) in data.knockouts" :knockout="knockout" :key="index"></knockout>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Group from './Group.vue';
    import Knockout from './Knockout.vue';

    @Component({
        computed: {
            data() {
                return this.$store.state.Data.data;
            },
        },
        components: {
            Group,
            Knockout,
        },
    })
    export default class Home extends Vue {
    }
</script>
