<template>
  <div class="searchContainer">
      <div class="topName">
          <span class="jg">{{searchValue}}</span>
          <span>共寻找到 {{searchCount}} 个结果</span>
      </div>

      <div class="tab">
          <el-tabs v-model="activeName">
                <el-tab-pane label="歌曲" name="first">
                    <div class="newSongList" v-for="(item, index) in songsInfo" :key="index">
                        <div class="newSongItem" @click="getId(item.id)">
                            <p class="textColor">{{index + 1}}</p>
                            <p>{{item.name | setText}}</p>
                            <p>{{item.artists[0].name}}</p>
                            <p>{{item.album.name | setTexts}}</p>
                            <p class="textColor">{{item.duration | setTime}}</p>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="歌单" name="second">
                    <div class="songListCon">
                        <div class="songItem" v-for="(item, index) in songsList" :key="index">
                            <span class="playCount">{{item.playCount}}</span>
                            <span class="items">{{item.track.duration}}</span>
                            <img :src="item.coverImgUrl" alt="" width="250px" height="100%">
                            <p>{{item.name|setTextss}}</p>
                            <p class="artists">{{item.creator.nickname}}</p>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="MV" name="third">
                    <div class="mvCon">
                        <div class="mvItem" v-for="(item, index) in mvs" :key="index">
                            <span class="playCount">{{item.playCount | setCount}}</span>
                            <span class="duration">{{item.duration | setTime}}</span>
                            <img :src="item.cover" alt="" width="260px" height="100%">
                            <p>{{item.name | setTextss}}</p>
                            <p class="artistName">{{item.artistName}}</p>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
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
    name: 'search',
    data() {
        return {
            searchValue: '',
            searchCount: '',
            total:0,
            page:1,
            activeName: 'first',
            songsInfo: '',
            songsList: [],
            songUrl: [],
            mvs: []
        }
    },
    filters: {
      setText(val) {
        if(val && val.length > 10) {
          val = val.substring(0,10) + '...';
        }
        return val
      },
      setTexts(val) {
        if(val && val.length > 5) {
          val = val.substring(0,5) + '...';
        }
        return val
      },
      setTextss(val) {
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
        this.searchValue = this.$route.query.q

        this.getSongs();

        this.getSongsList()

        this.getMvs()
        
    },
    methods: {
        getSongs() {
            api.search({keywords: this.searchValue, limit:20, offset:(this.page-1)*10}).then(res => {
                this.songsInfo = res.result.songs
                this.total = res.result.songCount;
                this.searchCount = res.result.songCount;
            })
        },
        getSongsList() {
            api.search({keywords: this.searchValue, type: 1000, limit:20, offset:(this.page-1)*10}).then(res => {
                this.songsList = res.result.playlists
                this.total = res.result.playlistCount;
                this.searchCount = res.result.playlistCount;
            })
        },
        getMvs() {
            api.search({keywords: this.searchValue, type: 1004, limit:20, offset:(this.page-1)*10}).then(res => {
                this.mvs = res.result.mvs
                this.total = res.result.mvCount;
                this.searchCount = res.result.mvCount;
            })
        },

        getId(id) {
            api.playSong({id}).then (res => {
                this.songUrl = res.data[0].url
                this.$parent.songUrl = this.songUrl
            })
        },
        handleCurrentChange(val) {
            this.page = val;
            this.songs();
            this.songsList();
            this.mvs();
        },
    }
}
</script>

<style lang="less" scoped>
    .searchContainer {
        margin: 60px 100px;
        .topName {
            .jg {
                margin-right: 20px;
                font-size: 40px;
            }
        }
        .tab {
            margin: 30px auto;
            .el-tabs .el-tabs-pane {
                margin: auto 50px;
            }
            .el-tabs__item  {
                padding: auto 50px !important;
            }
        }
    }

    .el-tabs__item.is-active {
        color: plum !important;
    }
    

    .newSongList {
        // margin-top: 50px; 
      .newSongItem {
          width: 100%;
          height: 80px;
          line-height: 80px;
          display: flex;
          justify-content: space-between;
          margin: 0 0 5px 0;
          border-bottom: 1px solid #999;
          .newSongItem * {
              text-align:left;
          }
          .textColor {
              color: #606266;
              font-size: 13px;
          }
      }
    }


    .songListCon {
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
            .items {
                position: absolute;
                bottom: 10px;
                right: 5px;
                color: #999;
                font-size:15px;
            }
            p{
                font-size: 15px;
            }
        }
  }

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
              color: #fff;
              font-size:15px;
          }
          .duration {
              position: absolute;
              bottom: 15px;
              right: 5px;
              color: #fff;
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
</style>