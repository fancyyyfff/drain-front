import instance from '@/http/index'

// 获取账号详情
export const getUserInfo = id =>{
    // const { id } = data
    return instance({
        url:'/user/getUserInfo',
        method:'POST',
        data:{
            id
        }
    })
}


// 修改用户姓名
export const changeName = (name,id) =>{
    return instance({
        url:'/user/changeName',
        method:'POST',
        data:{
            name,
            id
        }
    })
}

// 修改密码
export const changePassword = (oldPassword,newPassword,id) =>{
    return instance({
        url:'/user/changePassword',
        method:'POST',
        data:{
            oldPassword,
            newPassword,
            id
        }
    })
}
