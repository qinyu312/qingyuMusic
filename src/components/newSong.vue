<template>
  <div class="newContainer">
    <div class="topSort">
      <ul>
        <li :class="{active:count==index}" v-for="(item, index) in sortTag" :key=index @click="getIndex(index)">{{item}}</li>
        <!-- <li :class="{active:count==index}" v-for="(item, index) in sort" :key=index style="display: flex;" @click="qb(index)">{{item}}</li> -->
      </ul>
    </div>

    <div class="newSongList">
      <div class="newSongItem" v-for="(item, index) in newSongList" :key="index" @click="getId(item.id)">
        <span class="index">{{index + 1}}</span>
        <img class="image" :src="item.album.blurPicUrl" alt="" width="90px" height="90px">
        <span class="gm">{{item.name | setText}}</span>
        <span class="gs">歌手</span>
        <span class="zj">{{item.album.name | setText}}</span>
        <span class="time">{{item.duration | setTime}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '../api'
export default {
    name: 'newSong',
    data() {
      return {
        count: 0,
        sortTag: ['全部', '华语', '欧美', '日本', '韩国'],
        newSongList: [],
        songUrl: ''
      }
    },
    filters: {
      setText(val) {
        if(val && val.length > 15) {
          val = val.substring(0,15) + '...';
        }
        return val
      },
      setTime(val) {
        let time = parseFloat(val) / 1000;   //先将毫秒转化成秒
          if (null != time && "" != time) {
            if (time > 60 && time < 60 * 60) {
              time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
               parseInt(time / 60.0)) * 60) + "秒";
            } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
              time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
              parseInt(time / 3600.0)) * 60) + "分钟" +
              parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
              parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
            } else {
              time = parseInt(time) + "秒";
            }
          }
          let d = time.replace('分钟', ' : '); 
          let e = d.replace('秒', '');
          return e;
      }
    },
    created() {
      api.newSong({type: 0}).then (res => {
        console.log(res)
        this.newSongList = res.data
        console.log(res.data[0].album.blurPicUrl);
      })
    },
     methods: {
       getId (id) {
        //  console.log(id)
        api.playSong({id}).then (res => {
            this.songUrl = res.data[0].url
            this.$parent.songUrl = this.songUrl
        })
       },
       getIndex(index) {
         if(index == 0) {
          api.newSong({type: 0}).then(res => {
            this.newSongList = res.data;
            this.count = 0;
            })
          }else if (index == 1 ) {
            api.newSong({type: 7}).then(res => {
              this.newSongList = res.data;
              this.count = 1;

            })
          }else if (index == 2 ) {
            api.newSong({type: 96}).then(res => {
              this.newSongList = res.data;
              this.count = 2;

            })
          }else if (index == 3 ) { 
            api.newSong({type: 8}).then(res => {
              this.newSongList = res.data;
              this.count = 3;

            })
          }else if (index == 4 ) {
            api.newSong({type: 16}).then(res => {
              this.newSongList = res.data;
              this.count = 4;
            })
          }
       }
     }
}
</script>

<style lang="less" scoped>
  .newContainer {
    margin: 50px 100px 10px 100px;
    position: relative;
    .topSort {
      position: absolute;
      right: 20px;
      top: 20px;
      ul {
        display: flex;
        li {
          list-style: none;
          margin: auto 20px;
          color: #999;
        }
      }
    }
    .newSongList {
      position: absolute;
      top: 100px;
      left: 0;
      right: 0;
      margin-bottom: 100px;
      .newSongItem {
        width: 100%;
        height: 90px;
        margin: 15px auto;
        // background: #e6e6e6;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        position: relative;

        .index {
          position: absolute;
          left: 2%;
          top: 30px;
          color: #999;
        }
        .image {
          position: absolute;
          left: 5%;
          top: 0;
        }
        .gm {
          position: absolute;
          left: 15%;
          top: 30px;
          font-size: 15px;
          color: #606266;
        }
        .gs {
          position: absolute;
          left: 50%;
          top: 30px;
          font-size: 15px;
          color: #606266;
        }
        .zj {
          position: absolute;
          left: 65%;
          top: 30px;
          font-size: 15px;
          color: #606266;
        }
        .time {
          position: absolute;
          right: 5%;
          top: 30px;
          font-size: 13px;
          color: #606266;
        }
        
      }
    }
  }

  .active {
    color: plum !important;
  }
</style>