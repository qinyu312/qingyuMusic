<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view /> -->
    <div id="navContainer">
      <div class="topNav">
        <div>
          <img src="./assets/image/logo.jpg" alt="" width="200px" height="80px">
        </div>
        <div>
          <el-input placeholder="请输入歌曲名称搜索" v-model="inputValue" @keyup.enter.native="goSearch()">
            <el-button @click="goSearch()" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="topNavRight">
            <el-button type="info" icon="el-icon-message" circle></el-button>
            <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        </div>

      </div>

      <div class="conContainer">
        <div class="leftList">
          <ul class="musicList">
            <li>
              <router-link to="/findMusic">发现音乐</router-link>
            </li>
            <li>
              <router-link to="/songList">日推歌单</router-link>
            </li>
            <li>
              <router-link to="/newSong">最新歌曲</router-link>
            </li>
            <li>
              <router-link to="/ranking">排行榜</router-link>
            </li>
            <li>
              <router-link to="/mvVideo">MV</router-link>
            </li>
          </ul>
        </div>

        <div class="rightCon">
          <router-view></router-view>
        </div>
      </div>

      <div class="bottomNav">
        <audio :src="songUrl" controls autoplay></audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      songUrl: '',
      inputValue: ''
    }
  },

  methods: {
    goSearch() {
      if(this.inputValue == '') {
        this.$message.warning("搜索内容不可以为空哦！");
      } else {
        this.$router.push('/search?q=' + this.inputValue)
      }
    }
  }
}
</script>

<style lang="less" scpoed>
*{
  margin: 0;
  padding: 0;
}
#navContainer {
  position: relative;
  .topNav {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    line-height: 80px;
    background: plum;
    img {
      position: fixed;
    }
    .topNavRight {
      margin-right: 20px;
    }
  }
  .conContainer {
    width: 100%;
    height: 1vh;
    // display: flex;
    .leftList {
      width: 200px;
      height: 1000px;
      border-right: 1px solid #e5e5e5;
      position: fixed;
      z-index: 999;
      .musicList {
        text-align: center;
        margin-top: 50px;
        li {
          list-style: none;
          margin: 30px auto;
          a {
             text-decoration: none;
             color: #000;
          }
        }
      }
    }
    .rightCon {
      // flex: 1;
      margin-left: 200px;
      height: 100%;
    }
  }
  .bottomNav {
    width: 100%;
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;

    audio {
      width: 100%;
    }
  }
}
.router-link-active {
  color: plum !important;
}
</style>
