<template>
    <tr :class="finishedclass" :id="'match_' + game.getId()">
        <td :class="gameclass + '--date'" class="text-center moment-date" :title="titledate" v-text="viewDate"></td>
        <td :class="homeclass + ' ' + gameclass + '--hometeam'" class="text-right">
            <teamname :team="game.getHomeTeam()"></teamname>
            <label :class="gameclass + '--label'">
                <input @blur="setResult" :id="'match-' + game.getId() + '-result-home'" data-type="home" type="text" :class="gameclass + '--result'" :value="game.getHomeResult()">
            </label>
            <span v-text="homepenalty"></span>
        </td>
        <td :class="gameclass + '--spacer'" class="text-center" :title="game.getStadium().getName()">
            <small v-text="'Match ' + game.getId()"></small>
        </td>
        <td :class="awayclass + ' ' + gameclass + '--awayteam'">
            <span v-text="awaypenalty"></span>
            <label :class="gameclass + '--label'">
                <input @blur="setResult" :id="'match-' + game.getId() + '-result-away'" data-type="away" type="text" :class="gameclass + '--result'" :value="game.getAwayResult()">
            </label>
            <teamname :team="game.getAwayTeam()"></teamname>
        </td>
    </tr>
</template>

<script>
    import { mapMutations } from 'vuex';
    import MatchModel from '../Model/match';
    import Teamname from './Teamname.vue';
    import functions from '../static';

    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
            game: {
                type: MatchModel,
                required: true,
            },
            gametype: {
                type: String,
                required: true,
                default: 'groups',
            },
        },
        methods: {
            ...mapMutations([
                'SET_GROUP_MATCH_RESULT',
                'SET_KNOCKOUT_MATCH_RESULT',
            ]),
            setResult(e) {
                let otherobject;
                let awayscore;
                let homescore;
                if (e.target.dataset.type === 'home') {
                    homescore = e.target.value.trim();
                    otherobject = document.getElementById('match-' + this.game.getId() + '-result-away');
                    awayscore = otherobject.value.trim();
                } else {
                    awayscore = e.target.value.trim();
                    otherobject = document.getElementById('match-' + this.game.getId() + '-result-home');
                    homescore = otherobject.value.trim();
                }

                if ((awayscore && homescore) || awayscore === '' && homescore === '') {
                    if (awayscore === '' && homescore === '') {
                        awayscore = null;
                        homescore = null;
                    }

                    if (this.gametype === 'groups') {
                        this.SET_GROUP_MATCH_RESULT({
                            matchid: this.game.getId(),
                            groupid: this.id,
                            homescore,
                            awayscore,
                        });
                    } else {
                        this.SET_KNOCKOUT_MATCH_RESULT({
                            matchid: this.game.getId(),
                            knockoutid: this.id,
                            homescore,
                            awayscore,
                        });
                    }
                }
            },
        },
        computed: {
            gameclass() {
                if (this.gametype !== 'groups') {
                    return 'table-knockouts';
                }
                return 'table-' + this.gametype;
            },
            viewDate() {
                return this.game.getDate().from(this.$store.state.Time.now);
            },
            titledate() {
                return functions.titleDate(this.game.getDate());
            },
            finished() {
                return this.game.getFinished();
            },
            finishedclass() {
                return this.game.isFinish() ? this.gameclass + '--finished' : '';
            },
            homepenalty() {
                if (this.game.getHomePenalty()) {
                    return '(' + this.game.getHomePenalty() + ')';
                }
                return '';
            },
            awaypenalty() {
                if (this.game.getAwayPenalty()) {
                    return '(' + this.game.getAwayPenalty() + ')';
                }
                return '';
            },
            homeclass() {
                if (this.game.isFinish()) {
                    if (this.game.getHomePenalty() !== null && this.game.getAwayPenalty() !== null) {
                        if (this.game.getHomePenalty() > this.game.getAwayPenalty()) {
                            return this.gameclass + '--winner';
                        } else {
                            return this.gameclass + '--loser';
                        }
                    }

                    if (this.game.getHomeResult() === this.game.getAwayResult()) {
                        return this.gameclass + '--draw';
                    }
                    if (this.game.getHomeResult() > this.game.getAwayResult()) {
                        return this.gameclass + '--winner';
                    }
                    if (this.game.getHomeResult() < this.game.getAwayResult()) {
                        return this.gameclass + '--loser';
                    }
                }
                return '';
            },
            awayclass() {
                if (this.game.isFinish()) {
                    if (this.game.getHomePenalty() !== null && this.game.getAwayPenalty() !== null) {
                        if (this.game.getHomePenalty() > this.game.getAwayPenalty()) {
                            return this.gameclass + '--loser';
                        } else {
                            return this.gameclass + '--winner';
                        }
                    }

                    if (this.game.getHomeResult() === this.game.getAwayResult()) {
                        return this.gameclass + '--draw';
                    }
                    if (this.game.getHomeResult() < this.game.getAwayResult()) {
                        return this.gameclass + '--winner';
                    }
                    if (this.game.getHomeResult() > this.game.getAwayResult()) {
                        return this.gameclass + '--loser';
                    }
                }
                return '';
            },
        },
        components: {
            Teamname,
        },
    };
</script>
