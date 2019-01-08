import request from '@/lib/request'
//通知消息
export function hasMsgNotice(
    page,
    pageSize
) {
    const req = { page, pageSize }
    const data = request.create('pb.PageParams', req)
    return request("MSG_LIST", data, "pb.MessageListResp")
}
//获取消息中心 通知消息单个详情
export function msgInfo(id) {
    const req = { id: id }
    const data = request.create('pb.ReadMessage', req)
    return request("MSG_GET", data, "pb.ReadMessage")
}
//通知消息删除
export function msgDel(id) {
    const req = { id }
    const data = request.create('pb.MessageIdReq', req)
    return request("MSG_DEL", data, 'pb.MessageIdReq')
}
//游戏公告数据
export function getNoticeList(page, pageSize) {
    const req = { page, pageSize }
    const data = request.create('pb.PageParams', req)
    return request("NOTICE_LIST", data, "pb.NoticeListResp")
}
