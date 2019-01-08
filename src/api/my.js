import request from '@/lib/request'

//我的页面 刷新余额 
//是否开启自助返水/推广/自助优惠
//获取未读消息数
function getMemberCenter() {
    return request('MEMBER_CENTER', null, 'pb.MemberCenter');
}
//退出登录
function postLoginOut() {
    return request('LOGIN_OUT', null, 'pb.SessionResp');
}

export default {
    getMemberCenter,
    postLoginOut
}

export function changePwdFunc(passType, password, newPass, confirmPass) {
    const req = {
        passType: passType,
        password: password,
        newPass: newPass,
        confirmPass: confirmPass
    }
    const data = request.create('pb.EidtMemberPasswordReq', req)
    return request("PASSWORD_EDIT", data, "pb.EidtMemberPasswordReq")
}

export function getMore() {
    return request("MORE", null, "pb.FootIwordResp")
}
export function contactUs(){
    return request("CONTACTUS", null, "pb.ContactResp")
}