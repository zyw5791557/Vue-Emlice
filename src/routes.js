// import Login from './views/Login.vue'
// import NotFound from './views/404.vue'
// import Home from './views/Home.vue'
// import Music from './views/music/Music.vue'
// import Player from './views/music/Player.vue'
const Login = resolve => require(['./views/Login.vue'],resolve);
const NotFound = resolve => require(['./views/404.vue'],resolve);
const Home = resolve => require(['./views/Home.vue'],resolve);
const Music = resolve => require(['./views/music/Music.vue'],resolve);
const Player = resolve => require(['./views/music/Player.vue'],resolve);

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/home',
        component: Home,
        name: 'Home'
    },
    {
        path: '/',
        redirect: { path: '/home' }
    },
    {
        path: '/404',
        component: NotFound,
    },
    {
        path: '*',
        component: NotFound,
    },
    {
        path:'/music', 
        name: 'Music', 
        component: Music
    },
    {
        path:'/player', 
        name: 'Player', 
        component: Player
    },
];

export default routes;