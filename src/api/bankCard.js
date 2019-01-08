import request from '@/lib/request'
//获取银行卡信息
export function hasBankMsg() {
    return request("BANK_LIST", null, "pb.BankCardDropResp")
}
//添加银行卡
export function addMemberBank(
    bankId, card, username, subbranch
) {
    const req = {
        bankId: bankId,
        card: card,
        username: username,
        subbranch: subbranch
    }
    const data = request.create('pb.AddMemberBankCardReq', req)
    return request("MEMBER_BANK_ADD", data, "pb.AddMemberBankCardReq")
}
//银行卡列表信息
export function bankCardList() {
    return request("MEMBER_BANK_LIST", null, "pb.MemberBankListResp")
}
//设置银行卡成功
export function todoBankCard(id) {
    const req = {
        id: id
    }
    const data = request.create('pb.MemberIdReq', req)
    return request("DEF_BANK_EDIT", data, "pb.MemberIdReq")
}