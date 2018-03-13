<template>
    <div class="col">
        <div class="card card--group">
            <div class="card-header">Group {{ group.getDisplayName() }}</div>
            <table class="table-bordered">
                <thead>
                <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col" class="text-center"><abbr title="Played">Pld</abbr></th>
                    <th scope="col" class="hidden-lg-up text-center"><abbr title="Wins - Draws - Lost">W-D-L</abbr></th>
                    <th scope="col" class="hidden-md-down text-center"><abbr title="Wins">W</abbr></th>
                    <th scope="col" class="hidden-md-down text-center"><abbr title="Draws">D</abbr></th>
                    <th scope="col" class="hidden-md-down text-center"><abbr title="Lost">L</abbr></th>
                    <th scope="col" class="text-center"><abbr title="Goals">G</abbr></th>
                    <th scope="col" class="text-center"><abbr title="Goal difference">GD</abbr></th>
                    <th scope="col" class="text-center"><abbr title="Points">Pts</abbr></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(standing, index) in group.getStandings()" :key="index" :class="standingpositon(index)">
                    <td><teamname :team="standing.getTeam()"></teamname></td>
                    <td class="text-center">{{ standing.getPlayed() }}</td>
                    <td class="hidden-lg-up text-center text-nowrap">{{ standing.getWins() }} - {{ standing.getDraws() }} - {{ standing.getLosts() }}</td>
                    <td class="hidden-md-down text-center">{{ standing.getWins() }}</td>
                    <td class="hidden-md-down text-center">{{ standing.getDraws() }}</td>
                    <td class="hidden-md-down text-center">{{ standing.getLosts() }}</td>
                    <td class="text-center text-nowrap">{{ standing.getGoalsFor() }} - {{ standing.getGoalsAgainst() }}</td>
                    <td class="text-center">{{ standing.getGoalsDifference() }}</td>
                    <td class="text-center">{{ standing.getPoints() }}</td>
                </tr>
                </tbody>
            </table>
            <div class="card-footer p-0">
                <button type="button" class="close close--plus"><span>&times;</span></button>
                <div style="display: block">
                    <table class="table-groupmatches">
                        <tbody>
                            <match v-for="(match, index) in group.getMatches()" :game="match" :gametype="'groupmatches'" :key="index"></match>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import GroupModel from '../Model/group';
    import Teamname from './Teamname.vue';
    import Match from './Match.vue';

    @Component({
        methods: {
            standingpositon(index: number) {
                return index === 0 ? 'table-success' : index === 1 ? 'table-info' : '';
            },
        },
        props: {
            group: {
                type: GroupModel,
                required: true,
            },
        },
        components: {
            Teamname,
            Match,
        },
    })

    export default class Group extends Vue {

    }
</script>
