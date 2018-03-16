<template>
    <section id="app">
        <div v-if="loading" class="loading">Loading&#8230;</div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3" v-if="!loading">
            <router-link class="navbar-brand" :to="{name: 'phase'}">Worldcup 2018 - Russia</router-link>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <router-link tag="li" class="nav-item" :to="{name: 'phase'}" :exact-active-class="'active'">
                        <a class="nav-link">Phases</a>
                    </router-link>
                    <router-link tag="li" class="nav-item" :to="{name: 'matches'}" :exact-active-class="'active'">
                        <a class="nav-link">Matches</a>
                    </router-link>
                    <router-link tag="li" class="nav-item" :to="{name: 'stadiums'}" :exact-active-class="'active'">
                        <a class="nav-link">Stadiums</a>
                    </router-link>
                </ul>
            </div>
        </nav>

        <div class="container-fluid">
            <router-view v-if="!loading" />
        </div>
    </section>
</template>

<script>
    export default {
        computed: {
            loading() {
                return this.$store.state.Data.loading;
            },
        },
        created() {
            this.$store.dispatch('loadData');
            this.$store.dispatch('setDate');
        },
    };
</script>
