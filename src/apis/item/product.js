import request from '#/utils/request'

export function getItemProducts(params) {
  return request({
    url: `core/product`,
    method: 'get',
    params: params
  })
}

export function getItemProductById(id) {
  return request({
    url: `core/product/${id}`,
    method: 'get'
  })
}

export function createItemProduct(data) {
  return request({
    url: `core/product`,
    method: 'post',
    data: data
  })
}

export function updateItemProduct(id, data) {
  return request({
    url: `core/product/${id}`,
    method: 'put',
    data: data
  })
}

export function deleteItemProduct(id) {
  return request({
    url: `core/product/${id}`,
    method: 'delete'
  })
}
