<template>
  <div class="mainpage">
    <el-dialog :visible.sync="noticeBoxDisplay" custom-class="noticeBoxDialog" width="900px">
      <!-- 公告详情 -->
      <noticeBox :data="noticeContent"></noticeBox>
    </el-dialog>

    <div class="index-container">
      <div class="container-line">
        <div class="container-left carouselBox">
          <el-carousel height="268px" trigger="click">
            <el-carousel-item :key="item.slideId" v-for="item in slideList">
              <img src="../assets/img/banner_940_01.png" width="100%">
              <h3>{{ item.slideTitle}}</h3>
              <p>{{item.slideContent}}</p>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="container-right">
          <div class="index-login">
            <div class="login-img">
              <img src="../assets/img/icon_40_xiaoyu.png">
            </div>
            <div class="login-text">{{userName}}</div>
            <el-button @click="logoutFn" class="logout-btn" v-if="userName != '游客'">注销</el-button>
            <el-button @click="openLoginBoxFn" class="login-btn" v-else>立即登录</el-button>
          </div>
        </div>
      </div>
      <div class="container-line">
        <div class="container-left">
          <div class="con-box con-box1 layout">
            <img src="../assets/img/banner_360_sygz.png">
            <h1 @click="ofenListFn('category','实用工具')">实用工具</h1>
            <p>各类实用工具，让写代码更高效更便捷！</p>
          </div>
          <div class="con-box con-box2 layout">
            <img src="../assets/img/pic_360_spkc.png">
            <h1 @click="ofenListFn('category','视频课程')">视频课程</h1>
            <p>缤纷课程，大师云集，带你解锁更多职业技能！</p>
          </div>
          <div class="con-box con-box3 hot layout">
            <img src="../assets/img/pic_180_rm.png">
            <h1 @click="ofenListFn('sortByDown','热门')">热门</h1>
            <p>精选热门榜单，人气工具和课程都在这里！</p>
          </div>
        </div>
        <div class="container-right">
          <div class="index-notice">
            <div class="index-notice-tit">通知</div>
            <div class="index-notice-div">
              <ul class="index-notice-ul">
                <li :key="item.noticeId" @click="openNoticeFn(item)" v-for="item in noticetList">
                  <a href="javascript:void(0)">{{item.noticeName}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container-line">
        <div class="container-box">
          <div class="container-box-tit">
            <div class="tit">
              <div class="tit-img">
                <img class src="../assets/img/icon_32_sygj.png">
              </div>
              <span class="tit-title">实用工具</span>
            </div>
            <div class="tit-tag">
              <ul class="tit-tag-ul">
                <li @click="ofenListFn('tags',item.name)"  v-for="(item , index) in list1" :key="index">{{item.name}}</li>
              </ul>
            </div>
            <div @click="ofenListFn('category','实用工具')" class="tit-more">全部</div>
          </div>
          <div class="container-box-list">
            <ul class="container-box-list-ul">
              <li @click="goDetailfn(tool.toolId)" :key="index" v-for=" (tool,index) in toolList">
                <div class="pic">
                  <img src="../assets/img/pic_170_02.png">
                </div>
                <div class="tit">{{tool.toolName}}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="container-box container-box-right">
          <div class="container-box-tit">
            <div class="tit">
              <div class="tit-img">
                <img class src="../assets/img/icon_32_spkc.png">
              </div>
              <span class="tit-title">视频课程</span>
            </div>
            <div class="tit-tag">
              <ul class="tit-tag-ul">
                <li  @click="ofenListFn('tags',item.name)"  v-for="(item , index) in list2" :key="index">{{item.name}}</li>
              </ul>
            </div>
            <div class="tit-more" @click="ofenListFn('category','视频课程')" >全部</div>
          </div>
          <div class="container-box-list">
            <ul class="container-box-list-ul">
              <li @click="goDetailfn(course.toolId)" :key="index" v-for=" (course,index) in courseList">
                <div class="pic">
                  <img src="../assets/img/pic_170_02.png">
                </div>
                <div class="tit">{{course.toolName}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '../api/api'
import { mapState } from 'vuex'
import noticeBox  from "../components/noticeBox";
export default {
  name: 'mainpage',
  data() {
    return {
      // keyWords:'',
      noticeBoxDisplay: false,//公告详情弹出框可见性
      noticeContent:{},//公告
      slideList: [],
      courseList: [],
      toolList: [],
      productList: [],
      list1:[
        { id: '1', name: '开发工具' },
        { id: '2', name: '数据库工具' },
        { id: '3', name: '脚本工具' },
      ],
        list2:[
        { id: '1', name: '技术类' },
        { id: '2', name: '公司竞争力类课程' },
        { id: '3', name: '技术类课程' }
      ],
      wordsList: [
        { id: '1', name: '开发工具' },
        { id: '2', name: '数据库工具' },
        { id: '3', name: '脚本工具' },
        { id: '4', name: '脚本工具' },
        { id: '5', name: '公司竞争力类课程' },
        { id: '6', name: '技术类课程' }
      ],
      noticetList: []
    }
  },
  computed: {
    // 计算属性
    ...mapState(['loginPop', 'userInfo']),
    userName: {
      // 用户名计算属性
      get: function() {
        // console.log(this.$store.getters.GET_USER_INFO)
        return this.$store.getters.GET_USER_INFO === null
          ? '游客'
          : JSON.parse(this.$store.getters.GET_USER_INFO).userName
      },
      set: function(_name) {
        this.userName = _name
      }
    }
  },
  components:{ noticeBox },
  mounted() {
    this.queryslideList() //加载走马灯
    this.queryListBycategory() //加载工具和课程列表框
    this.querynoticetList() //加载公告
    // console.log('...mainpage')
    // console.log('plugin-version', this.$YUPlugin.utils.version)
    // console.log('userinfo', JSON.parse(this.$store.getters.GET_USER_INFO))
  },
  methods: {
    /* 
    打开登录框
    */
    openLoginBoxFn() {
      this.$store.commit('SET_LoginPop', true)
    },
  ofenListFn: function (flag,params) {
    if (flag==='category') {
      this.$store.commit('SET_SearchParams', { spare1 : params });
      this.$store.commit('SET_listName',params);
    } else if(flag==='sortByDown') {
      this.$store.commit('SET_SearchParams', { sort : 'downloadAmount' });
      this.$store.commit('SET_listName','热门');
    } else if(flag==='tags') {
      this.$store.commit('SET_SearchParams', { toolType : params ,mark:"obscure"});
      this.$store.commit('SET_listName', params);
    }
    this.$router.push({ name: 'toollist'});
  },
      //路由跳转到详情页
    goDetailfn: function(toolId) {
      this.$router.push({ name: 'detail', query: { toolId: toolId} }); //路由
    },
  // 打开公告详情
  openNoticeFn: function(notice){
       this.noticeBoxDisplay= true;
      this.noticeContent=notice;
  },

    /* 
    注销
    */
    logoutFn() {
      this.$confirm('确定要注销吗?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.logout()
          this.$message({
            type: 'success',
            message: '注销成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '注销失败'
          })
        })
    },

    async logout() {
      const params = {}
      let res = await API.logoutParam(params)
      console.log('注销失败:' + JSON.stringify(res))
      this.$store.commit('REMOVE_TOKEN')
      this.$store.commit('REMOVE_USER_INFO')
    },

    async querynoticetList() {
      //查询公告列表
      const params = {
        page: '1',
        size: '4'
      }
      let res = await API.noticetListParam(params)
      if (res.code == '0') {
        // console.log('noticetList:' + JSON.stringify(res.data))
        this.noticetList = res.data //正式环境
        // this.noticetList = res.noticetList.data;//虚拟报文环境
      } else {
        // console.log("noticetList:" + JSON.stringify(res.message));
      }
    },

    async queryslideList() {
      const params = {
        page: '1',
        size: '4'
      }
      let res = await API.slideParam(params)
      if (res.code == '0') {
        this.slideList = res.data //正式环境
        // this.slideList = res.slideList.data;//虚拟报文环境
      } else {
        // console.log("slideParam:" + JSON.stringify(res.message));
      }
    },

    async queryListBycategory() {
      const ToolParams = {
        condition: JSON.stringify({
          toolName: null,
          sort: 'none',
          spare1: '1',
          status: null,
          toolType: null,
          mark: 'none'
        }),
        page: 1,
        size: 6
      }
      const courseParams = {
        condition: JSON.stringify({
          toolName: null,
          sort: 'none',
          spare1: '2',
          status: null,
          toolType: null,
          mark: 'none'
        }),
        page: 1,
        size: 6
      }

      let resTool = await API.queryListBycategory(ToolParams)
      if (resTool.code == '0') {
        this.toolList = resTool.data //正式环境
        // this.toolList = resTool.mainPageToolList.data;//虚拟报文环境
      } else {
        console.log('无法获取')
      }
      let resCourse = await API.queryListBycategory(courseParams)
      if (resCourse.code == '0') {
        this.courseList = resCourse.data //正式环境
        // this.courseList = resCourse.mainPageToolList.data;//虚拟报文环境
      } else {
        console.log('无法获取')
      }
    }
  }
}
</script>

<style>
@import '../assets/css/index.css';
</style>