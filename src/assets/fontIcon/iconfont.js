(function(window){var svgSprite='<svg><symbol id="icon-jiantou" viewBox="0 0 1024 1024"><path d="M701.3 583.19h142.153l-333.658 334.226-333.654-334.225h142.148v-419.922h383.009z" fill="#22ac38" ></path></symbol><symbol id="icon-jiantou-copy" viewBox="0 0 1024 1024"><path d="M322.70000000000005 440.80999999999995l-142.153 2.842170943040401e-14 333.6579999999999-334.22600000000006 333.65400000000005 334.2249999999999-142.14799999999997 4.263256414560601e-14 1.4210854715202004e-13 419.922-383.009 1.4210854715202004e-13z" fill="#31c754" ></path></symbol><symbol id="icon-shanchu" viewBox="0 0 1024 1024"><path d="M731.918024 180.533726 293.285433 180.533726c-40.383364 0-73.105944 32.720216-73.105944 73.102948l0 24.367991 584.843455 0 0-24.367991C805.023968 213.253942 772.302411 180.533726 731.918024 180.533726M604.221575 131.798768l10.756412 76.909647L410.22547 208.708416l10.755389-76.909647L604.221575 131.798768M610.076149 83.063811l-194.947818 0c-20.108791 0-38.813548 16.276708-41.621615 36.217876l-14.254216 101.968369c-2.78453 19.916609 11.399075 36.19434 31.507865 36.19434l243.684773 0c20.107767 0 34.292396-16.276708 31.484328-36.217876l-14.255239-101.968369C648.887651 99.340519 630.183917 83.063811 610.076149 83.063811M744.102007 326.738599 281.100427 326.738599c-26.795347 0-46.761893 21.845541-44.334511 48.544623L276.699007 814.278511c2.402821 26.700105 26.344051 48.544623 53.139398 48.544623l365.527671 0c26.795347 0 50.735553-21.845541 53.139398-48.544623l39.932067-438.995289C790.8639 348.58414 770.897354 326.738599 744.102007 326.738599M415.128331 765.353219l-73.105944 0-24.368989-341.144704 97.473909 0L415.127308 765.353219zM561.339195 765.353219l-97.473909 0L463.865286 424.208515l97.473909 0L561.339195 765.353219zM683.18107 765.353219l-73.105944 0L610.075126 424.208515l97.473909 0L683.18107 765.353219z" fill="#dbdbdb" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)