import { http } from '@/utils'

// 获取频道数据
export const getChannels = () => {
  return async dispatch => {
    const data = await http.get('channels')
    dispatch({ type: 'article/setChannels', payload: data.channels })
  }
}

// 获取所有文章数据
export const getArticles = (params) => {
  return async dispatch => {
    const data = await http.get('mp/articles', { params })
    // console.log(data)
    dispatch({ type: 'article/setArticles', payload: data })
  }
}

// 删除文章数据
export const delArticle = id => {
  return async dispatch => {
    await http.delete('mp/articles/' + id)
  }
}

// 添加文章
export const addArticle = (data, draft = false) => {
  return async dispatch => {
    await http.post(`mp/articles?draft=${false}`, data)
  }
}

// 编辑文章
export const editArticle = (data, draft=false) => {
  return async dispatch => {
    await http.put(`mp/articles/${data.id}?draft=${draft}`, data)
  }
}

// 获取单文章
export const getArticle = id => {
  return async dispatch => {
    const data = await http.get('mp/articles/' + id)
    return data
  }
}