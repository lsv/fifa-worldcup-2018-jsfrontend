<template>
    <div class="row" v-if="data">
        <section class="col" v-if="data && data.groups">
            <group v-for="(group, index) in data.groups" :group="group" :key="index" :withstanding=false></group>
        </section>
        <section class="col" v-if="data && data.knockouts">
            <knockout v-for="(knockout, index) in data.knockouts" :knockout="knockout" :key="index"></knockout>
        </section>
    </div>
</template>

<script>
    import Group from './../Components/Group.vue';
    import Knockout from './../Components/Knockout.vue';

    export default {
        computed: {
            data() {
                return this.$store.state.Data.data;
            },
        },
        components: {
            Group,
            Knockout,
        },
    };
</script>
