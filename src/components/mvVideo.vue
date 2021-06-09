<template>
  <div class="mvContainer">
    <div class="mvBar">
      <el-button round>全部视频 >>></el-button>
      
    </div>

    <div class="mvCon">
      <div class="mvItem" v-for="(item, index) in mvInfo" :key="index">
        <span class="playCount">{{item.playCount | setCount}}</span>
        <span class="duration">{{item.duration | setTime}}</span>
        <img :src="item.cover" alt="" width="260px" height="100%">
        <p>{{item.name | setText}}</p>
        <p class="artistName">{{item.artistName}}</p>
      </div>
    </div>

    <div class="songListFooter">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="60"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as api from '../api'
export default {
    name: 'mvVideo',
    data() {
      return{
        total:0,
        page:1,
        mvInfo: [],
      }
    },
    filters: {
      setText(val) {
        if(val && val.length > 20) {
          val = val.substring(0, 20) + '...'
        }
        return val
      },
      setCount(val) {
        if(val && val > 100000) {
          let a = (val / 10000)
          val = a.toFixed(0) + '万'
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
      this.conData();
    },
    methods: {
      conData() {
        api.mvAll({limit:60, offset:(this.page-1)*10}).then(res => {
          this.mvInfo = res.data;
          if(res.count) {
            this.total = res.count;
          }
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.conData()
      },
    }
}
</script>

<style lang="less" scoped>
.mvContainer {
  margin: 10px 100px 20px 100px;
  .mvBar {
    margin: 50px auto;
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
}

</style>