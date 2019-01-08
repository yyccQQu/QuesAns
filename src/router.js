import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: {
            name: 'index'
        },
    },
    //首页
    {
        path: '/index',
        name: 'index',
        component: require("./views/index/Index.vue").default,

    },
    {
        path: '/games',
        name: 'games',
        component: require( /* webpackChunkName: "index" */ './views/index/Games.vue').default,

    },
    {
        path: '/settings',
        name: 'settings',
        component: require( /* webpackChunkName: "index" */ './views/index/Settings.vue').default,

    },
    //登录
    {
        path: '/login',
        name: 'login',
        component: require('./views/auth/Login.vue').default
    },
    {
        path: '/register',
        name: 'register',
        component: require('./views/auth/Register.vue').default
    },

    //活动
    {
        path: '/activity',
        name: 'activity',
        component: require( /* webpackChunkName: "activity" */ './views/activity/Activity.vue').default
    },
    //活动详情
    {
        path: '/actDetail',
        name: 'actDetail',
        component: require( /* webpackChunkName: "activity" */ './views/activity/ActDetail.vue').default
    },
    //幸运大转盘
    {
        path: '/luckdraw',
        name: 'luckdraw',
        meta: { auth: true },
        component: require( /* webpackChunkName: "activity" */ './views/activity/Luckdraw.vue').default
    },
    //钱包
    {
        path: '/purse',
        name: 'purse',
        meta: { auth: true },
        component: require( /* webpackChunkName: "purse" */ './views/purse/Purse.vue').default
    },
    //钱包-稽核查询
    {
        path: '/auditQuery',
        name: 'auditQuery',
        meta: { auth: true },
        component: require( /* webpackChunkName: "auditQuery" */ './views/purse/auditQuery/AuditQuery.vue').default
    },
    //钱包余额
    {
        path: '/purseDeposit',
        name: 'purseDeposit',
        meta: { auth: true },
        component: require( /* webpackChunkName: "purseDeposit" */ './views/purse/PurseDeposit.vue').default
    },
    //存款
    {
        path: '/deposit',
        name: 'deposit',
        meta: { auth: true },
        component: require( /* webpackChunkName: "deposit" */ './views/purse/deposit/Deposit.vue').default
    },
    //存款-线上入款-支付宝/微信
    {
        path: '/online/alipay',
        name: 'onlineAlipay',
        meta: { auth: true },
        component: require( /* webpackChunkName: "onlineAlipay" */ './views/purse/deposit/DepositOnlineAlipay.vue').default
    },
    //存款-线上入款-网银
    {
        path: '/online/ebank',
        name: 'onlineEBank',
        meta: { auth: true },
        component: require( /* webpackChunkName: "onlineEBank" */ './views/purse/deposit/DepositOnlineEBank.vue').default
    },
    //存款-线上入款-点卡
    {
        path: '/online/timeCard',
        name: 'timeCard',
        meta: { auth: true },
        component: require( /* webpackChunkName: "timeCard" */ './views/purse/deposit/DepositOnlineTimeCard.vue').default
    },
    //存款-线上入款/公司存款-支付返回结果页
    {
        path: '/payResult',
        name: 'payResult',
        meta: { auth: true },
        component: require( /* webpackChunkName: "payResult" */ './views/purse/deposit/DepositPayResult.vue').default
    },
    //存款-线上入款/公司存款-支付成功页
    {
        path: '/paySuccess',
        name: 'paySuccess',
        meta: { auth: true },
        component: require( /* webpackChunkName: "paySuccess" */ './views/purse/deposit/DepositPaySuccess.vue').default
    },
    //存款-公司存款-支付宝/微信
    {
        path: '/company/alipay',
        name: 'companyAlipay',
        meta: { auth: true },
        component: require( /* webpackChunkName: "companyAlipay" */ './views/purse/deposit/DepositCompanyAlipay.vue').default
    },
    //存款-公司存款-银行卡
    {
        path: '/company/ebank',
        name: 'companyEBank',
        meta: { auth: true },
        component: require( /* webpackChunkName: "companyEBank" */ './views/purse/deposit/DepositCompanyEBank.vue').default
    },

    //存款-线上存款/公司存款-记录
    {
        path: '/deposit/record',
        name: 'depositRecord',
        meta: { auth: true },
        component: require( /* webpackChunkName: "depositRecord" */ './views/purse/deposit/DepositRecord.vue').default
    },

    //取款
    {
        path: '/withdraw',
        name: 'withdraw',
        meta: { auth: true },
        component: require( /* webpackChunkName: "withdraw" */ './views/purse/withdraw/Withdraw.vue').default
    },
    //取款-稽核
    {
        path: '/withdraw/audit',
        name: 'withdrawAudit',
        meta: { auth: true },
        component: require( /* webpackChunkName: "withdrawAudit" */ './views/purse/withdraw/WithdrawAudit.vue').default
    },
    //取款-成功
    {
        path: '/withdraw/success',
        name: 'withdrawSuccess',
        meta: { auth: true },
        component: require( /* webpackChunkName: "withdrawSuccess" */ './views/purse/withdraw/WithdrawSuccess.vue').default
    },
    //额度转换
    {
        path: '/transfer',
        name: 'transfer',
        meta: { auth: true },
        component: require( /* webpackChunkName: "transfer" */ './views/purse/transfer/Transfer.vue').default
    },
    //自助返水
    {
        path: '/backwater',
        name: 'backwater',
        meta: { auth: true },
        component: require( /* webpackChunkName: "backwater" */ './views/purse/backwater/Backwater.vue').default
    },
    //会员返佣
    {
        path: '/backCommission',
        name: 'backCommission',
        meta: { auth: true },
        component: require( /* webpackChunkName: "backCommission" */ './views/purse/backCommission/BackCommission.vue').default
    },
    //现金流水
    {
        path: '/moneyWater',
        name: 'moneyWater',
        meta: { auth: true },
        component: require( /* webpackChunkName: "moneyWater" */ './views/purse/moneyWater/MoneyWater.vue').default
    },
    //订单
    {
        path: '/order',
        name: 'order',
        meta: { auth: true },
        component: require( /* webpackChunkName: "order" */ './views/order/Order.vue').default,
        children: [
            //彩票
            {
                path: 'lottery',
                name: 'lottery',
                component: require( /* webpackChunkName: "order" */ './views/order/Lottery.vue').default,
            },
            //棋牌
            {
                path: 'chess',
                name: 'chess',
                component: require( /* webpackChunkName: "order" */ './views/order/Chess.vue').default,
            },
            //视讯
            {
                path: 'directvideo',
                name: 'directvideo',
                component: require( /* webpackChunkName: "order" */ './views/order/Directvideo.vue').default,
            },
            //电子
            {
                path: 'tvgame',
                name: 'tvgame',
                component: require( /* webpackChunkName: "order" */ './views/order/Tvgame.vue').default,
            },
            //体育
            {
                path: 'sports',
                name: 'sports',
                component: require( /* webpackChunkName: "order" */ './views/order/Sports.vue').default,
            }
        ]
    },
    //报表
    {
        path: '/reportform',
        name: 'reportform',
        meta: { auth: true },
        component: require( /* webpackChunkName: "order" */ './views/order/Reportform.vue').default,
    },
    //我的
    {
        path: '/my',
        name: 'my',
        meta: { auth: true },
        component: require( /* webpackChunkName: "my" */ './views/my/My.vue').default,
    },
    {
        path: '/about',
        name: 'about',
        meta: { auth: true },
        component: require( /* webpackChunkName: "my" */ './views/my/about/About.vue').default,
    },
    {
        path: '/bankCard',
        name: 'bankCard',
        meta: { auth: true },
        component: require( /* webpackChunkName: "my" */ './views/my/bankCard/BankCard.vue').default,
        children: []
    },
    {
        path: '/bankCardadd',
        name: 'bankCardadd',
        meta: { auth: true },
        component: require( /* webpackChunkName: "my" */ './views/my/bankCard/AddBankCard.vue').default,
    },
    //密码管理
    {
        path: '/password',
        name: 'password',
        meta: { auth: true },
        component: require( /* webpackChunkName: "my" */ './views/my/password/Password.vue').default,
    },
    //消息中心
    {
        path: '/msgcenter',
        name: 'msgcenter',
        meta: { auth: true },
        component: require( /* webpackChunkName: "my" */ './views/my/msgCenter/MsgCenter.vue').default,
    },
    {
        path: '/msgcenters',
        name: 'msgcenters',
        meta: { auth: true },
        component: require( /* webpackChunkName: "my" */ './views/my/msgCenter/MsgCenters.vue').default,
    },
    //代理账号
    {
        path: '/agencyappli',
        name: 'agencyappli',
        meta: { auth: true },
        component: require( /* webpackChunkName: "my" */ './views/my/agencyApplication/Agencyapplication.vue').default,
    },
    //我要推广
    {
        path: '/spread',
        name: 'spread',
        meta: { auth: true },
        component: require( /* webpackChunkName: "my" */ './views/my/Spread.vue').default,
    },
    //联系我们
    {
        path: '/contactus',
        name: 'contactus',
        component: require( /* webpackChunkName: "my" */ './views/my/Contactus.vue').default,
    },
    //更多
    {
        path: '/more',
        name: 'more',
        component: require( /* webpackChunkName: "my" */ './views/my/more/More.vue').default,
    },
    //关于我们
    {
        path: '/morepage',
        name: 'morepage',
        component: require( /* webpackChunkName: "my" */ './views/my/more/Morepage.vue').default,
    },
    {
        path: '/selfHelp',
        name: 'selfHelp',
        component: require( /* webpackChunkName: "my" */ './views/my/selfHelp/SelfHelp.vue').default,
    },
    {
        path: '/selfDetail',
        name: 'selfDetail',
        component: require( /* webpackChunkName: "my" */ './views/my/selfHelp/SelfHelpDetail.vue').default,
    },
    {
        path: '/apply',
        name: 'apply',
        component: require( /* webpackChunkName: "my" */ './views/my/selfHelp/Apply.vue').default,
    },
    {
        path: '/selfmore',
        name: 'selfmore',
        component: require( /* webpackChunkName: "my" */ './views/my/selfHelp/Selfmore.vue').default,
    },
    {
        path: '/agencyaccount',
        name: 'agencyaccount',
        component: require( /* webpackChunkName: "my" */ './views/my/agencyappliction/Agencyaccount.vue').default,
    },


    //维护
    {
        path: '/maintainweb',
        name: 'maintainweb',
        component: require( /* webpackChunkName: "my" */ './views/Maintainweb.vue').default,
    },
    {
        path: '/maintaingame',
        name: 'maintaingame',
        component: require( /* webpackChunkName: "my" */ './views/MaintainGame.vue').default,
    }
    ]
})
