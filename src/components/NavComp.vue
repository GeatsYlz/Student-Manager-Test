<template>
    <div class="aside">
        <el-menu class="el-menu-vertical"
        router:default-active="$route.path"
        router
        >

            <el-menu-item index="student">
                <span>学生列表</span>
            </el-menu-item>
            <el-menu-item index="course">
                <span>课程列表</span>
            </el-menu-item>

        </el-menu>
    </div>
</template>

<script>


export default ({
    name:"NavComp"
})
</script>
