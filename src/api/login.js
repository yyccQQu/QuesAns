import request from '@/lib/request'

// getCaptcha 获取验证码
export function getCaptcha() {
    return request('CAPTCHA', null, "pb.Captcha")
}

// 登录
export function login(name, pwd, codeId, code) {
    const req = {
        account: name,
        password: pwd,
        code: code,
        codeId: codeId
    };

    const data = request.create('pb.MemberLoginReq', req)
    return request("LOGIN", data, "pb.SessionResp")
}
//获取公告
export function getNotice(name, cate, isGame) {
    const req = {
        position: name,
        cate: cate,
        isGame: isGame
    };

    const data = request.create('pb.QueryNoticeReq', req)
    return request("NOTICE", data, "pb.NoticeResp")
}
export function getReadAgree(){
    return request('REGISTER_AGREEMENT', null, "pb.RegProtocolResp")
}
//注册
export function register(account, password, confirmPassword, spreadId,code,codeId,readAgree) {
    const req = {
        account: account,
        password: password,
        confirmPassword: confirmPassword,
        spreadId: spreadId,
        code: code,
        codeId:codeId,
        readAgree:readAgree
    };
    const data = request.create('pb.MemberRegisterReq', req)
    return request("REGISTER", data, "pb.SessionResp")
}