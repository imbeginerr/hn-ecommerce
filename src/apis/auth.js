import request from '../utils/request'

export function login(data) {
  return request({
    url: '/core/auth/token',
    method: 'post',
    data: data
  })
}
