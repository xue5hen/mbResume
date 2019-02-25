import http from '../utils/http'

// 获取用户列表
export const getUsersList = (data) => http.get('/api/userslist.json', data)

// 加载Swings SVG图片
export const getSwingsSVG = (data) => http.get('/api/swings.svg', data)
