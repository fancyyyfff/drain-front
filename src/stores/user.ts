import { defineStore } from "pinia";
// import { getUserInfo } from "@/api/user";

export const useUserInfo = defineStore('userinfo',{
    state:()=> {
        return {
            imageUrl:'',
            name:'',
            sex:'',
            department:null,
            identity:'',
            username:'',
            email:''
        }
    },
    actions:{
        async fetchUserInfo(id) {
            const res = await getUserInfo(id)
            this.imageUrl=res.image_url
            this.name=res.name
            this.sex=res.sex
            this.department=res.department
            this.identity=res.identity
            this.account=res.account
            this.email=res.email
        }
    },
},{persist:{
        enabled:true,
        key:'userinfo',
        storage:localStorage
    }
})
