<template>
    <div class="col">
        <article class="card card--group">
            <div class="card-header">
                <a @click="show = !show" :class="[isShow ? 'close--close' : 'close--plus']" class="close"><span>&times;</span></a>
                {{ label }}: {{ stadium.getName() }}
            </div>
            <table class="table-groups" v-show="isShow">
                <tbody :class="[isShow ? 'tbody--open' : 'tbody--close']">
                    <match v-for="(match, index) in stadium.getMatches()" :id="match.getGroupname()" :game="match" :gametype="match.getType()" :key="index"></match>
                </tbody>
            </table>
        </article>
    </div>
</template>

<script>
    import Match from './Match';
    import StadiumModel from './../Model/stadium';
    export default {
        props: {
            show: {
                type: Boolean,
                required: true,
            },
            label: {
                type: String,
                required: true,
            },
            stadium: {
                type: StadiumModel,
                required: true,
            },
        },
        computed: {
            isShow() {
                return this.show;
            },
            id() {
                return 'stadium_' + this.stadium.getId();
            },
        },
        components: {
            Match,
        },
    };
</script>