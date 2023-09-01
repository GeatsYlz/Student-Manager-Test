<template>
    <div>
        <form @submit.prevent="login">
            <h1>登陆页面</h1>
        <div>
            <label for="">用户名:</label>
            <input type="text" v-model="username">
        </div>
        <div>
            <label for="">密码:</label>
            <input type="password" v-model="password">
        </div>
        <button>登录</button>
        </form>
        
    </div>
</template>

<script>

export default {
    data(){
        return {
            username : "",
            password : ""
        }
    },
    methods:{
        login(){
            if(this.username === "admin" && this.password === "123456"){
                this.$router.push('/')
            }else{
                alert("用户名或密码错误");
            }
        }
    }
}
</script>
