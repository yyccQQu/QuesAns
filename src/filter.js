"use strict";

export const filterDate = (date, fmt = 'YYYY-MM-DD HH:mm') => {
    if (!date) {
        return '';
    }
    if (typeof date === 'number') {
        date = new Date(date * 1000);
    }
    var o = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    var week = {
      '0': '\u65e5',
      '1': '\u4e00',
      '2': '\u4e8c',
      '3': '\u4e09',
      '4': '\u56db',
      '5': '\u4e94',
      '6': '\u516d'
    }
    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
}

export const filterTimeType = (myDate,type) => {
    // console.log(myDate,'myDate')
    myDate = new Date(1000 * myDate);
    var str ;
    var year = myDate.getFullYear();    //年

    var mouth = myDate.getMonth() + 1;    //月

    var date = myDate.getDate();        //日

    var hours = myDate.getHours();      //时

    var minutes = myDate.getMinutes();  //分

    var seconds = myDate.getSeconds();   //秒
    switch (type){
        case "YYYYMMDD":
            return str = year + "年" + mouth + "月" + date + "日"
        case "YYYY-MM-DD":
            return str = year + "年" + "-" + mouth + "月" + "-" + date + "日"
        case "YYYY-MM":
            return str = year + "年" + "-" + mouth + "月"
        case "YYYY,MM,DD":
            return str = year + "年" + "," + mouth + "月" + "," + date + "日"
        case "YYYY,MM":
            return str = year + "年" + "," + mouth + "月"
        default:
            return str = year + "年" + "," + mouth + "月" + "," + date + "日" + " " + hours + "时" + ":" + minutes + "分" + ":" + seconds + "秒";
    }




}

//解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用
export const ModalHelper = ((bodyCls) => {
    let scrollTop;
    return {
        open: function () {
            scrollTop = document.scrollingElement.scrollTop;
            document.body.classList.add(bodyCls);
            document.body.style.top = -scrollTop + 'px';
        },
        close: function () {
            document.body.classList.remove(bodyCls);
            // scrollTop lost after set position:fixed, restore it back.
            document.scrollingElement.scrollTop = scrollTop;
        }
    };
})('dialog-open');



export const filterBankNum = ((value) => {
    if (value) {
        return `${value.substr(0,4)}    ****    ****    ${value.substr(value.length-4)}`
    } else {
        return "";
    }
})