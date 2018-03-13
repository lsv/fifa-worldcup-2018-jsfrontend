<template>
    <span v-if="!isNotTeam(team)" :data-id="team.getId()" class="team--name">
        <i class="fa fa-info teammatches"></i>
        <i class="hidden-xs-down flag-icon" :class="icon(team)"></i>
        <span v-html="team.getName()"></span>
    </span>
    <span v-else v-html="team"></span>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import TeamModel from '../Model/team';

    @Component({
        methods: {
            icon(team: TeamModel) {
                return 'flag-icon-' + team.getIso2();
            },
            isNotTeam(team: any) {
                return typeof team === 'string';
            },
        },
        props: {
            team: {
                type: [TeamModel, String],
                required: true,
            },
        },
    })

    export default class Teamname extends Vue {

    }
</script>