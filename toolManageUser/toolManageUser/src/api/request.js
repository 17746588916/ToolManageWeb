import axios from 'axios';
import qs from 'qs';
import store from '../store/store'

const service = axios.create({
    baseURL: 'http://192.168.254.129:7085/'
});

//请求统一处理
service.interceptors.request.use(config => {
    // console.log('数据处理中', config);
    config.url = config.url + '?_=' + new Date().valueOf();
    // config.method === 'post'
    //     ? config.data = qs.stringify({...config.data})
    //     : config.params = {...config.data};

    

    if(config.header === undefined ) {
        config.headers['Content-Type'] = 'application/json; charset=UTF-8';  
        config.method === 'post'
        ? config.data = {...config.data}
        : config.params = {...config.data};
    }else{
        config.headers = Object.assign(config.headers, config.header);
        config.method === 'post'
        ? config.data = qs.stringify({...config.data})
        : config.params = {...config.data};
    }
    
    // config.headers['Content-Type'] = config.headers['Content-Type'] ? config.headers['Content-Type'] : 'application/json; charset=UTF-8';
    // 处理token
    config.headers['Authorization'] = (store.state.token === null)
                                      ? 'Basic d2ViX2FwcDo='
                                      : 'Bearer '+ window.sessionStorage.getItem("UFP-Authorization") ;
    // console.log('config:'+JSON.stringify(config));
    return config;
}, error => {
    console.log('错误');
    Promise.reject(error);

});

//响应统一处理
service.interceptors.response.use(
    response => {
        // 通讯报文条件判断
        if (response){
            // console.log('响应值：',JSON.stringify(response.data) );
            return response.data;
        } else {
            // 登录超时这些异常情况，但是通讯是200的异常。
            console.log('错误1', store.state.loginPop);
            // store.state.loginPop = true;
            store.commit('SET_LoginPop', true);
            console.log('错误2', store.state.loginPop);
        }
    },
    error => {
        if (error.response && error.response.status === 401) {
            this.$confirm('您还没有登录，请先登录再操作。您要登录吗？', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
              })
                .then(() => {
                    store.commit('SET_LoginPop', true);
                })
                .catch(() => {
                  this.$message({
                    type: 'info',
                    message: '注销失败'
                  })
                })
            
        }
        console.log('错误', error);
        
        let text = JSON.parse(JSON.stringify(error)).response.status === 404
            ? '404'
            : '网络异常，请重试';

        console.log(text);

        return Promise.reject(error);
    }
)

export default service;
