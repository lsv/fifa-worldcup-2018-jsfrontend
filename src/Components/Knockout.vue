<template>
    <article :class="knockoutclass" class="card card--knockouts">
        <div class="card-header" v-html="name"></div>
        <table class="table table-vsm table-knockouts">
            <tbody>
                <match v-for="(match, index) in knockout.matches" :key="index" :id="knockout.getName()" :game="match" :gametype="'knockouts'"></match>
            </tbody>
        </table>
    </article>
</template>

<script>
    import KnockoutModel from '../Model/knockout';
    import Match from './Match';

    export default {
        props: {
            knockout: {
                type: KnockoutModel,
                required: true,
            },
        },
        computed: {
            knockoutclass() {
                return 'card--' + this.knockout.getId();
            },
            name() {
                switch (this.knockout.getId()) {
                    case 'round_2_loser':
                        return '<i class="bronze fa fa-2x fa-trophy"></i> ' + this.knockout.getName();
                    case 'round_2':
                        return '<i class="gold fa fa-2x fa-trophy"></i> ' + this.knockout.getName();
                    default:
                        return this.knockout.getName();
                }
            },
        },
        components: {
            Match,
        },
    };
</script>
