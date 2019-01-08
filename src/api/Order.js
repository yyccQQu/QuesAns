import request from '@/lib/request'

export function getDrop(betType) {
    const req = {
        betType: betType
    }
    const data = request.create('pb.BetTypeReq', req)
    return request('REPORT_DROP', data, "pb.BetTypeResp")
}

//lottery
export function lotteryList(
    gameType,
    timeType,
    platform,
    page,
    pageSize,
    gameName) {

    const pageParams = {
        page,
        pageSize
    }
    const req = {
        gameType,
        timeType,
        pageParams,
        gameName,
        platform
    }
    console.log(req, 'rerq')

    const data = request.create('pb.BetReportInfoReq', req)
    return request('REPORT_LIST', data, "pb.BetReportInfoResp")
}

//彩种接口下拉框
export function getKindDrop(id) {
    const req = {
        id
    }
    console.log(req, 'rerq')
    const data = request.create('pb.TopIdRep', req)
    return request('REPORT_KIND_DROP', data, "pb.LotteryTicketTypeResp")

}

// export function getTicketSelect(id){
//     const req = { id }
//     console.log(req, 'rerq')
//     const data = request.create('pb.TopIdRep', req)
//     return request('REPORT_LIST', data, "pb.LotteryTicketTypeResp")
// }
export function getReportform(time) {
    const req = {
        timeType: time
    }
    console.log(req);
    const data = request.create('pb.BetReportAccountReq', req)
    return request('REPORT_ORDER', data, "pb.BetReportAccountResp")
}