import request from '#/utils/request'

export function getCoreRoles(params) {
  return request({
    url: `core/roles`,
    method: 'get',
    params: params
  })
}

export function getCoreRoleById(id) {
  return request({
    url: `core/roles/${id}`,
    method: 'get'
  })
}

export function createCoreRole(data) {
  return request({
    url: `core/roles`,
    method: 'post',
    data: data
  })
}

export function updateCoreRole(id, data) {
  return request({
    url: `core/roles/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteCoreRole(id) {
  return request({
    url: `core/roles/${id}`,
    method: 'delete'
  })
}
