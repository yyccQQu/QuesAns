import request from '@/lib/request'

// params是object类型的请求参数
// getMaintainMsg 获取维护的提示信息
export function getMaintainMsg () {
    return request('MAINTAIN_INFO', null, 'pb.Maintain')
  }