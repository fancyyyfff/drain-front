import { defineStore } from "pinia";
// import { getUserInfo } from "@/api/user";

export const useUserInfo = defineStore('userinfo',{
    state: () => ({
            username:'',
            imageUrl:'',
            nickname:'',
            email:'',
            role:0,
            listIds: [],

    }),
    actions:{
        async fetchUserInfo() {
            // const res = await getUserInfo(id)
            // this.imageUrl=res.image_url
            // this.name=res.name
            // this.sex=res.sex
            // this.department=res.department
            // this.identity=res.identity
            // this.account=res.account
            // this.email=res.email
        }
    },
},{persist:{
        enabled:true,
        key:'userinfo',
        storage:localStorage
    }
})
