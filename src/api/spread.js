import request from '@/lib/request'

export function getActivityList() {
    return request('ACTIVITY_LIST', null, "pb.ActivityListResp")
}
export function receiveActivity(id) {
    const req = {
        id: id
    }
    const data = request.create('pb.ActivityReq', req)
    return request('ACTIVITY_RECEIVE', data, "pb.ActivityReceiveResp")
}

export function proportion(page, pageSize) {
    const req = { page, pageSize }
    const data = request.create('pb.PageParams', req)
    return request('PURSE_BACK_REBATE', data,"pb.ProportRebateResp")
}

export function info () {
    return request('SPREAD', null,'pb.SpreadInfoResp')
}