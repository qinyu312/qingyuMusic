<template>
  <div class="playContainer">

      <div class="topDesc">
          <img :src="playSongsInfo.coverImgUrl" alt="" width="250px" height="100%">
          <div class="desc">
            <h2>{{playSongsInfo.name}}</h2>
            <p class="name">创建:  {{playSongsInfo.creator.nickname}}</p>
            <p class="tag">标签:  {{playSongsInfo.tags}}</p>
            <p class="descr">简介:  {{playSongsInfo.description}}</p>
          </div>
      </div>

      <div class="playCon">
          <el-tabs v-model="activeName">
              <el-tab-pane label="歌曲" name="first">
                  <div class="newSongList" v-for="(item, index) in playSongsList" :key="index">
                    <div class="newSongItem" @click="getId(item.id)">
                        <p class="index textColor">{{index + 1}}</p>
                        <img :src="item.al.picUrl" alt="" width="80px" height="80px">
                        <p class="name">{{item.name}}</p>
                        <p class="star">{{item.ar[0].name}}</p>
                        <p class="dt textColor">{{item.dt | setTime}}</p>
                    </div>
                  </div>
              </el-tab-pane>
              
              <el-tab-pane label="评论" name="second">
                  <div class="userSay" v-for="(item, index) in hotSay" :key="index">
                      <img :src="item.user.avatarUrl" alt="">
                      <p><span style="color: red">{{item.user.nickname}} : </span>{{item.content}}</p>
                      <p class="sj">{{item.time | sjc}}</p>
                  </div>
              </el-tab-pane>
          </el-tabs>
      </div>

      
  </div>
</template>

<script>
import * as api from '../api'
export default {
    name: 'playSongList',
    data() {
        return {
            activeName: 'first',
            playSongsInfo: {},
            playSongsList: [],
            hotSay: []
        }
    },
    filters: {
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
      },
      sjc(val) {
          var date = new Date(val);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	    var D = date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m = date.getMinutes() + ':';
	    var s = date.getSeconds();
	    return Y + M + D + h + m + s;
      }
    },
    created() {
        let id = this.$route.query.id
        api.playSongInfo({id}).then(res => {
            this.playSongsInfo = res.playlist;
            this.playSongsList = res.playlist.tracks;
            
        })

        api.hotSay({id, type:2}).then(res => {
            this.hotSay = res.hotComments;
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
    }
}
</script>

<style lang="less" scoped>
    .playContainer {
        margin: 50px 100px;
        .topDesc {
            width: 1000px;
            height: 300px;
            background: #fff;
            position: relative;
            img {
                float: left;
            }
            h2{
                position: absolute;
                left: 300px;
                top: 0;
            }
            .name {
                position: absolute;
                left: 300px;
                top: 30%;
            }
            .tag {
                position: absolute;
                left: 300px;
                bottom: 40%;
            }
            .descr {
                position: absolute;
                left: 300px;
                bottom: 0;
            }
        }
        .playCon {
            margin-top: 60px;
            .newSongList {
            margin-top: 40px; 
        .newSongItem {
            width: 100%;
            height: 80px;
            line-height: 80px;
            margin: 0 0 5px 0;
            border-bottom: 1px solid #999;
            position: relative;
                .index {
                    position: absolute;
                    top: 0;
                    left: 1%;
                }
                img {
                    position: absolute;
                    top: 0;
                    left: 10%;
                }
                .name {
                    position: absolute;
                    top: 0;
                    left: 30%;
                }
                .star {
                    position: absolute;
                    top: 0;
                    right: 30%;
                }
                .dt {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
                .newSongItem * {
                    // text-align:left;
                }
                .textColor {
                    color: #606266;
                    font-size: 13px;
                }
            }
        }
        }

        
    }

    .userSay {
        margin: 30px auto;
        img {
            float: left;
            width: 50px;
            height: 50px;
            border-radius: 50%;
        };
        p {
            line-height: 50px;
            margin-left: 80px;
        }
        sj {
            color: #606266;
            font-size: 13px;
        }
    }
</style>