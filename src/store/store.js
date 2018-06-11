import Vue from 'vue'
import Vuex from 'vuex'
import { instance as http } from '@/utils/http.js'
Vue.use(Vuex)
let store = new Vuex.Store({
    state:{
        menu:[],
        group:[],
        table:[]
    },
    mutations:{ //通过commit来触发一个mutations  只有它才能改变state
    updatedMenu(state,data){
          state.menu = data.data
    },
    updataGroup(state,payload){
          state.group = payload
    },
    updataTable(state,payload){
        state.table = payload
    },
    deleteItems(state,payload,cb){
       console.log(state,payload)
       let tmp = [...state.table];
       let idex;
       tmp.forEach((item,index) =>{
           if(item.code == payload.code){
               idex = index
           }
       })
       tmp.splice(idex,1)
       state.table = tmp;
       payload.cb()
    }
    },
    actions:{ //通过dispatch来触发一个action
        fetchMenu({commit}){
          http.get('static/server/menu.json')
          .then(res =>{
              console.log(res.data)
              commit('updatedMenu',res)
           // this.menu = res.data
          })
        },
        fetchGroup({commit,state},cb){ 
            if(state.group.length>0){
                 cb()
            }
          http.get('static/server/group.json')
            .then(res =>{
               commit('updataGroup',res.orgs)
               cb()
            })
        },
        fetchTable({commit,state},payload){
            http.get('static/server/user.json')
            .then(res =>{
               commit('updataTable',res.userList)
             
            })
        },
        // deleteItem({commit},payload){
        //   commit('deleteItems',payload)
        // }

    },
    getters:{ //是store的计算属性  一般用来过滤
        //弹框搜索
        filtersGroup(state){
          console.log(state)
          return (filter)=>{
               if(filter){
                   let res = state.group.filter((item) =>{
                       return item.ORGNAME.indexOf(filter)>-1 || item.FORGNAME.indexOf(filter)>-1
                   })
                   return res
               }else{
                   return state.group
               }    
          }
      },
      //搜索用户名
      tableData(state){
          console.log(state)
          return (filter)=>{
            if(filter.username){
                let ress = state.table.filter((item) =>{
                    return item.name.indexOf(filter.username)>-1
                })
                return ress
            }else{
                let tabarry = state.table.slice(filter.pageSize*(filter.page-1),filter.pageSize*filter.page)
                return tabarry
            }   
          }
      }
    },
    modules:{}
})
export default store