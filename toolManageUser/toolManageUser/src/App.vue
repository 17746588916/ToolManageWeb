<template>
  <div id="app">
    <div class="header-div">
      <div class="header-top">
        <div class="header-logo">
          <div class="header-logo-img">
            <img src="./assets/img/logo.png">
          </div>
          <div class="header-logo-text">宇信科技工具管理平台</div>
        </div>
        <div class="header-search-div">
          <div class="header-search-ipt">
            <input placeholder="请输入信息" type="text" v-model="keyWords">
          </div>
          <div class="header-search-btn">
            <button @click="searchFn(1,keyWords)">
              <i class="el-icon-search"></i>
            </button>
          </div>
        </div>
        <div class="header-words">
          <ul class="header-words-ul">
            <li :key="item.id" @click="searchFn(1,item.name)" v-for="item in wordsList">
              <a href="javaScript:(0)">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="header-suggest">
          <el-dropdown @command="dropdownCommand" style="float: right;">
            <span class="el-dropdown-link" style="cursor: pointer;">
              <i class="el-icon-yx-user el-icon--left">{{userName}}</i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <template v-if="userName!='游客'">
                <el-dropdown-item command="us_center">个人中心</el-dropdown-item>
                <el-dropdown-item command="us_down">我的下载</el-dropdown-item>
                <!-- <el-dropdown-item command="a">积分</el-dropdown-item> -->
                <el-dropdown-item command="exit">退出</el-dropdown-item>
              </template>
              <template v-else>
                <el-dropdown-item command="login">登录</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 登录框 -->
    <el-dialog :visible.sync="loginPop" @close="closeLoginfn" custom-class="loginDialog" width="500px">
      <div class="yu-loginBox" style="width: 80%;display:block;margin: auto;">
        <div class="login-header">
          <h1>用户登录</h1>
        </div>
        <div style="display:block;margin: 15px auto;">
          <el-input auto-complete="off" placeholder="账号" ref="account" type="text" v-model="account">
            <template>
              <i class="tmp icon-zhanghao" slot="prepend"></i>
            </template>
          </el-input>
        </div>
        <div style="display:block;margin: 15px auto;">
          <el-input auto-complete="off" placeholder="密码" ref="checkPass" type="password" v-model="checkPass">
            <template>
              <i class="tmp icon-mima" slot="prepend"></i>
            </template>
          </el-input>
        </div>
        <div style="display:block;margin: 15px auto;">
          <el-input placeholder="验证码" ref="imageCode" type="text" v-model="imageCode">
            <template>
              <i class="tmp icon-yanzhengma" slot="prepend"></i>
            </template>
            <img :src="imageCodePictureUrl" @click="freshImageCodeFn" slot="append" style title="图片看不清？点击换一张" type="image">
          </el-input>
        </div>
        <div class="login-button-box">
          <el-button :loading="logining" @click.native.prevent="loginFn" style="width:100%;" type="primary">登录</el-button>
        </div>
        <span id="msg" v-show="msgShow">{{msgText}}</span>
      </div>
    </el-dialog>

    <span @click="openFeedBackDialogFn" class="FeedBack">
      <i class="tmp icon-fankui"></i>反馈
    </span>

    <!-- 用户反馈 -->
    <el-dialog :visible.sync="feedBackDialogFormVisible" custom-class="feedBackDialog" title="用户反馈" top="10px">
      <el-form :model="FeedBack" class="demo-ruleForm" label-position="top" ref="FeedBack">
          <el-form-item>
              <el-col :span="11">
            <el-input type="input" disabled v-model="FeedBack.raiseName">
              <template slot="prepend">
                <i class="tmp icon-zhanghao1"></i>
              </template>
            </el-input>
            </el-col>
            <el-col :offset="2" :span="11">
         <el-input placeholder="请输入联系方式" type="input" v-model="FeedBack.phone">
              <template slot="prepend">
                <i class="tmp icon-phone"></i>
              </template>
            </el-input>
             </el-col>
          </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="请输入邮箱" type="input" v-model="FeedBack.email">
            <template slot="prepend">
              <i class="tmp icon-Email"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="反馈内容" prop="opinionContent">
          <el-input
            :autosize="{ minRows: 10, maxRows: 15}"
            placeholder="请输入你的反馈内容"
            type="textarea"
            v-model="FeedBack.opinionContent"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="saveFeedBackFn('FeedBack')" type="primary">提交反馈</el-button>
      </div>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import API from './api/api';
// 生成唯一识别号
function genUUID(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  );
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    var r;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

