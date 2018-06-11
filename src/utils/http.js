import Vue from "vue"
import axios from "axios"

let instance = axios.create({                                                                                                                                
    timeout:3000,                                                     
})
// request:请求
instance.interceptors.request.use((config)=>{
    console.log(config);
    // 判断是否等于生产环境，否则走开发路线
    if( process.env.NODE_ENV == 'production'){
        // 重置别的请求路径
        config.baseURL = "https://eip.btte.net"
    }else{
        config.baseURL = "http://localhost:8080"
    }
    return config;
},(err)=>{
    // 返回错误
    return Promise.reject(err)
    // console.log(err)
})

// 响应拦截
instance.interceptors.response.use((response)=>{
    console.log(response);
    // 判断数据是否响应
    if(response.status == 200){
        return response.data
    }else{
        return Promise.reject(response)
    }  
    return response
},(err)=>{
    console.log(err)
})

// 插件 就是一个对象
let httpPlugin = {
    install(){
         Object.defineProperty(Vue.prototype,"$http",{
              value:instance
         })
    }
}
export { instance }
export default httpPlugin; 