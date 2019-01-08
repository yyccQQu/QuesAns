import request from '@/lib/request'

//钱包
function getWalletInfo() {
    return request('WALLET_INFO', null, 'pb.WalletInfoResp');
}

//稽核查询
function getAuditInfo() {
    return request('PURSE_AUDIT', null, 'pb.InstantAuditResp');
}

//获取取款基本信息
function getWithdrawInfo() {
    return request('PURSE_WITHDRAW_INFO', null, 'pb.WithDrawInfoResp');
}

//取款提交
function postWithdraw(req) {
    const data = request.create('pb.WithDrawAuditReq', req);
    return request('PURSE_WITHDRAW_OUT', data, 'pb.AuditInfoResp');
}

//继续取款
function postWithdrawContinue(req) {
    const data = request.create('pb.ContinueDrawReq', req);
    return request('PURSE_WITHDRAW_CONTINUE', data, 'pb.ContinueDrawResp');
}

//公司入款，线上入款，取款，额度转换 记录
function getRecord(req) {  
    const data = request.create('pb.MemberOrderReq', req);
    return request('PURSE_RECORD', data, 'pb.MemberOrderResp');
}

//额度转换
function postTransfer(req) {  
    const data = request.create('pb.MemberConversionReq', req);
    return request('PURSE_CONVERSION', data, 'pb.MemberConversionResp');
}

//额度转换-获取快捷转入设置信息
function getFastSettingInfo() { 
    return request('PURSE_CONVERSION_SET_FAST_INFO', null, 'pb.AutoConversionResp');
}

//额度转换-设置快捷转入设置信息
function postFastSetting(req) {  
    const data = request.create('pb.AutoConversionReq', req);
    return request('PURSE_CONVERSION_SET_FAST', data, 'pb.AutoConversionResp');
}

//一键归户
function postAllTransfer() { 
    return request('PURSE_CONVERSION_RETRUN_MONEY',null, 'pb.AutoConversionResp');//这个是随便传入的没有解析
}

//现金记录
function getMoneyWater(req) { 
    const data = request.create('pb.MemberCashRecordReq', req);
    return request('PURSE_MONEY_RECORD', data, 'pb.MemberCashRecordResp');
}
//会员返佣列表
function getBackCommission(req) { 
    const data = request.create('pb.PageParams', req);
    return request('PURSE_BACK_REBATE', data, 'pb.RebateListResp');
}
//自助返水列表
function getBackWaterList(req) { 
    const data = request.create('pb.BackWaterReq', req);
    return request('PURSE_BACK_WATER_LIST', data, 'pb.BackWaterResp');
}
//自助返水-查询
function getBackWaterInfo() { 
    return request('PURSE_BACK_WATER_INFO', null, 'pb.BackWaterInfoResp');
}
//自助返水-领取
function getBackWater() { 
    return request('PURSE_BACK_WATER_RECEIVE', null, '');
}

//存款-获取线上入款和公司入款存款方式
function getOnlineCompanyList() { 
    return request('PURSE_ONLINE_COMPANY_LIST', null, 'pb.IncomeBankListResp');
}
//公司入款-获取入款信息
function getCompanyInfo(req) { 
    const data = request.create('pb.TopIdRep', req);
    return request('PURSE_COMPANY_INFO', data, 'pb.CompanyIncomeInfoResp');
}

//公司入款-提交
function postCompany(req) { 
    const data = request.create('pb.SiteMemberCompanyIncomeFrontAdd', req);
    return request('PURSE_COMPANY_ADD', data, 'pb.OrderResp');
}


//线上入款-获取入款信息
function getOnlineInfo(req) { 
    const data = request.create('pb.OnlineIncomeInfoReq', req);
    return request('PURSE_ONLINE_INFO', data, 'pb.OnlineIncomeInfoResp');
}

//线上入款-提交
function postOnline(req) { 
    const data = request.create('pb.SiteMemberOnlineFront', req);
    return request('PURSE_ONLINE_ADD', data, 'pb.OrderResp');
}
//去第三方
function goThreeWay(req) { 
    const data = request.create('pb.BuyReq', req);
    return request('PURSE_ONLINE_THREE', data, 'pb.FormResp');
}

//获取线上入款-银行卡下拉列表
function getBankSelect(req) { 
    const data = request.create('pb.BankListReq', req);
    return request('PURSE_ONLINE_BANK', data, 'pb.PayBankResp');
}

function getOrderInfo(req) { 
    const data = request.create('pb.OrderReq', req);
    return request('PURSE_ORDER_INFO', data, 'pb.IncomeSuccessResp');
}

export default{
    getWalletInfo,
    getAuditInfo,
    getWithdrawInfo,
    postWithdraw,
    postWithdrawContinue,
    getRecord,
    postTransfer,
    getFastSettingInfo,
    postFastSetting,
    postAllTransfer,
    getMoneyWater,
    getBackCommission,
    getBackWaterList,
    getBackWaterInfo,
    getBackWater,
    getOnlineCompanyList,
    getCompanyInfo,
    postCompany,
    getOnlineInfo,
    postOnline,
    goThreeWay,
    getBankSelect,
    getOrderInfo,
    
}