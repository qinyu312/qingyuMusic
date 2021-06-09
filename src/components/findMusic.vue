<template>
  <div class="findContainer">
      <div class="findSwiper">
        <el-carousel :interval="4000" type="card" height="220px">
            <el-carousel-item v-for="item in bannerImg" :key="item">
                <el-image :src="item.imageUrl"></el-image>
            </el-carousel-item>
        </el-carousel>
      </div>

      <div class="songList">
          <h4>推荐歌单 >>></h4>

          <div class="songCon">
             <div class="songItem" v-for="(item, index) in songListInfo" :key="index">
                 <p class="bar">{{item.copywriter}}</p>
                 <img :src="item.picUrl" alt="" width="100%" height="100%">
                 <p>{{item.name}}</p>
             </div>
          </div>
      </div>

      <div class="newSong">
          <h4>最新歌曲 >>></h4>

          <div class="newCon">
              <div class="newItem" v-for="(item, index) in newSongInfo" :key="index" @click="playSong(item.id)">
                  <img :src="item.picUrl" alt="" width="80px" height="80px">
                  <p>{{item.name}}</p>
                  <p class="artists">{{item.song.artists[0].name}}</p>
              </div>
          </div>
      </div>

      <div class="mvList">
          <h4>MV >>></h4>

          <div class="mvCon">
              <div class="mvItem" v-for="(item, index) in mvInfo" :key="index">
                      <span class="playCount">{{item.playCount}}</span>
                      <span class="duration">{{item.duration | setTime}}</span>
                      <img :src="item.picUrl" alt="" width="320px" height="100%">
                  <p>{{item.copywriter | setText}}</p>
                  <p class="artists">{{item.artistName}}</p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import * as api from '../api'
export default {
    name: 'findMusic',
    data () {
        return {
            bannerImg: [],
            songListInfo: [],
            newSongInfo: [],
            mvInfo: [],
            songUrl: ""
        }
    },
    filters:{
        setText(value) {
            if(value&& value.length > 20) {
                value= value.substring(0,20)+ '...';
            }
            return value;
        },
        setTime(value) {
            let s = value / 1000;
            let m = s / 60;
            value = m.toFixed(1)
            
            return value
        }

    },
    created() {
        // 轮播图接口
        api.getBanner({}).then (res => {
            this.bannerImg = res.banners
        })

        // 推荐歌单接口
        api.getSongList({limit: 15}).then (res => {
            this.songListInfo = res.result
        })

        // 最新歌曲接口
        api.getNewSong({}).then (res => {
            this.newSongInfo = res.result
        })

        // mv接口
        api.getMv({}).then (res => {
            // console.log(res)
            this.mvInfo = res.result
        })
    },
    methods : {
        playSong(id) {
            // 播放歌曲接口
            api.playSong({id}).then (res => {
                this.songUrl = res.data[0].url
                this.$parent.songUrl = this.songUrl
            })
        }
    }
}
</script>

<style lang="less" scoped>
.findContainer {
    .findSwiper {
        margin: 20px 100px;
    }
    .songList {
        margin: 20px 100px;

        .songCon {
            margin: 20px 0 70px 0;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .songItem {
                width: 16%;
                // height: 200px;
                margin: 40px 20px;
                position: relative;
                .bar {
                    position: absolute;
                    top: 10px;
                    left: 0;
                    color: #fff;
                    // display: none;
                    visibility: hidden;
                }
                .bar:hover {
                    visibility: visible;
                }
            }
        }
    }
    .newSong {
        margin: 10px 100px 80px 100px;
        .newCon {
            margin: 20px 0 70px 0;
            display: flex;
            // justify-content: ;
            flex-wrap: wrap;
            .newItem {
                width: 48%;
                height: 100px;

                img {
                    float: left;
                }
                p{
                    margin-left: 130px;
                    margin-bottom: 20px;
                }
                
            }
        }
    }
    .mvList {
        margin: 10px 100px 80px 100px;
        .mvCon {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            margin: 20px 0 70px 0;
            .mvItem {
                position: relative;
                margin: 20px 0 60px 0;
                .playCount {
                    position: absolute;
                    top: 10px;
                    right: 5px;
                    color: #999;
                    font-size:15px;
                }
                .duration {
                    position: absolute;
                    bottom: 15px;
                    right: 5px;
                    color: #999;
                    font-size:15px;
                }

                p{
                    font-size: 15px;
                }
            }
        }
    }
}

.artists {
    color: #999;
    font-size: 13px;
    // margin-top: 25px;
} 

</style>