<template>
    <div class="common-layout">
        <el-container>
            <el-header>学生成绩管理系统</el-header>
            <el-container>
                <el-aside width="200px"><NavComp/></el-aside>
                <el-main><router-view/></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import NavComp from './NavComp.vue'
export default ({
    name : "ContainerComp",
    components:{
        NavComp
    }
})
</script>
