<template>
  <div>
    <el-container class="container">
      <el-form class="el_form">
        <el-form-item label="用户姓名" class="form-item" placeholder="请输入用户名">
          <el-input class="input" v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号" class="form-item">
          <el-input class="input"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" class="form-item">
          <el-input class="input"></el-input>
        </el-form-item>
        <el-form-item label="员工编号" class="form-item">
          <el-input class="input"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" class="form-item">
          <el-input class="input"></el-input>
        </el-form-item>
        <el-form-item label="归属组织" class="form-item">
          <el-popover placement="right" width="400" trigger="click" @after-enter="toFetchGroup">
            <el-container direction="vertical" v-loading="flag">
              <el-form>
                <el-row>
                  <el-input class="el-input-search" v-model="abc" placeholder=""></el-input>
                  <el-button @click="filterItem=abc">查询</el-button>
                </el-row>
              </el-form>
              <el-table :data="filtersGroup()(filterItem)" height="300" @row-click="rowClick">
                <el-table-column width="60" type="index" label="序号"></el-table-column>
                <el-table-column width="170" property="ORGNAME" label="组织名称"></el-table-column>
                <el-table-column width="170" property="FORGNAME" label="上级组织"></el-table-column>
              </el-table>
            </el-container>
            <el-input v-model="newform.group" class="input" slot="reference" placeholder="">
              <i slot="suffix" class="el-input_icon el-icon-arrow-down"></i>
            </el-input>
          </el-popover>
        </el-form-item>
      </el-form>
      <hr/>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button class="grid-content bg-purple" @click="addNew">增加</el-button>
        </el-col>
        <el-col :span="4">
          <el-button class="grid-content bg-purple">离职</el-button>
        </el-col>
      </el-row>
      <hr/>
      <el-table size="small" :data="tableData()({username,pageSize,page})" border style="width: 100%" ref="multipleTable" tooltip-effect="dark">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="id" label="员工ID" width="180"></el-table-column>
        <el-table-column prop="code" label="员工编号" width="120"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="email" label="邮箱" width="170"></el-table-column>
        <el-table-column prop="org" label="归属组织" width="120"></el-table-column>
        <el-table-column prop="anth" label="权限" width="120"></el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="forg" label="上级组织" width="120"></el-table-column>
        <el-table-column prop="data" label="创建时间" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="change(scope)">编辑</el-button>
            <el-button type="text" size="small" @click="removes(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="pageChange" :page-size="pageSize" background layout="prev, pager, next" :total="table.length"></el-pagination>
      <el-dialog title="新加/编辑" :visible.sync="dialogFormVisible">
        <el-form ref="newf" :model=" newform" :rules="newFormRules">
          <el-form-item label="员工姓名" :label-width="formLabelWidth" prop="name">
            <el-input size="small" v-model="newform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input size="small" v-model="newform.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" :label-width="formLabelWidth">
            <el-select v-model="newform.code" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input size="small" v-model="newform.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="人员状态">
            <el-select v-model="newform.auth" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input size="small" v-model="newform.mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="归属组织" :label-width="formLabelWidth">
            <el-input size="small" v-model="newform.org" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>

</template>
<script>
  import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
  export default {
    data() {
      let validator = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'));
        } else {
          return callback()
        }
      };
      return {
        from: {
          name: "test",
          group: "未知组织"
        },
        newform: {
          name: '',
          email: '',
          code: '',
          id: '',
          auth: '',
          mobile: '',
          group: '',
          org: ''
        },
        newFormRules: {
          name: [
            { validator, trigger: 'blur' },
          ],
          email: [{
            required: true, message: '请填写邮箱', trigger: 'blur'
          }, {
            type: 'email', message: '邮箱格式不正确', trigger: 'change'
          }]
        },
        flag: false,
        filterItem: "",
        abc: "",
        pageSize: 5,
        page: 1,
        formLabelWidth: "90",
        dialogFormVisible: false,
        username: ''
      };
    },
    computed: {
      //...mapState(['group'])
      // group(){
      //        return  this.filtersGroup()(filterItem)
      // }
      ...mapState(['table'])
    },
    methods: {
      toFetchGroup() {
        this.flag = true;
        this.fetchGroup(() => {
          this.flag = false;
        });
      },
      toFetchTable() {
        this.fetchTable();
      },
      sure() {
        this.$refs.newf.validate((isvalid, tag) => {
          this.dialogFormVisible = false
        })
      },
      rowClick(row, event, column) {
        console.log(row.ORGNAME);
        this.from.group = row.ORGNAME;
      },
      removes(scope) {
        console.log(scope)
        this.$confirm('您确定要删除这个人么？', "提示", {
          callback: () => {
            console.log('ok')
            this.deleteItems({
              code: scope.row.code,
              cb: () => {
                this.$message('您成功删除一条数据')
              }
            })
          }
        })
      },
      change(scope) {
        console.log(scope);
        this.dialogFormVisible = true;
        this.newform = scope.row
      },
      addNew() {
        this.dialogFormVisible = true;
        this.newform = {
          name: '',
          email: '',
          code: '',
          id: '',
          auth: '',
          mobile: '',
          group: '',
          org: ''
        }
      },
      pageChange(page) {
        console.log(page)
        this.page = page
      },
      ...mapMutations(['deleteItems']),
      ...mapActions(["fetchGroup", "fetchTable", "deleteItem"]),
      ...mapGetters(["filtersGroup", "tableData"])
    },
    mounted() {
      this.toFetchTable();
    }
  };
</script>
<style scoped>
  .container {
    margin: 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .el_main,
  .el_form {
    padding: 10px;
    border: 1px #ccc solid;
  }

  .el_main {
    margin-top: 10px;
  }

  .form-item {
    width: 200px;
    display: inline-block;
  }

  .el-input__inner {
    width: 110px;
    background: lightgreen;
  }

  .el-input-search {
    width: 300px;
  }

  .input {
    width: 110px;
  }

  .el-table th,
  .el-table tr {
    background-color: red !important;
  }

  .el-table__row td {
    display: flex;
    flex: 1;
  }
</style>