//'use strict';严格模式会导致部分脚本不运行.
exports.main_handler = async (event, context, callback) => {
  try {
      //如果想在一个定时触发器里面执行多个js文件需要在定时触发器的【附加信息】里面填写对应的名称，用 & 链接
      //例如我想一个定时触发器里执行jd_speed.js和jd_bean_change.js，在定时触发器的【附加信息】里面就填写 jd_speed&jd_bean_change
      for (const v of event["Message"].split("&")) {
          console.log(v);
          var request = require('request');
          //1.执行自己上传的js文件
          //require('./'+v+'.js')

          //2.执行国内gitee远端js文件如果部署，在国内节点，选择1或2的方式
          //request('https://gitee.com/lxk0301/jd_scripts/raw/master/'+v+'.js', function (error, response, body) {
          //    eval(response.body)
          //})

          //3.执行github远端的js文件
          request('https://raw.githubusercontent.com/lxk0301/jd_scripts/master/'+v+'.js', function (error, response, body) {
            eval(response.body)
          })  
      }
   } catch (e) {
    console.error(e)
   }
}
