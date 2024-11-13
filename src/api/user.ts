import instance from '@/http/index'
//以下是发送请求的实例，一个实例一个方法，一个data参数，设定后端处理路由、请求方式和请求的数据

// 注册
export const register = data =>{
    const { account, password} = data
    return instance({
        url:'/api/register',
        method:'POST',
        data:{
            account,
            password
        }
    })
}

// 登录
export const login = data =>{
    const { account, password} = data
    return instance({
        url:'/api/login',
        method:'POST',
        data:{
            account,
            password
        }
    })
}

// 忘记密码验证账号和邮箱
export const verify = data =>{
    const {account,email}=data
    return instance({
        // 后端的路由
        url:'/user/verifyAccountAndEmail',
        // 发送请求的方法
        method:'post',
        // POST 请求的数据
        data: {
            account,
            email
        }
    })
}

// 修改密码
export const reset = (id,newPassword) =>{
    return instance({
        // 后端的路由
        url:'/user/changePasswordInLogin',
        // 发送请求的方法
        method:'post',
        // POST 请求的数据
        data: {
            id,
            newPassword
        }
    })
}
