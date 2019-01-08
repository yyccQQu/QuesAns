import request from '@/lib/request'

//个人信息
export function memberInfo() {
    return request('MEMBER_INFO', null, "pb.MemberInfoResp")
}
//修改个人信息
export function updateMember(nickname, idcard, mobile, email, qq, wechat, birthday, country, province, city) {
    const req = {
        nickname: nickname,
        idCard: idcard?idcard:'',
        mobile: mobile,
        email: email,
        qq: qq,
        wechat: wechat,
        birthday: birthday,
        country: country,
        province: province,
        city: city
    };
    console.log(req,'req')
    const data = request.create('pb.MemberUpdateRep', req)
    return request("MEMBER_INFO_EDIT", data, "pb.MemberUpdateRep")
}



