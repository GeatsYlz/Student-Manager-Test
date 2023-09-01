import { createRouter, createWebHashHistory } from 'vue-router'

import ContainerComp from '../components/ContainerComp.vue'
import StudentComp from '../components/StudentComp.vue'
import CourseComp from '../components/CourseComp.vue'
import LoginComp from '../components/LoginComp.vue'

const routes = [
    {
        path: "/",
        name: "main",
        component : ContainerComp,
        children : [
            {
                path : "student",
                name : "student",
                component : StudentComp
            },
            {
                path : "course",
                name : "course",
                component : CourseComp
            }
           
        ]
    },
    {
        path : "/login",
        component : LoginComp
    },
    {
        path : "/student",
        component : StudentComp
    },
    {
        path : "/course",
        component : CourseComp
    }
]

const routers = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default routers