import request from '@/lib/request'

// getCaptcha 获取验证码
export function getCaptcha() {
    return request('CAPTCHA', null, "pb.Captcha")
}

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
export function activityInfo(id) {
    const req = {
        id: id
    }
    const data = request.create('pb.ActivityReq', req)
    return request('ACTIVITY_INFO', data, "pb.ActivityList")
}
export function getTurntable() {
    return request('TURNTABLE_SHOW', null, "pb.TurnTableOneResp")
}

export function getTurntableInfo(id) {
    const req = {
        id: id
    }
    const data = request.create('pb.TurntableInfoReq', req)
    return request('TURNTABLE_INFO', data, "pb.TurntableResp")
}
export function getTurntableLottey(id) {
    const req = {
        id: id
    }
    const data = request.create('pb.TurntableInfoReq', req)
    return request('TURNTABLE_LOTTERY', data, "pb.PrizeResp")
}
export function getTurntableHistory(id) {
    const req = {
        id: id
    }
    const data = request.create('pb.TurntableInfoReq', req)
    return request('TURNTABLE_LOG', data, "pb.TurntableWinningRecordResp")
}

export function receiveTurntable(id, prizeId) {
    const req = {
        turntableId: id,
        prizeId: prizeId
    }
    const data = request.create('pb.TurntableReceiveReq', req)
    return request('TURNTABLE_RECEIVE', data, "pb.PrizeResp")
}
//------自助优惠
export function getSelfHelpList() {
    return request('PROMOTION_LIST', null, "pb.PromotionListResp")
}

export function getSelfHelpInfo(id) {
    const req = {
        id: id
    }
    const data = request.create('pb.ActivityReq', req)
    return request('PROMOTION_INFO', data, "pb.PromotionList")
}

export function getSelfHelpApply(activityId, depositMoney,remark,code,codeId) {
    const req = {
        activityId: activityId,
        depositMoney: depositMoney,
        remark: remark,
        code: code,
        codeId: codeId
    }
    const data = request.create('pb.PromotionApplyReq', req)
    return request('PROMOTION_APPLY', data, "pb.PromotionApplyReq")
}
export function getSelfHelpApplyList() {
    return request('PROMOTION_RECORD', null, "pb.PromotionRecordResp")
}