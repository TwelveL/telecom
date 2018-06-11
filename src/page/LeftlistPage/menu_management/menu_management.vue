<template>
    <div class="left">
      <el-aside width="230px" left="10px">
        <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" @node-click="handleNodeClick"></el-tree>
      </el-aside> 
      <router-view></router-view>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [{
          label: '应用菜单树',
          children: [{
            label: '组织权限管理',
            children: [{
              label: '员工账号管理',
              name:'staff '
            },{
              label: '应用功能管理',
              name:'management'
            },{
              label: '配置业务管理',
              name:'business'
            },{
              label: '设置安全策略',
              name:'securitypolicy'
            },{
              label: '组织机构管理',
              name:'organization'
            },{
              label: '工作组管理',
              name:'workingteam'
            },{
              label: '菜单管理',
              name:'menumanagement'
            }]
          }]
        }, {
          label: '我的工作',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '客户管理',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        newdatat:''
      };
    },
        watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(a,b,c){
         let data = b.data;
         console.log(data)
         this.$router.push({
           name:'employeesaccount',
           params:{
             name:data.label
           }
         })
      }
    },
    
  };
</script>
<style scoped>
.left{
  display: flex;
}
</style>


