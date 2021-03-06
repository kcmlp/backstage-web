import request from '@/utils/request'

export function getArticleList(page,mobile) {
  if(!mobile || typeof mobile == 'object'){
    mobile = ''
 }
  return request({
    url: '/backstage/user/sec/getUser/' + page,
    method: 'get',
    headers: {
      mobile:mobile
    }
  })
}
export function getOssBulkInfo() {
  return request({
    url: '/backstage/oss/sec/getOss',
    method: 'get'
  })
}
export function addArticle(data) {
  // data.artType = 1
  return request({
    url: '/backstage/user/sec/create',
    method: 'post',
    data
  })
}

export function updateAddArticle(data) {
  // data.articleType = 1
  // data.type = 4
  return request({
    url: '/backstage/user/sec/update',
    method: 'post',
    data
  })
}

export function getArticleView(artKey) {
  return request({
    url: 'postfront/art/view/' + artKey,
    method: 'get'
  })
}

// export function deleteArticle(parentKey) {
//   const data = {}
//   data.parentKey = parentKey
//   return request({
//     url: '/postfront/art/sec/deleteArticle',
//     method: 'post',
//     data
//   })
// }

