const initialState = {
    detail: {},
    comments: {
        end_id: null,
        last_id: null,
        total_count: 0,
        results: []
    }
}

export const article = (state = initialState, action) => {
    switch (action.type) {
        case 'article/getArticleById':
            return {
                ...state,
                detail: action.payload
            }
        case 'article/update':
            const { name, value } = action.payload
            return {
                ...state,
                detail: {
                    ...state.detail,
                    [name]: value
                }
            }
        case 'article/getArticleComments':
            const { end_id, last_id, results, total_count } = action.payload
            return {
                ...state,
                comments: {
                    end_id,
                    last_id,
                    total_count,
                    // 注意：该数据需要追加，而不是直接覆盖，这样，才能实现触底加载更多评论的数据
                    results: [...state.comments.results, ...results]
                }
            }
        case 'article/getArticleCommentsFirst':
            return {
                ...state,
                comments: action.payload
            }
        case 'article/addArticleComment':
            return {
                ...state,
                comments: {
                    ...state.comments,
                    // 最新发表的评论在第一条
                    results: [action.payload, ...state.comments.results]
                }
            }
        case 'article/articleCommentThumbUp':
            const { id, is_liking } = action.payload
            return {
                ...state,
                comments: {
                    ...state.comments,
                    results: state.comments.results.map(item => {
                        if (item.com_id === id) {
                            return {
                                ...item,
                                // 点赞状态值
                                is_liking: is_liking,
                                // 修改数量
                                like_count: is_liking ? item.like_count + 1 : item.like_count - 1
                            }
                        }
                        return item
                    })
                }
            }
        case 'article/updateCommentCount':
            return {
                ...state,
                comments: {
                    ...state.comments,
                    results: state.comments.results.map(item => {
                        if (item.com_id === action.payload.commentId) {
                            return {
                                ...item,
                                reply_count: action.payload.total
                            }
                        }
                        return item
                    })
                }
            }
        default:
            return state
    }
};


