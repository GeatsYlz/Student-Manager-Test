<template>
    <div>
    <h1>学生成绩列表</h1>
    <el-button type="danger" @click="getStudentList">获取学生成绩</el-button>
    <el-button type="primary" @click="getStudents">获取学生信息</el-button>
    <el-button type="primary" @click="addStudent">新增</el-button>
    <table class="table">
        <thead>
            <tr>
                <th>序号</th>
                <th>学号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>GPA</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(stu , index) in studentList" :key="stu.id">
                <th>{{ index + 1 }}</th>
                <th>{{ stu.id }}</th>
                <th>{{ stu.name }}</th>
                <th>{{ stu.gender }}</th>
                <th>{{ stu.gpa }}</th>
            </tr>
        </tbody>
    </table>

    
    <el-table :data="students_page" stripe style="width: 100%">
      <el-table-column prop="id" label="学号">
        <template #default="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.id"
            type="text"
            placeholder="请填写"
          />
          <span v-else>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名">
        <template #default="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.name"
            type="text"
            placeholder="请填写"
          />
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别">
        <template #default="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.gender"
            type="text"
            placeholder="请填写"
          />
          <span v-else>{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gpa" label="绩点">
        <template #default="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.gpa"
            type="number"
            placeholder="请填写"
          />
          <span v-else>{{ scope.row.gpa }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <div v-if="scope.row.isEdit">
            <el-button type="primary" @click="handleRowSave(scope.row)">保存</el-button>
            <el-button type="danger" @click="handleRowCancel(scope.row, scope.$index)">取消</el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="handleRowEdit(scope.row)"> 编辑</el-button>
            <el-button type="danger" @click="handleRowDelete(scope.$index)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>


    <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :page-size="pageSize" 
      :current-page="currentPage" 
      :page-sizes="[5, 10, 20, 40, 100]" 
      layout="total, sizes, prev, pager, next, jumper"
      :total="studentlist.length">
    </el-pagination>

    

    <!--p> {{ studentList }} </p-->
    </div>
</template>

<script>
import axios from "axios"
import { set } from 'lodash-es'

export default {
    data(){
        return{
            studentlist : [],
            currentPage : 1,
            pageSize : 5
        }
    },
    computed : {
      students_page() {
        return this.studentlist.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      }
    },
    methods : {
        getStudentList(){
            
            axios({
                url : "http://localhost:8181/student",
                method : "GET"
            }).then(
                res => {
                    this.studentlist = res.data
                }
            )
        },

        handleRowEdit(row) {
            set(row, 'isEdit', true)
        },

        // 新增联络人
        addStudent() {
            this.studentlist.unshift({
                id : '',
                name: '',
                gender: '',
                gpa: '',
                isEdit: true, // 当这个值为true时表示可以编辑
                isNew: true
            })
        },

        
        handleRowUpdate(row)  {
            console.log(row)
            axios({
                url: "http://localhost:8181/updatestudent",
                method : "PUT",
                data : {
                        id: row.id,
                        name : row.name,
                        gender: row.gender,
                        gpa : row.gpa
                }
            }).then(res => {
                    console.log(res.data)
                    row.isEdit = false
            }) 
        },

        handleRowInsert(row)  {
            //this.students.splice(index, 1)
            // 如何区分是新数据还是旧数据 ?
            console.log(row)
            axios({
                url: "http://localhost:8181/addstudent",
                method : "POST",
                data : {
                        id: row.id,
                        name : row.name,
                        gender: row.gender,
                        gpa : row.gpa
                }
            }).then(res => {
                    console.log(res.data)
                    row.isEdit = false
                    row.isNew = false
            }) 
        },

        handleRowSave(row)  {
            //this.students.splice(index, 1)
            // 如何区分是新数据还是旧数据 ?
            console.log(row)
            if (row.isNew) {
                this.handleRowInsert(row)
            } else {
                this.handleRowUpdate(row);
            }
        },

        handleRowCancel(row, index)  {
            if (row.isNew)
                this.studentlist.splice(index, 1)
            else {
                // TODO: 恢复单个学生数据
                set(row, 'isEdit', false)
            }
            
        },

        handleCurrentChange(currentPage) {
          this.currentPage = currentPage;
        },

        handleSizeChange(val) {
          this.pageSize = val;
        }
    }
    
}
</script>

<style>
.el-pagination {
  justify-content : center
}
</style>