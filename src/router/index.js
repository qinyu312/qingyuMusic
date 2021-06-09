import Vue from "vue";
import VueRouter from "vue-router";
import findMusic from '../components/findMusic.vue'
import songList from '../components/songList.vue'
import newSong from '../components/newSong.vue'
import ranking from '../components/ranking.vue'
import mvVideo from '../components/mvVideo.vue'
import search from '../components/search.vue'
import playSongList from '../components/playSongList.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/findMusic",
    name: "findMusic",
    component: findMusic,
    
  },
  {
    path: "/",
    name: "findMusic",
    component: findMusic
  },
  {
    path: "/songList",
    name: "songList",
    component: songList
  },
  {
    path: "/newSong",
    name: "newSong",
    component: newSong
  },
  {
    path: "/ranking",
    name: "ranking",
    component: ranking
  },
  {
    path: "/mvVideo",
    name: "mvVideo",
    component: mvVideo
  },
  {
    path: "/search",
    name: "search",
    component: search
  },
  {
    path: "/playSongList",
    name: "playSongList",
    component: playSongList
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
