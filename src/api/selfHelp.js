import request from '@/lib/request'

export function getList() {
    return request('PROMOTION_LIST', null, "pb.PromotionListResp")
}
export function getInfo(id) {
    const req = {
        id: id
    }
    const data = request.create('pb.ActivityReq', req)
    return request('PROMOTION_INFO', data, "pb.PromotionList")
}

export function apply(
    id,
    depositMoney,
    reason,
    code,
    codeId,
){
    const req = {
        activityId: id,
        depositMoney: depositMoney,
        remark: reason,
        code: code,
        codeId: codeId
    }
    const data = request.create('pb.PromotionApplyReq', req)
    return request('PROMOTION_APPLY', data, "pb.PromotionApplyReq")
}


