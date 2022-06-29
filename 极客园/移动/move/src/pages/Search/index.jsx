import classNames from 'classnames'
import { useHistory } from 'react-router'
import { NavBar, SearchBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import styles from './styles/index.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getSuggestion, clearSuggestion } from '@/store/actions'
import { useEffect, useState } from 'react'
import { useDebounceFn } from 'ahooks'
const GEEK_SEARCH_KEY = 'geek-89-search-history'
const SearchPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [searchText, setSearchText] = useState('')
    const { suggestion } = useSelector((state) => state.search)
    const [searchHistory, setSearchHistory] = useState([])
    useEffect(() => {
        const localHistory = JSON.parse(
            localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]'
        )
        setSearchHistory(localHistory)
    }, [])
    const { run: debounceFn } = useDebounceFn(
        value => {
            dispatch(getSuggestion(value))
        },
        {
            wait: 500
        }
    )
    // 搜索
    const onSearchChange = (value) => {
        setSearchText(value)
        if (value.trim() === '') {
            return dispatch(clearSuggestion())
        }
        debounceFn(value)
    }
    // 跳转到搜索结果页面
    const onSearch = (searchValue) => {
        if (searchValue.trim().length === 0) return
        // console.log(222)
        history.push(`/search/result?query=${searchValue}`)
        dispatch(clearSuggestion())
        saveHistories(searchValue)
    }
    // 存储搜索历史记录
    const saveHistories = (value) => {
        let localHistory = JSON.parse(
            localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]'
        )
        if (localHistory.length === 0) {
            localHistory = [value]
        } else {
            if (localHistory.indexOf(value) > -1) {
                localHistory = [value, ...localHistory.filter(item => item !== value)]
            } else {
                localHistory = [...localHistory, value]
            }
        }
        // 7. 将最新的历史记录存储到本地缓存中
        localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(localHistory))
    }
    // 删除单个历史记录
    const onDeleteHistory = (value) => {
        console.log(value, 'value')
        const localHistory = JSON.parse(
            localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]'
        )
        const newHistory = localHistory.filter(item => item !== value)
        localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(newHistory))
        setSearchHistory(newHistory)
    }
    // 清空所有历史记录
    const onClearAllHistory = () => {
        localStorage.removeItem(GEEK_SEARCH_KEY)
        setSearchHistory([])
    }

    const highlightSuggestion = suggestion.map(item => {
        const lowerSearchText = searchText.toLowerCase()
        const lowerSuggestionItem = item?.toLowerCase() || ''
        // console.log(lowerSuggestionItem,'1111')
        const searchIndex = lowerSuggestionItem.indexOf(lowerSearchText)
        const left = item.slice(0, searchIndex)
        const search = item.slice(searchIndex, searchIndex + lowerSearchText.length)
        const right = item.slice(searchIndex + lowerSearchText.length)

        return {
            left,
            search,
            right,
            raw: item
        }
    })
    return (
        <div className={styles.root}>
            <NavBar
                className="navbar"
                onBack={() => history.go(-1)}
                right={
                    <span className="search-text" onClick={() => onSearch(searchText)}>
                        搜索
                    </span>
                }
            >
                <SearchBar
                    value={searchText}
                    placeholder="请输入关键字搜索"
                    onChange={onSearchChange}
                />
            </NavBar>
            {suggestion.length <= 0 && (
                <div
                    className="history"
                    style={{
                        display: searchHistory.length <= 0 ? 'none' : 'block'
                    }}
                >
                    <div className="history-header">
                        <span>搜索历史</span>
                        <span onClick={onClearAllHistory}>
                            <Icon type="iconbtn_del" />
                            清除全部
                        </span>
                    </div>

                    <div className="history-list">
                        {searchHistory.map((item, index) => (
                            <span
                                key={index}
                                className="history-item"
                                >
                                <span className="text-overflow" onClick={() => onSearch(item)}>{item}</span>
                                <Icon type="iconbtn_essay_close"  onClick={() => onDeleteHistory(item)} />
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <div
                className={classNames('search-result', {
                    show: suggestion.length > 0
                })}
            >
                {highlightSuggestion.map((item, index) => (
                    <div
                        key={index}
                        className="result-item"
                        onClick={() => onSearch(item.raw)}
                    >
                        <Icon className="icon-search" type="iconbtn_search" />
                        <div className="result-value text-overflow">
                            {item.left}
                            <span>{item.search}</span>
                            {item.right}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

};
export default SearchPage
