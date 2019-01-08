import request from '@/lib/request'


//银行卡列表信息
export function info() {
    return request("CONTACTUS", null, "pb.ContactResp")
}
//设置银行卡成功
export function todoBankCard(id) {
    const req = {
        id: id
    }
    const data = request.create('pb.MemberIdReq', req)
    return request("DEF_BANK_EDIT", data, "pb.MemberIdReq")
}