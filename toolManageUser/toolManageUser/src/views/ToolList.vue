<template>
  <div class="toollist" id="ToolList" ref="ToolList">
    <div class="pos-div">
      <span class="pos-icon">
        <router-link :to="{ name: 'mainpage'}"><i class="tmp icon-shouye">首页</i></router-link>>
      </span>
      <span>{{listName}}</span>
    </div>
    <div class="cls-div-bg">
      <div class="cls-div">
        <div class="cls-div-tit">分类：</div>
        <div class="cls-div-con">
          <ul class="cls-div-ul">
            <li>开发工具</li>
            <li>脚本工具</li>
            <li>数据库工具</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="sort-div-bg">
      <div class="sort-div">
        <ul class="sort-div-ul">
          <li :class="{active:sortActive=='time'}" @click="sortFn('time')">综合</li>
          <li :class="{active:sortActive=='downloadAmount'}" @click="sortFn('downloadAmount')">下载量</li>
          <li :class="{active:sortActive=='favorableRate'}" @click="sortFn('favorableRate')">好评率</li>
        </ul>
      </div>
    </div>
    <div class="list-content-bg" v-if="toolsListData.length!=0">
      <div class="list-content">
        <div :key="index" class="list-box" v-for="(item,index) in toolsListData">
          <div class="list-box-pic">
            <img src="../assets/img/pic_170_01.png">
            <!--<img :src="item.spare1"/>-->
          </div>
          <div class="list-box-con">
            <div class="list-box-con-tit">{{item.toolName}}</div>
            <div class="list-box-con-text">
              <ul class="list-box-con-ul">
                <li class="download-num">
                  <span>下载量：</span>
                  <span>{{item.downloadAmount}}</span>
                </li>
                <li class="comment-num">
                  <span>好评率：</span>
                  <span>{{item.favorableRate}}%</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="list-box-oper">
            <button @click="goDetail(item.toolId,item.toolName)" class="oper-detail">查看详情</button>
          </div>
        </div>
      </div>
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="prev, pager, next, jumper"
      ></el-pagination>
    </div>
        <div class="list-content-bg" v-else>
      <div class="list-content">
        <div style="    text-align: center;
    padding: 80px 0;">暂无数据</div>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '../api/api';
import { mapState } from 'vuex';
export default {
  name: 'toollist',
  data() {
    return {
      sortActive: 'time', //工具列表排序按钮状态控制，默认是综合排序
      searchParams:{},
      toolsListData: [],
      currentPage: 1,
      queryParam: {},
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  created: function (){
    this.searchParams=this.$store.getters.GET_SearchParams;
    console.log('searchParams复制完毕：'+JSON.stringify(this.searchParams));
  },
  mounted() {
    // 组件创建完后获取数据，
    // this.getParams();
    this.queryToolList();
    // console.log('GET_listName:' + JSON.stringify(this.$store.getters.GET_listName)
    // );
  },
  methods: {
    //路由跳转到详情页
    goDetail(toolId) {
      this.$router.push({ name: 'detail', query: { toolId: toolId} }); //路由
      // this.$store.commit('SET_productName', toolName); //SET_productName是给详情页面包屑的第三项赋值
    },
    //列表排序
    sortFn: function(sort) {
      this.$store.commit('SET_SearchParams',{ sort: sort});
      this.sortActive = sort;
      this.queryToolList();
    },

    // getParams() {
    //   // 取到路由带过来的参数
    //   console.log('11111:'+JSON.stringify(this.$route.params)==='{}')
    //   let routerParams = (JSON.stringify(this.$route.params)==='{}') ? this.$store.getters.GET_SearchParams : this.$route.params;
    //   // console.log(routerParams)
    //   // 将数据放在当前组件的数据内
    //   this.queryParam.toolName = routerParams.toolName ? routerParams.toolName: null;
    //   this.queryParam.sort = routerParams.sort ? routerParams.sort : 'time';
    //   this.queryParam.spare1 = routerParams.spare1 ? routerParams.spare1 : null;
    //   this.queryParam.status = routerParams.status ? routerParams.status: null;
    //   this.queryParam.toolType = routerParams.toolType? routerParams.toolType: null;
    //   this.queryParam.mark = routerParams.mark ? routerParams.mark : 'none';
    //   this.queryToolList();
    // },
    //工具列表查询
    async queryToolList() {
       this.searchParams=this.$store.getters.GET_SearchParams;
      const params = {
        condition: JSON.stringify({
          toolName: this.searchParams.toolName,
          sort: this.searchParams.sort,
          spare1: this.searchParams.spare1,
          toolType: this.searchParams.toolType,
          mark: this.searchParams.mark
        }),
        page: this.pageNum,
        size: this.pageSize
      };
      let res = await API.queryListBycategory(params);
      if (res.code == '0') {
        this.toolsListData = res.data;
        this.total = res.total;
      } else {
        console.log('无法获取');
      }
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.queryToolList();
    },
    //换页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.queryToolList();
    }
  },
  computed: {
    // 计算属性
    ...mapState(['listName'])
  }
};
</script>

<style>
@import '../assets/css/toollist.css';
.oper-detail {
  border-radius: 4px;
}
</style>