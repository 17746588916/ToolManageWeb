<template>
  <div class="detail">
    <div class="pos-div">
      <span>
        <router-link :to="{ name: 'mainpage'}"><i class="tmp icon-shouye">首页</i></router-link>>
      </span>
      <span>
        <router-link
          :to="{ name: 'toollist', params: {  mark: 'obscure',
        toolName: listName ? listName : null,sort: 'downloadAmount',status: '',toolType: listName ? listName : null }}"
        >{{listName}}</router-link>>
      </span>
      <span>{{toolDetailData.toolName}}</span>
    </div>
    <div class="detail-header-bg">
      <div class="detail-header">
        <div class="tool-pic">
          <img src="../assets/img/pic_246_xqtp.png">
        </div>
        <div class="tool-title">{{toolDetailData.toolName}}</div>
        <div class="tool-oper">
          <button @click="toMark" class="tool-btn tool-comment">评分</button>
          <button @click="downFn(toolDetailData.toolId)" class="tool-btn tool-download">下载</button>
        </div>
        <div class="tool-info">
          <div class="tool-info-box">
            <div class="tool-info-box-tit">用户评分</div>
            <div class="tool-info-box-con">
              <div class="tool-info-num">{{toolScore}}</div>
              <div class="tool-info-star">
                <el-rate
                  disabled
                  show-text
                  text-color="#ff9900"
                  text-template="{value}"
                  v-model="toolScore"
                ></el-rate>
                <div class="tool-info-star-text">{{commentNum}}人评分</div>
              </div>
            </div>
          </div>
          <div class="tool-info-box">
            <div class="tool-info-box-tit">累计下载量</div>
            <div class="tool-info-box-con">
              <span class="download-total-num">{{toolDetailData.downloadAmount}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-tabs-bg">
      <template>
        <el-tabs class="detail-tabs" v-model="activeName">
          <el-tab-pane label="介绍" name="first" style="height: 100%">
            <div class="tool-detail">
              <div class="tool-detail-tit">工具简介</div>
              <div class="tool-detail-text">{{toolDetailData.functionBrief}}</div>
            </div>
            <div class="tool-detail">
              <div class="tool-detail-tit">热门短评</div>
              <div class="noData" v-if="noData">暂无数据</div>
              <div class="hot-comment">
                <div class="hot-comment-list">
                  <div :key="index" class="hot-comment-line" v-for="(comment,index) in commentList">
                    <div class="comment-user-info">
                      <div class="pic">
                        <img src="../assets/img/Profile Image.png">
                      </div>
                      <div class="name">{{comment.evaluator}}</div>
                      <div class="other">
                        <ul class="other-ul">
                          <li class="other-date">{{comment.evaluateTime}}</li>
                          <li class="other-star">
                            <el-rate
                              disabled
                              show-text
                              text-color="#ff9900"
                              text-template="{value}"
                              v-model="comment.evaluateLevel"
                            ></el-rate>
                            <ul class="other-star-ul"></ul>
                          </li>
                        </ul>
                      </div>
                      <div class="like-num">{{comment.praiseAmount}}</div>
                    </div>
                    <div class="comment-text">{{comment.subjectEvaluate}}</div>
                  </div>
                </div>
                <div class="hot-comment-list" style="margin-bottom: 10px;" v-if="listHasData">
                  <el-pagination
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    :total="commentNum"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    layout="prev, pager, next, jumper"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="用户评论" name="second">
            <div class="tool-detail">
              <div class="tool-detail-tit">热门短评</div>
              <div class="noData" v-if="noData">暂无数据</div>
              <!-- comment area -->
              <div class="tool-detail" v-if="newCommit==true">
                <div class="evalInput">
                  <span class="evalText">满意度:</span>
                  <el-rate
                    show-text
                    style="display: inline-block;vertical-align:middle"
                    text-color="#ff9900"
                    v-model="starValue"
                  ></el-rate>
                </div>
                <el-input
                  :autosize="{ minRows: 4, maxRows: 6}"
                  placeholder="请输入内容"
                  style="margin:10px 20px; width: 50%;"
                  type="textarea"
                  v-model="commentText"
                ></el-input>
                <div class="issueBtn">
                  <button @click="sendEvaluateFn" class="comment-btn">发布</button>
                </div>
              </div>
              <div class="comment-oper">
                <button @click="newCommitFn()" class="comment-btn" v-if="newCommit==false">写短评</button>
                <!--<button class="comment-btn" v-else @click="sendEvaluateFn">发布</button>-->
              </div>
            </div>
            <div class="hot-comment">
              <div class="hot-comment-list">
                <div :key="index" class="hot-comment-line" v-for="(comment,index) in commentList">
                  <div class="comment-user-info">
                    <div class="pic">
                      <img src="../assets/img/Profile Image.png">
                    </div>
                    <div class="name">{{comment.evaluator}}</div>
                    <div class="other">
                      <ul class="other-ul">
                        <li class="other-date">{{comment.evaluateTime}}</li>
                        <li class="other-star">
                          <el-rate
                            disabled
                            show-text
                            text-color="#ff9900"
                            text-template="{value}"
                            v-model="comment.evaluateLevel"
                          ></el-rate>
                          <ul class="other-star-ul"></ul>
                        </li>
                      </ul>
                    </div>
                    <div
                      @click="praiseFn(comment,index)"
                      class="like-num" :class="{likeActive:isClick}"
                    >{{comment.praiseAmount}}</div>
                  </div>
                  <div class="comment-text">{{comment.subjectEvaluate}}</div>
                </div>
              </div>
              <div class="hot-comment-list" style="margin-bottom: 10px;" v-if="listHasData">
                <el-pagination
                  :current-page.sync="currentPage"
                  :page-size="pageSize"
                  :total="commentNum"
                  @current-change="handleCurrentChange"
                  @size-change="handleSizeChange"
                  layout="prev, pager, next, jumper"
                ></el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '../api/api'
import { mapState } from 'vuex'
export default {
  name: 'detail',
  data() {
    return {
      commentText: '', // the comment text
      newCommit: false, // the state of "comment send button"
      commentNum: 0,
      toolScore: 0,
      downloadAmount: 0,
      toolDetailData: {},
      activeName: 'first',
      currentPage: 1,
      commentList: [],
      starValue: null,
      pageNum: 1,
      pageSize: 10,
      isClick: false,
      listHasData:false,
      noData:false
    }
  },
  created: function (){
    if(!(this.$route.query.hasOwnProperty('toolId'))) {//当地址栏里的参数取不到时返回首页
       this.$router.push({  path: '/'});//返回首页
    }
  },
  mounted() {
    this.queryToolDetail()
    this.queryEvaluateList()
  },
  computed: {
    // 计算属性
    ...mapState(['listName']),
  },
  methods: {
    //评分按钮事件
    toMark() {
      this.activeName = 'second'
    },
    //写评价
    newCommitFn: function() {
    if(this.$store.getters.GET_USER_INFO){
      this.newCommit = true;
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
    //发布评论
    sendEvaluateFn() {
      this.addEvaluate()
    },
    downFn: function(toolId) {
      if(this.$store.getters.GET_USER_INFO){
          this.toolDown(toolId);
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
      //评价列表-评价点赞
    async praiseFn(comment) {
        // for(let i=0;i<this.commentList.length;i++){
        //     this.$set(this.commentList[i], 'isClick', false)
        // }
        //   if(this.commentList[index].isClick=='false'){
        //       this.commentList[index].isClick=='true'
        //       comment[index].praiseAmount=parseFloat(comment[index].praiseAmount)+1
        //   }else if(this.commentList[index].isClick=='true'){
        //       this.commentList[index].isClick=='false'
        //       comment[index].praiseAmount=parseFloat(comment[index].praiseAmount)-1
        //   }
            if(!this.isClick){
              this.isClick=true;
              comment.praiseAmount=parseFloat(comment.praiseAmount)+1
          }else{
              this.isClick=false;
              comment.praiseAmount=parseFloat(comment.praiseAmount)-1
          }


          const params = {
              evaluateId: comment.evaluateId,
              praiseAmount: comment.praiseAmount
              // praiseAmount: praiseAmount ? Number(praiseAmount) + 1 : 1
          }
          let res = await API.updateEvaluateInformation(params)
          if (res.code == '0') {
              console.log('评价点赞:' + JSON.stringify(res))
              // this.queryEvaluateList()
          } else {
              console.log('无法获取')
          }
    },
    /* 工具详情 */
    async queryToolDetail() {
      const params = {
        condition: JSON.stringify({
          toolId: this.$route.query.toolId,
          sort: 'none',
          mark: '1'
        })
      }
      let res = await API.queryListBycategory(params)
      if (res.code == '0') {
        this.toolDetailData = res.data[0]
      } else {
        console.log('无法获取')
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.queryEvaluateList()
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageNum = val
      this.queryEvaluateList()
    },
    /* 工具下载 */
    async toolDown(toolId) {
      const params = {
        condition: JSON.stringify({
          busNo: toolId
        })
      }
      let res = await API.toolDownParam(params)
      console.log('toolDown:' + JSON.stringify(res))
    },
    /* 评价列表 */
    async queryEvaluateList() {
      const params = {
        condition: JSON.stringify({
          toolId: this.$route.query.toolId
          // workNumber: JSON.parse(this.$store.getters.GET_USER_INFO).loginCode
        }),
        page: this.pageNum,
        size: this.pageSize
      }
      let res = await API.queryEvaluateListParam(params)
      if (res.code == '0') {
        this.toolScore = 0.0
        this.commentNum = res.total
          if(res.data.length==0){
              this.noData=true
          }else{
              this.listHasData=true
            this.commentList = res.data
            this.commentList.forEach(item => {
               item.evaluateLevel = Number(item.evaluateLevel)
             })
            this.toolScore = Number(this.commentList[0].levelSum)
          }
      } else {
        console.log('无法获取')
      }
    },
    /* 新增评价 */
    async addEvaluate() {
      if (this.starValue == '') {
        alert('请选择满意程度')
        return
      } else if (this.commentText == '') {
        alert('请填写评论')
        return
      } else {
        alert('发布成功！')
        let d = new Date()
        let str =
          d.getFullYear() +
          '-' +
          (d.getMonth() + 1 >= 10
            ? +(d.getMonth() + 1)
            : '0' + (d.getMonth() + 1)) +
          '-' +
          (d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()) +
          ' ' +
          (d.getHours() >= 10 ? d.getHours() : '0' + d.getHours()) +
          ':' +
          +(d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes()) +
          ':' +
          +(d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds())
        const params = {
          toolId: this.$route.query.toolId,
          evaluatorImg: 'themes/common/images/tool-pic.png',
          evaluator: JSON.parse(this.$store.getters.GET_USER_INFO).userName,
          evaluateTime: str,
          evaluateLevel: this.starValue,
          Like: 0,
          praiseAmount: 0,
          subjectEvaluate: this.commentText
        }
        let res = await API.addEvaluateParam(params)
        if (res.code == '0') {
          this.newCommit = false
          this.commentText = ''
          this.starValue = ''
          this.queryEvaluateList()
        } else {
          console.log('addEvaluate:' + JSON.stringify(res))
        }
      }
    }
  }
}
</script>

<style>
@import '../assets/css/detail.css';
@import '../assets/css/toollist.css';
.evalInput {
  margin-left: 20px;
}
.evalText {
  font: 15px bold;
  vertical-align: middle;
  margin-right: 10px;
  color: #ff9900;
}
.issueBtn {
  width: 56%;
  float: right;
}
.likeActive{
  background: url(../assets/img/dianzanAfter.png) no-repeat left center  !important;
}
  .noData{
    margin: 20px 20px;
    font-size: 15px;
    color: #666;
  }
</style>