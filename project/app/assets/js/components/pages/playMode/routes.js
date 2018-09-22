import VueRouter from "vue-router";

export default new VueRouter({
    mode: 'hash',

    routes: [
        {
            path: '/multiplayer',
            name: "multiplayer-type",
            component: require("./MultiplayerType.vue")
        },
        {
            path: '/multiplayer/:type',
            name: "multiplayer-game",
            component: require("./MultiplayerGame.vue")
        },
        {
            path: '*',
            name: "game-type",
            component: require("./GameType.vue")
        },
    ]
});