var clientId = genUUID(16, 16);
export default {
  name: 'app',
  data() {
    return {
      imageCodePictureUrl:
        'http://192.168.254.129:7085/yusp-app-single/api/codeImage/' +
        clientId +
        '?t=' +
        new Date().getTime(), //验证码
      FeedBack: {
        //用户反馈表单参数
        raiseName: '',
        email: 'air@yusys.com.cn',
        phone: '',
        opinionContent: ''
      },
      feedBackDialogFormVisible: false, //用户反馈弹出框可见性属性
      logining: false, //登录时的特效
      //登录框参数
      account: 'admin',
      checkPass: 'admin',
      imageCode: null,
      checked: true, //登录记住密码
      keyWords: '',
      msgShow: false,
      msgText: null,
      wordsList: [
        //搜索框下的分类列表
        { id: '1', name: '开发工具' },
        { id: '2', name: '数据库工具' },
        { id: '3', name: '脚本工具' },
        { id: '4', name: '脚本工具' },
        { id: '5', name: '公司竞争力类课程' },
        { id: '6', name: '技术类课程' }
      ]
    };
  },

  mounted() {
    console.log('app start...');
    console.log(
      'APP GET_listName:' + JSON.stringify(this.$store.getters.GET_listName)
    );
  },
  computed: {
    ...mapState(['loginPop', 'listName', 'userInfo']), //计算属性，监听登录框的可见性属性
    loginPop: {
      get: function() {
        return this.$store.getters.GET_LoginPop;
      },
      set: function(_param) {
        this.$store.commit('SET_LoginPop', _param);
      }
    },
    userName: {
      // 用户名计算属性
      get: function() {
        // console.log(this.$store.getters.GET_USER_INFO)
        return this.$store.getters.GET_USER_INFO === null
          ? '游客'
          : JSON.parse(this.$store.getters.GET_USER_INFO).userName;
      },
      set: function(_name) {
        this.userName = _name;
      }
    }
  },

  methods: {
    openFeedBackDialogFn: function() {
      //打开用户反馈框
      if(this.$store.getters.GET_USER_INFO){
      this.feedBackDialogFormVisible = true;
      this.$nextTick(() => {
        this.FeedBack.raiseName = JSON.parse(
          this.$store.getters.GET_USER_INFO
        ).userName;
        this.FeedBack.email = '',
        this.FeedBack.phone = '',
        this.FeedBack.opinionContent = '';
      });
      }else{
        this.$confirm('您还没有登录，请先登录再操作。您要登录吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        })
          .then(() => {
            this.$store.commit('SET_LoginPop', true);
          })
          .catch(() => {
          })
      }
    },

    searchFn: function(flag, keyWords) {
      //搜索
      let params = this.$store.getters.GET_SearchParams;
      if (flag == 1) {
        //模糊查询
        params.toolName = keyWords;
        params.toolType = keyWords;
        params.spart1 = null;
        params.mark = 'obscure';
      } else if (flag == 2) {
        params.sort = 'downloadAmount';
      }
      this.$store.commit('SET_SearchParams', params);
      this.$store.commit('SET_listName', keyWords);
      if (this.$router.history.current.name === 'toollist') {
        let theTool = document.getElementById('ToolList').__vue__;
        theTool.queryToolList();
      } else {
        this.$router.push({ name: 'toollist' }); //路由传参， 类似post传参
      }
    },

    dropdownCommand: function(command) {
      if (command == 'us_center') {
        // yufp.router.to();
      } else if (command == 'us_down') {
        // yufp.router.to();
      } else if (command == 'exit') {
        this.logoutFn();
        // yufp.router.to();
      } else if (command == 'login') {
        // yufp.router.to();
        this.freshImageCodeFn();
        this.$store.commit('SET_LoginPop', true);
      }
    },
    /* 
    关键字搜索
    */
    // keySearchFn(keyWords) {
    //   this.keyWords = keyWords;
    //   this.searchFn();
    // },
    closeLoginfn() {
      this.logining = false;
      this.$store.commit('SET_LoginPop', false);
    },

    // 刷新图形验证码
    freshImageCodeFn: function() {
      this.imageCodePictureUrl =
        'http://192.168.254.129:7085/yusp-app-single/api/codeImage/' +
        clientId +
        '?t=' +
        new Date().getTime();
    },
    /*
     * 登录
     */
    loginFn() {
      if (this.account == '') {
        this.msgText = '请输入用户名!';
        this.msgShow = true;
        this.$refs.account.focus();
        return;
      }
      if (this.checkPass == '') {
        this.msgText = '请输入密码!';
        this.msgShow = true;
        this.$refs.checkPass.focus();
        return;
      }
      if (this.imageCode == '') {
        this.msgText = '请输入验证码!';
        this.msgShow = true;
        this.$refs.imageCode.focus();
        return;
      }
      this.msgShow = false;
      this.logining = true;
      let imageCodeParam = {
        clientId: clientId,
        imageCode: this.imageCode
      };
      this.verifyCodeImage(imageCodeParam);
    },

    //校验验证码
    async verifyCodeImage(params) {
      let res = await API.verifyCodeImageParam(params);
      console.log('验证码:' + res);
      if (!res) {
        this.freshImageCodeFn();
        this.msgText = '验证码错误！';
        this.msgShow = true;
        this.logining = false;
        return false;
      } else {
        var loginParams = {
          //登录获取token的参数
          username: this.account,
          password: this.checkPass,
          grant_type: 'password' //必传
        };
        this.getTokenInfo(loginParams);
      }
    },

    async getTokenInfo(params) {
      let res = await API.getTokenInfoParam(params);
      if (res.code === '100001') {
        // 处理登录了状态
        this.msgText = '账号或密码错误！';
        this.msgShow = true;
        this.logining = false;
        this.freshImageCodeFn();
        return false;
      } else {
        this.$store.commit('SET_TOKEN', res.access_token);
        this.getUserInfo();
        this.msgShow = false;
      }
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
          this.logout();
          this.$message({
            type: 'success',
            message: '注销成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '注销失败'
          });
        });
    },

    async logout() {
      const params = {};
      let res = await API.logoutParam(params);
      console.log('注销失败:' + JSON.stringify(res));
      this.$store.commit('REMOVE_TOKEN');
      this.$store.commit('REMOVE_USER_INFO');
    },

    async getUserInfo() {
      // 获取用户信息
      let res = await API.getUserInfoParam();
      if (res) {
        // 获取用户信息报文 JSON.stringify(res.userInfo)
        this.$store.commit('SET_USER_INFO', JSON.stringify(res));
        this.closeLoginfn();
      } else {
        console.log('login falid');
      }
    }
  }
};
</script>

<style>
@import './assets/css/common.css';
.fade-enter-active,
.fade-leave-active {
  transition: all 0.01s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
