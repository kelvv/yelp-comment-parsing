// const crypto = require('crypto')
// const request = require('request')
// let proxy = 'http://dynamic.xiongmaodaili.com:8088'

// let timestamp = parseInt(new Date().getTime() / 1000)
// let url = 'http://www.baidu.com/'
// // 新用户更换orderno,secret
// let orderno = 'DT20190528162256iazAC0ZK'
// let secret = 'd154fd7868cc58396f52a4d9b758bc51'

// let txt = 'orderno=' + orderno + ',secret=' + secret + ',timestamp=' + timestamp
// let md5 = crypto.createHash('md5')
// md5.update(txt)
// let sign = md5.digest('hex')
// sign = sign.toUpperCase()

// let options = {
//   url: url,
//   proxy: 'http://dynamic.xiongmaodaili.com:8088',
//   headers: {
//     'Proxy-Authorization': 'sign=' + sign + '&orderno=' + orderno + '&timestamp=' + timestamp
//   }
// }
// function callback (error, response, body) {
//   if (!error && response.statusCode === 200) {
//     console.log(body)
//     return false
//   }
//   console.log(error)
// }
// request(options, callback)

const crypto = require('crypto')
const url = require('url')
const https = require('https')
const HttpsProxyAgent = require('https-proxy-agent') // 第三方包,请安装

let timestamp = parseInt(new Date().getTime() / 1000)
// 新用户更换orderno,secret
let orderno = 'DT20190528162256iazAC0ZK'
let secret = 'd154fd7868cc58396f52a4d9b758bc51'

let txt = 'orderno=' + orderno + ',secret=' + secret + ',timestamp=' + timestamp
let md5 = crypto.createHash('md5')
md5.update(txt)
let sign = md5.digest('hex')
sign = sign.toUpperCase()

// HTTP/HTTPS proxy to connect to
var proxy = process.env.http_proxy || 'http://dynamic.xiongmaodaili.com:8089'
console.log('using proxy server %j', proxy)

// HTTPS endpoint for the proxy to connect to
var endpoint = process.argv[2] || 'https://www.yelp.com/search/snippet?find_desc=&find_loc=Chicago&start=10'
console.log('attempting to GET %j', endpoint)
var options = url.parse(endpoint)
options.headers = {
  'Proxy-Authorization': 'sign=' + sign + '&orderno=' + orderno + '&timestamp=' + timestamp
}
options.rejectUnauthorized = false

// create an instance of the `HttpsProxyAgent` class with the proxy server information
var agent = new HttpsProxyAgent(proxy)
options.agent = agent

https.get(options, function (res) {
  console.log('"response" event!', res.headers)
  res.pipe(process.stdout)
})
