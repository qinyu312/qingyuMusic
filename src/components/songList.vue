<template>
  <div class="songListContainer">
    <div class="topTitle" v-for="(item, index) in songList" :key="index">
      <img :src="item.coverImgUrl" alt="" width="150px" height="160px">
      <p class="title">{{item.name}}</p>
      <p class="disp">{{item.description|setText}}</p>
    </div>
    
    <div class="sortList">
      <ul>
        <li :class="{active:count==index}" v-for="(item, index) in sort" :key=index style="display: flex;" @click="qb(index)">{{item}}</li>
      </ul>
    </div>

    <div class="songListCon">
      <div class="songItem" v-for="(item, index) in songLists" :key="index" @click="toPlaySong(item.id)">
        <span class="playCount">{{item.playCount}}</span>
        <img :src="item.coverImgUrl" alt="" width="250px" height="100%">
        <p>{{item.name|setTitle}}</p>
        <p class="artists">{{item.creator.nickname}}</p>
      </div>
    </div>

    <div class="songListFooter">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="36"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as api from '../api'
export default {
    name: 'songList',
    data() {
      return {
        total:0,
        page:1,
        count: 0,
        songList: [],
        songLists: [],
        sort: ['全部', '欧美', '华语', '流行', '古风', '治愈', '民谣', 'ACG']
      }
    },
    filters: {
      setText(val) {
        if(val && val.length > 100) {
          val = val.substring(0,350) + '...';
        }
        return val
      },
      setTitle(val) {
        if(val && val.length > 15) {
          val = val.substring(0,15) + '...';
        }
        return val
      }
    },
    created() {
      this.topData()
      this.conData()

    },
    methods: {
      toPlaySong(id) {
        this.$router.push('/playSongList?id=' + id)
      },
      topData() {
        // 推荐歌单
        api.songList({limit:1, cat:'古风'}).then(res => {
          this.songList = res.playlists;
        })
      },
      conData() {
        api.getPlayList({limit:60, offset:(this.page-1)*10, cat:'全部'}).then(res => {
          this.songLists = res.playlists;
          this.total = res.total;
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.conData()
      },
      qb(index) {
        if(index == 0) {
          api.getPlayList({limit:60, cat:'全部'}).then(res => {
            this.songLists = res.playlists;
            this.count = 0;
            this.page = 1;
          })
        }else if (index ==1 ) {
          api.getPlayList({limit:60, cat:'欧美'}).then(res => {
            this.songLists = res.playlists;
            this.count = 1;
            this.page = 1;

          })
        }else if (index ==2 ) {
          api.getPlayList({limit:60, cat:'华语'}).then(res => {
            this.songLists = res.playlists;
            this.count = 2;
            this.page = 1;

          })
        }else if (index ==3 ) {
          api.getPlayList({limit:60, cat:'流行'}).then(res => {
            this.songLists = res.playlists;
            this.count = 3;
            this.page = 1;

          })
        }else if (index ==4 ) {
          api.getPlayList({limit:60, cat:'古风'}).then(res => {
            this.songLists = res.playlists;
            this.count = 4;
            this.page = 1;

          })
        }else if (index ==5 ) {
          api.getPlayList({limit:60, cat:'治愈'}).then(res => {
            this.songLists = res.playlists;
            this.count = 5;
            this.page = 1;

          })
        }else if (index ==6 ) {
          api.getPlayList({limit:60, cat:'民谣'}).then(res => {
            this.songLists = res.playlists;
            this.count = 6;
            this.page = 1;

          })
        }else if (index ==7 ) {
          api.getPlayList({limit:60, cat:'ACG'}).then(res => {
            this.songLists = res.playlists;
            this.count = 7;
            this.page = 1;

          })
        }
      }
    }
}
</script>

<style lang="less" scoped>
.songListContainer {
 
  .topTitle {
    // width: 100%;
    height: 200px;
    background: #000;
    margin: 30px 100px;
    position: relative;

    img {
      margin: 20px;
    }
    .title {
      position: absolute;
      top: 30px;
      left: 200px;
      color: #fff;
    }
    .disp {
      position: absolute;
      top: 70px;
      left: 200px;
      color: #fff;
      font-size: 14px;
      margin-right: 10px;
    }

  }

  .sortList {
    width: 100%;
    margin: 20px 100px;
    ul {
      // float: left;
      display: flex;
      list-style: none;
      li {
        margin: auto 20px;
      }
    }
  } 

  .songListCon {
    margin: 30px 100px 80px 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
        .songItem {
            position: relative;
            margin: 20px 0 60px 0;
            .playCount {
                position: absolute;
                top: 10px;
                right: 5px;
                color: #999;
                font-size:15px;
            }
            p{
                font-size: 15px;
            }
        }
  }

  .songListFooter {
    margin: 50px 0 150px 0;
    text-align: center;
  }
}

.artists {
    color: #999;
    font-size: 13px;
} 
.active {
  color: plum;
}
</style>