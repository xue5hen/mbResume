import http from '../utils/http'

// 加载Swings SVG图片
export const getSwingsSVG = (data) => http.get('/api/swings.svg', data)
