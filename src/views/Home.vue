<template>
    <div class="groupmatches">
        <group v-for="(group, index) in data.groups" :group="group" :key="index"></group>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Group from './Group.vue';

    @Component({
        computed: {
            data() {
                return this.$store.state.data;
            },
        },
        components: {
            Group,
        },
    })
    export default class Home extends Vue {
    }
</script>
