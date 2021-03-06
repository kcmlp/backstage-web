/**
 * Created by jiachenpan on 16/11/18.
 */
import store from '@/store'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function getOssUrl(key) {
  // console.log('eee', typeof key)   avatar
  const newKey = String(key).split(',')
  const overs = 'https://' + newKey[1] + '.' + newKey[0] + '/' + newKey[2] + '?x-oss-process=style/avatar-large'
  // localStorage.setItem('newKey',newKey[2])
  // const finallyde = newKey[2]
  // console.log(overs,finallyde)
  // return [overs , finallyde]
  return overs
  // return 'http://images.isouth.com/' + key + '?x-oss-process=style/' + style //'?x-oss-process=style/' + 'style
}

export function getOssKey() {
  // const myDate = new Date()
  // return myDate.getYear() + myDate.getMonth() + myDate.getDate() + myDate.getHours() + myDate.getMinutes() + myDate.getSeconds() + myDate.getMilliseconds()
  return 'w' + store.getters.uid + '_' + getFormatTime()
}

export function getFormatTime() {
  // const myDate = new Date()
  // return myDate.getYear() + myDate.getMonth() + myDate.getDate() + myDate.getHours() + myDate.getMinutes() + myDate.getSeconds() + myDate.getMilliseconds()
  return new Date().getTime()
}

export function getWorksOperationCount(count) {
  let str = ''
  if (count > 10000) {
    count /= 10000
    str = count.toFixed(2) + '万'
  } else {
    str = count
  }
  return str
}
