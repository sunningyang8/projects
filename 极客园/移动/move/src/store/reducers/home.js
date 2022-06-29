import sortBy from 'lodash/sortBy'
const initialState = {
  channels: [],
  restChannels: [],
  channelActiveKey: 0,
  channelArticles: {}
}

export const home = (state = initialState, action) => {
  if (action.type === 'home/getChannels') {
    return {
      ...state,
      channels: action.payload
    }
  }

  if (action.type === 'home/getRestChannels') {
    return {
      ...state,
      restChannels: action.payload
    }
  }

  if (action.type === 'home/toggleChannel') {
    return {
      ...state,
      channelActiveKey: action.payload
    }
  }

  // 删除我的频道数据需要修改两个数据
  // 1 从我的频道数据中删除该项
  // 2 将该项添加到可选频道中
  if (action.type === 'home/delChannel') {
    return {
      ...state,
      // 我的频道
      channels: state.channels.filter(item => item.id !== action.payload.id),
      // 可选频道
      restChannels: sortBy([...state.restChannels, action.payload], 'id')
    }
  }

  if (action.type === 'home/addChannel') {
    return {
      ...state,
      channels: [...state.channels, action.payload],
      restChannels: state.restChannels.filter(
        item => item.id !== action.payload.id
      )
    }
  }
  // 频道文章列表数据
  // 注意：该数据要追加！而不是直接覆盖！！！

  if (action.type === 'home/getArticleListByChannelId') {
    const {
      channelId,
      articles: { pre_timestamp, results }
    } = action.payload
    const currentResults = state.channelArticles[channelId]?.results ?? []
    return {
      ...state,
      // 只修改：频道文章列表数据
      channelArticles: {
        // 展开所有频道的文章列表数据
        ...state.channelArticles,
        // 只修改当前频道的文章列表数据
        [channelId]: {
          pre_timestamp,

          // 注意：该数据要追加！！！
          results: [
            // 已有数据
            // ...currentArticles.results,
            ...currentResults,
            // 接口返回的最新的文章列表数据
            ...results
          ]
        }
      }
    }
  }
  // 下拉获取最新文章列表数据
  if (action.type === 'home/getNewestArticleList') {
    const {
      channelId,
      articles: { pre_timestamp, results }
    } = action.payload
    // 已有数据
    const currentResults = state.channelArticles[channelId]?.results ?? []
    return {
      ...state,
      channelArticles: {
        ...state.channelArticles,
        [channelId]: {
          pre_timestamp,
          results: [
            // 新的数据
            ...results,

            // 已有的旧数据,
            ...currentResults
          ]
        }
      }
    }
  }

  return state
}
