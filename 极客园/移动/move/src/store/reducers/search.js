const initialState = {
    suggestion: [],
    // 此处，为该对象，初始化默认值
    suggestionResult: {
        page: 1,
        per_page: 10,
        total_count: 0,
        results: []
    }
};

export const search = (state = initialState, action) => {
    switch (action.type) {
        case 'search/suggestion':
            return {
                ...state,
                suggestion: action.payload,
            };
        case 'search/clearSuggestion':
            return {
                ...state,
                suggestion: [],
            };
        case 'search/getSuggestionResult':
            return {
                ...state,
                suggestionResult: action.payload
            };
        default:
            return state;
    }
};


