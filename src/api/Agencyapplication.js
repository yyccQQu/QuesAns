import request from '@/lib/request'
//代理账号申请
export function getBankList() {
    return request("BANK_LIST", null, "pb.BankCardDropResp")
}
//代理账号提交
export function proxyAdd(chineseNickName, englishNickName, telephone, email, qq, wechat, remark, promoteSite, account, password, rePassword, idCard, realName, code, bankName, bankNum, province, city, codeId, otherpromoteway) {
    const req = {
        chineseNickName: chineseNickName,
        englishNickName: englishNickName,
        telephone: telephone,
        email: email,
        qq: qq,
        wechat: wechat,
        remark: remark,
        promoteSite: promoteSite,
        account: account,
        password: password,
        rePassword: rePassword,
        idCard: idCard,
        realName: realName,
        code: code,
        bankName: bankName,
        bankNum: bankNum,
        province: province,
        city: city,
        codeId: codeId,
        otherPromoteWay: otherpromoteway
    }
    console.log(req, 'req')
    const data = request.create('pb.ProxyApplyReq', req)
    return request("PROXY_ADD", data, "pb.ProxyApplyReq")
}
//代理是否为必填
export function getSitt() {
    return request("PROXY_INFO", null, "pb.ApplySettingResp")
}