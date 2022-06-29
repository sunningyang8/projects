import { http } from '@/utils';
// 获取联想字段
export const getSuggestion = (value) => {
    return async (dispatch) => {
        const res = await http.get('/suggestion', {
            params: {
                q: value,
            },
        });
        // console.log(res)
        dispatch({ type: 'search/suggestion', payload: res.data.data.options });
    };
};
//清除联想字段
export const clearSuggestion = () => {
    return async (dispatch) => {
        dispatch({ type: 'search/clearSuggestion'  });
    };
};
// 搜索结果
export const getSuggestionResult = (query) => {
    return async dispatch => {
        const res = await http.get('/search', {
            params: {
                page: 1,
                per_page: 10,
                q: query
            }
        })

        dispatch({ type: 'search/getSuggestionResult', payload: res.data.data })
    }
}
