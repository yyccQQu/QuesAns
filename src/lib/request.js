import $ajax from "@/lib/ajax";
import protoRoot from '@/proto/proto'
import protobuf from 'protobufjs'
import APP_CONFIG from '../assets/js/app.config';


const apiHost = 'http://127.0.0.1:7072/app/api/v1'

function isArrayBuffer (obj) {
  return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
}

function transformResponseFactory(responseType) {
  return function transformResponse(rawResponse) {
    // 判断response是否是arrayBuffer
    if (rawResponse == null || !isArrayBuffer(rawResponse)) {
      return rawResponse
    }
    try {
        const buf = protobuf.util.newBuffer(rawResponse)
        const model = protoRoot.lookup(responseType)
        const decodedResponse = model.decode(buf)
      return decodedResponse
    } catch (err) {
      return err
    }
  }
}

function getModel(type,data){
    const buf = protobuf.util.newBuffer(data)
    const model = protoRoot.lookup(type)
    return model.decode(buf)
}

/**
 * 
 * @param {*} msgType 接口名称
 * @param {*} requestBody 请求体参数
 * @param {*} responseType 返回值
 */
function request(apiPath, requestBody, responseType) {
  apiPath = APP_CONFIG.apiUrls[apiPath]
  return new Promise(function (resolve, reject) {
      $ajax.request({
        method: "POST",
        url: apiPath,
        data: requestBody,
        success: data => {
            resolve(getModel(responseType,data));
        },
        error: err => {
            reject(getModel("validate.Error",err));
            //throw getModel("validate.Error",err)
        }
      });
  }).then(res => {
    return res;
  }).catch(err => {
    throw err.msg;
  })
};

// 在request下添加一个方法，方便用于处理请求参数
request.create = function (protoName, obj) {
  const pbConstruct = protoRoot.lookup(protoName)
  const req = pbConstruct.create(obj)
  const aaa = pbConstruct.encode(req).finish()
  //console.log("---->>>",pbConstruct.decode(aaa))
  return aaa
}

export default request