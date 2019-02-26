const localJSON = false;
const localJsonPath = '/token.json';
const ApiList = {
    verifyCodeImage: (localJSON) ? localJsonPath : 'yusp-app-single/api/codeImage/verifyCodeImage',  //校验图形验证码
    token: (localJSON) ? localJsonPath : 'yusp-app-single/oauth/token',  //获取token值
    info: (localJSON) ? localJsonPath : 'yusp-app-single/api/session/info', // 获取用户信息
    logoutParam:(localJSON) ? localJsonPath : 'yusp-app-single/api/logout',  //注销
    slideParam: (localJSON) ? localJsonPath : 'yusp-app-single/api/slideinformation/querySlideInformation',//走马灯查询
    noticetListParam:(localJSON) ? localJsonPath : 'yusp-app-single/api/noticeinformation/query', // 查询公告
    queryListBycategory: (localJSON) ? localJsonPath : 'yusp-app-single/api/toolinformation/queryDetails', // 查询工具列表/工具详情是同一个接口，根据参数判断
    queryEvaluateListParam: (localJSON) ? localJsonPath : 'yusp-app-single/api/evaluateinformation/query',//获取评价列表
    toolDownParam: (localJSON) ? localJsonPath : 'yusp-app-single/api/adminfileuploadinfo/query',//工具下载
    addEvaluateParam: (localJSON) ? localJsonPath : 'yusp-app-single/api/evaluateinformation/addEvaluateInformation',//新增评价
    updateEvaluateInformation: (localJSON) ? localJsonPath : 'yusp-app-single/api/evaluateinformation/updateEvaluateInformation',//更新评价
}
export {ApiList}