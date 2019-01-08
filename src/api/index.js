import request from '@/lib/request'

// getCaptcha 获取验证码
export function getCaptcha() {
    return request('CAPTCHA', null, "pb.Captcha")
}

// getCaptcha 获取验证码
export function login(name, pwd, codeId, code) {
    const req = {
        account: name,
        password: pwd,
        code: code,
        codeId: codeId
    };

    const data = request.create('pb.MemberLoginReq', req)
    return request("LOGIN", data, "pb.SessionResp")
}
//首页公共数据
export function indexInfo() {
    return request("INDEX_INFO", null, "pb.IndexDataResp")
}
//公告
export function getNotice(position, cate, isGame) {
    const req = {
        position: position,
        cate: cate,
        isGame: isGame
    };

    const data = request.create('pb.QueryNoticeReq', req)
    return request("NOTICE", data, "pb.NoticeResp")
}
//游戏数据
export function getGameInfo() {
    return request("ALLGAMES", null, "pb.GameTypeList")
}
//是否设置转入
export function ratios(id, name) {
    const req = {
        platformId: id,
        platformName: name,
    };
    const data = request.create('pb.AutoMemberConversionReq', req)
    return request("RATIO", data, "pb.AutoMemberConversionResp")
}
//进入游戏
export function gameInto(name,id) {
    const req = {
        platform: name,
        gameId: id,
    };
    const data = request.create('pb.MemberPlayReq', req)
    return request("LOGINGAME", data, "pb.MemberPlayResp")
}
//玩过的游戏
export function getGamed() {
    return request("HISTORYGAMES", null, "pb.RecentGameResp")
}
//领取红包
export function getredBag(id) {
    const req = {
        setId: id,
    };
    const data = request.create('pb.RedPacketReceiveReq', req)
    return request("REDBAG", data, "pb.RedPacketReceiveResp")
}

//获取热门游戏推荐和广告轮播
export function getHotGames(type) { 
    // 广告类型 -1首页广告 -2存款成功 -3取款成功
    const req = {
        advType: type,
    };
    const data = request.create('pb.AdvReq', req)
    return request("HOTGAMES_ADV", data, "pb.AdvGameResp")
}