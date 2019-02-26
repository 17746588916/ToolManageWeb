//post参数放data中，get参数放params
import service from './request'
import { ApiList } from './apilist'

const api = {
    //// 校验图形验证码
    verifyCodeImageParam: data => {
        return service({
            url: ApiList.verifyCodeImage,
            method: 'post',
            data
        })
    },
    //// 获取token值
    getTokenInfoParam: data => {
        return service({
            url: ApiList.token,
            method: 'post',
            header: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            data
        })
    },
    // 获取用户信息
    getUserInfoParam: data => {
        return service({
            url: ApiList.info,
            method: 'get',
            data
        })
    },
    //注销
    logoutParam: data => {
        return service({
            url: ApiList.logoutParam,
            method: 'post',
            data
        })
    },
    //走马灯查询
    slideParam: data => {
        return service({
            url: ApiList.slideParam,
            method: 'get',
            data
        })
    },
    //公告查询
    noticetListParam: data => {
        return service({
            url: ApiList.noticetListParam,
            method: 'get',
            data
        })
    },
    // 查询工具列表
    queryListBycategory: data => {
        return service({
            url: ApiList.queryListBycategory,
            method: 'GET',
            data
        })
    },
    //更新评价
    updateEvaluateInformation: data => {
        return service({
            url: ApiList.updateEvaluateInformation,
            method: 'POST',
            data
        })
    },
    //获取评价列表
    queryEvaluateListParam: data => {
        return service({
            url: ApiList.queryEvaluateListParam,
            method: 'get',
            data
        })
    },
    //工具下载
    toolDownParam: data => {
        return service({
            url: ApiList.toolDownParam,
            method: 'get',
            data
        })
    },
    //新增评价
    addEvaluateParam: data => {
        return service({
            url: ApiList.addEvaluateParam,
            method: 'POST',
            data
        })
    },
}
export default api

