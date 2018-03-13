<template>
    <tr :class="finishedclass" :id="'match_' + game.getId()">
        <td :class="gameclass + '--date'" class="text-center moment-date" :title="titledate" :data-date="viewdate"></td>
        <td :class="homeclass + ' ' + gameclass + '--hometeam'" class="text-right">
            <teamname :team="game.getHomeTeam()"></teamname>
            <label :class="gameclass + '--label'">
                <input type="text" :class="gameclass + '--result'" :value="game.getHomeResult()">
            </label>
        </td>
        <td :class="gameclass + '--spacer'" class="text-center" :title="game.getStadium().getName()">
            <small class="hidden-xs-down">Match {{ game.getId() }}</small>
            <small class="hidden-sm-up">{{ game.getId() }}</small>
        </td>
        <td :class="awayclass + ' ' + gameclass + '--awayteam'">
            <label :class="gameclass + '--label'">
                <input type="text" :class="gameclass + '--result'" :value="game.getAwayResult()">
            </label>
            <teamname :team="game.getAwayTeam()"></teamname>
        </td>
    </tr>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import MatchModel from '../Model/match';
    import Teamname from './Teamname.vue';
    import functions from './../static';

    @Component({
        props: {
            game: {
                type: MatchModel,
                required: true,
            },
            gametype: {
                type: String,
                required: true,
                default: 'groupmatches',
            },
        },
        computed: {
            gameclass(): string {
                return 'table-' + this.gametype;
            },
            titledate(): string {
                return functions.titleDate(this.game.getDate());
            },
            viewdate(): string {
                return functions.viewDate(this.game.getDate());
            },
            finished(): boolean {
                return this.game.getFinished();
            },
            finishedclass(): string {
                return this.game.isFinish() ? this.gameclass() + '--finished' : '';
            },
            homeclass(): string {
                let classtext = this.gameclass() + '--draw';
                if (this.game.getHomeResult() > this.game.getAwayResult()) {
                    classtext = this.gameclass() + '--winner';
                }
                if (this.game.getHomeResult() < this.game.getAwayResult()) {
                    classtext = this.gameclass() + '--loser';
                }
                return classtext;
            },
            awayclass(): string {
                let classtext = this.gameclass() + '--draw';
                if (this.game.getHomeResult() < this.game.getAwayResult()) {
                    classtext = this.gameclass() + '--winner';
                }
                if (this.game.getHomeResult() > this.game.getAwayResult()) {
                    classtext = this.gameclass() + '--loser';
                }
                return classtext;
            },
        },
        components: {
            Teamname,
        },
    })

    export default class Match extends Vue {

    }
</script>