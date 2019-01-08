import request from '@/lib/request'

export function getList() {
    return request('PROMOTION_RECORD', null, "pb.PromotionRecordResp")
}
export function receiveActivity(id) {
    const req = {
        id: id
    }
    const data = request.create('pb.ActivityReq', req)
    return request('', data, "pb.ActivityReceiveResp")
}



