const request = require('request')

let webHandler = {

}

function UrlEncode (url) {
  url = encodeURIComponent(url)
  url = url.replace(/\\%3A/g, ':')
  url = url.replace(/\\%2F/g, '/')
  url = url.replace(/\\%3F/g, '?')
  url = url.replace(/\\%3D/g, '=')
  url = url.replace(/\\%26/g, '&')

  return url
}

webHandler.Post = (url, form, headers, isJson = true, cookie, isRespone = false) => {
  return new Promise((resolve, reject) => {
    request.post({
      url,
      headers,
      form
    },
    function (error, response, body) {
      try {
        if (error) {
          reject(error)
        }
        if (!response.statusCode) {
          reject(body)
        }

        if (isRespone) {
          resolve(response)
        }

        if (!error && /^2\d+/.test(response.statusCode.toString())) {
          isJson ? resolve(JSON.parse(body)) : resolve(body)
        } else {
          reject(body)
        }
      } catch (err) {
        console.log(err)
        reject(body)
      }
    }
    )
  })
}

webHandler.Get = (url, query, cookie, isJson = true) => {
  return new Promise((resolve, reject) => {
    if (query) {
      url += `?query=${UrlEncode(query)}`
    }
    request.get({
      url
    },
    function (error, response, body) {
      try {
        if (error) {
        }
        if (!response.statusCode) {
          reject(body)
        }

        if (!error) {
          if(isJson){
            resolve(JSON.parse(body))
          }else{
            resolve(body)
          }
          
        } else {
          reject(body)
        }
      } catch (err) {
        console.log(err)
        reject(body)
      }
    }
    )
  })
}

webHandler.Delete = (url, form, cookie) => {
  return new Promise((resolve, reject) => {
    request.delete({
      url
    },
    function (error, response, body) {
      try {
        if (error) console.log(error)
        if (!response.statusCode) reject(body)
        if (!error && /^2\d+/.test(response.statusCode.toString())) {
          resolve(body)
        } else {
          reject(body)
        }
      } catch (err) {
        console.log(err)
        reject(err)
      }
    }
    )
  })
}

webHandler.Patch = (url, form, cookie) => {
  return new Promise((resolve, reject) => {
    request.patch({
      url,
      form
    },
    function (error, response, body) {
      try {
        if (error) console.log(error)
        if (!response.statusCode) reject(body)

        if (!error && /^2\d+/.test(response.statusCode.toString())) {
          resolve(body)
        } else {
          reject(body)
        }
      } catch (err) {
        console.log(err)
        reject(err)
      }
    }
    )
  })
}

webHandler.Put = (url, form, cookie) => {
  return new Promise((resolve, reject) => {
    request.put({
      url,
      form
    },
    function (error, response, body) {
      try {
        if (error) console.log(error)
        if (!response.statusCode) reject(body)

        if (!error && /^2\d+/.test(response.statusCode.toString())) {
          resolve(body)
        } else {
          reject(body)
        }
      } catch (err) {
        console.log(err)
        reject(err)
      }
    }
    )
  })
}

module.exports = webHandler
