import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start/start'
import Login from '@/page/Login/login.vue'
import Home from '@/page/Home/home.vue'
import Employee_admin from '@/page/LeftlistPage/employee_admin/employee_admin.vue'
import Menu_management from '@/page/LeftlistPage/menu_management/menu_management.vue'
import Usefunction_admin from '@/page/LeftlistPage/usefunction_admin/usefunction_admin.vue'
import Organization_admin from '@/page/LeftlistPage/organization_admin/organization_admin.vue'
import Setsafe_admin from '@/page/LeftlistPage/setsafe_admin/setsafe_admin.vue'
import Workgroup_admin from '@/page/LeftlistPage/workgroup_admin/workgroup_admin.vue'
import My_application from '@/page/LeftlistPage/my_application/my_application.vue'
import Employeesaccount from '@/page/LeftlistPage/menu_management/pages/employeesaccount.vue'
import Rename from '@/page/Detailpage/rename/rename.vue'
Vue.use(Router)
 let router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start,
      redirect:'/login'
    },{
      path:'/login',
      name:'login',
      component:Login,
      beforeEnter(to,from,next){
        next()
      }
    },{
      name:'home',
      path:'/home',
      component:Home,
      children:[
        {
          name:"employee_admin",
          path:"employee_admin",
          component:Employee_admin
        },
        {
          name:"menu_management",
          path:"menu_management",
          component:Menu_management,
          children:[{
            name:'employeesaccount',
            path:'employeesaccount',
            component:Employeesaccount
          }]
        },
        {
          name:"usefunction_admin",
          path:"usefunction_admin",
          component:Usefunction_admin
        },{
          name:"organization_admin",
          path:"organization_admin",
          component:Organization_admin
        },
        {
          name:"setsafe_admin",
          path:"setsafe_admin",
          component:Setsafe_admin
        },
        {
          name:"workgroup_admin",
          path:"workgroup_admin",
          component:Workgroup_admin
        },
        {
          path:'my_application',
          name:'my_application',
          component:My_application
        } ,
        {
          path:'rename',
          name:'rename',
          component:Rename
        } 
      ]
    }
  ]
})
router.beforeEach((to,from,next) =>{
  console.log(to)
  console.log(from)
  if(to.name == 'login'){
    next()
  }else{
     let islogin = sessionStorage.getItem('islogin')
     if(islogin){
       next()
     }else{
       next('/login')
     }
  } 
})
export default router

