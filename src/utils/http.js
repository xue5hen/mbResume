import axios from 'axios'
import qs from 'qs'

// below are all axios settings for local test
axios.defaults.baseURL = (process.env.NODE_ENV === 'production') ? '/mbResume/static' : '/static'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.method = 'get'
    // config.url += '.post'
    console.log('mock request params will be ignored:' + config.data)
    // to do, get `static filename` such as `login.post.condition1`
    // when dynamic tackling with config
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  // response.headers['content-type'] = 'application/json; charset=UTF-8'
  return response
}, function (error) {
  return Promise.reject(error)
})

function checkStatus (res) {
  if (res && [200, 304, 400].includes(res.status)) {
    return res.data
  } else {
    return false
  }
}

export default {
  get: (url, data) => {
    return axios({
      method: 'get',
      url,
      params: data
    }).then((res) => {
      return checkStatus(res)
    }).catch((error) => {
      console.log(error)
    })
  },
  post: (url, data, contentType = true) => {
    let ct = ''
    if (contentType) {
      ct = 'application/x-www-form-urlencoded'
      data = qs.stringify(data)
    } else {
      ct = 'application/json'
    }
    return axios({
      headers: {
        'Content-Type': ct
      },
      method: 'post',
      url,
      data
    }).then((res) => {
      return checkStatus(res)
    }).catch((error) => {
      console.log(error)
    })
  }
}
