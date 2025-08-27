import request from '@/utils/request'

export function getCoreUsers(params) {
  return request({
    url: `core/users`,
    method: 'get',
    params: params
  })
}

export function getCoreUserById(id) {
  return request({
    url: `core/users/${id}`,
    method: 'get'
  })
}

export function createCoreUser(data) {
  return request({
    url: `core/users`,
    method: 'post',
    data: data
  })
}

export function updateCoreUser(id, data) {
  return request({
    url: `core/users/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteCoreUser(id) {
  return request({
    url: `core/users/${id}`,
    method: 'delete'
  })
}
