<template>
    <span @mouseout="unhover" @mouseover="hover" v-if="!isNotTeam(team)" :data-id="'team-' + team.getId()" class="team--name">
        <i class="flag-icon" :class="icon(team)"></i>
        {{ team.getName() }}
    </span>
    <span v-else v-html="team"></span>
</template>

<script>
    import TeamModel from '../Model/team';

    export default {
        methods: {
            hover(e) {
                const elements = document.querySelectorAll('[data-id="' + e.target.dataset.id + '"]');
                elements.forEach((element) => {
                    element.classList.add('team--name--hover');
                });
            },
            unhover(e) {
                const elements = document.querySelectorAll('[data-id="' + e.target.dataset.id + '"]');
                elements.forEach((element) => {
                    element.classList.remove('team--name--hover');
                });
            },
            icon(team) {
                return 'flag-icon-' + team.getIso2();
            },
            isNotTeam(team) {
                return typeof team === 'string';
            },
        },
        props: {
            team: {
                type: [TeamModel, String],
                required: true,
            },
        },
    };
</script>
